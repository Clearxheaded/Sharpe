from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, model_validator
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import get_current_user
from app.models import User
from app.services.portfolio_service import (
    InsufficientOverlapError,
    compute_portfolio_stats,
    compute_portfolios_summary,
    create_portfolio,
    delete_portfolio,
    get_portfolio,
    list_portfolios,
    update_portfolio,
)
from app.services.stats_service import TickerNotFoundError

router = APIRouter()


class HoldingInput(BaseModel):
    ticker: str = Field(min_length=1, max_length=10, pattern=r"^[A-Za-z0-9.\-]+$")
    weight: float


class PortfolioCreateRequest(BaseModel):
    name: str
    holdings: list[HoldingInput]

    @model_validator(mode="after")
    def weights_sum_to_one(self):
        total = sum(h.weight for h in self.holdings)
        if abs(total - 1.0) > 1e-6:
            raise ValueError(f"Holding weights must sum to 1.0, got {total}")
        return self


class PortfolioUpdateRequest(BaseModel):
    name: str | None = None
    holdings: list[HoldingInput] | None = None

    @model_validator(mode="after")
    def weights_sum_to_one(self):
        if self.holdings is not None:
            total = sum(h.weight for h in self.holdings)
            if abs(total - 1.0) > 1e-6:
                raise ValueError(f"Holding weights must sum to 1.0, got {total}")
        return self


class HoldingResponse(BaseModel):
    ticker: str
    weight: float

    model_config = {"from_attributes": True}


class PortfolioResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
    holdings: list[HoldingResponse]

    model_config = {"from_attributes": True}


class PortfolioStatsResponse(BaseModel):
    tickers: list[str]
    weights: list[float]
    covariance_matrix: dict[str, dict[str, float]]
    correlation_matrix: dict[str, dict[str, float]]
    holding_return: dict[str, float]
    holding_volatility: dict[str, float]
    observations: int
    portfolio_variance: float
    portfolio_volatility: float
    portfolio_return: float
    risk_free_rate: float
    sharpe_ratio: float


class PortfolioSummaryItem(BaseModel):
    id: int
    name: str
    created_at: datetime
    tickers: list[str]
    weights: list[float]
    sharpe_ratio: float | None
    portfolio_volatility: float | None


class PortfolioSummaryResponse(BaseModel):
    risk_free_rate: float
    portfolios: list[PortfolioSummaryItem]


def _get_owned_portfolio(db: Session, user: User, portfolio_id: int):
    portfolio = get_portfolio(db, user.id, portfolio_id)
    if portfolio is None:
        raise HTTPException(
            status_code=404, detail=f"Portfolio {portfolio_id} not found."
        )
    return portfolio


@router.post("/portfolios", response_model=PortfolioResponse, status_code=201)
def create_portfolio_endpoint(
    request: PortfolioCreateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return create_portfolio(
        db, user.id, request.name, [h.model_dump() for h in request.holdings]
    )


@router.get("/portfolios", response_model=list[PortfolioResponse])
def list_portfolios_endpoint(
    db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    return list_portfolios(db, user.id)


@router.get("/portfolios/summary", response_model=PortfolioSummaryResponse)
def read_portfolios_summary(
    db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    return compute_portfolios_summary(db, user.id)


@router.get("/portfolios/{portfolio_id}", response_model=PortfolioResponse)
def read_portfolio_endpoint(
    portfolio_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return _get_owned_portfolio(db, user, portfolio_id)


@router.patch("/portfolios/{portfolio_id}", response_model=PortfolioResponse)
def update_portfolio_endpoint(
    portfolio_id: int,
    request: PortfolioUpdateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    portfolio = _get_owned_portfolio(db, user, portfolio_id)
    holdings = (
        [h.model_dump() for h in request.holdings]
        if request.holdings is not None
        else None
    )
    return update_portfolio(db, portfolio, name=request.name, holdings=holdings)


@router.delete("/portfolios/{portfolio_id}", status_code=204)
def delete_portfolio_endpoint(
    portfolio_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    portfolio = _get_owned_portfolio(db, user, portfolio_id)
    delete_portfolio(db, portfolio)


@router.get("/portfolios/{portfolio_id}/stats", response_model=PortfolioStatsResponse)
def read_portfolio_stats(
    portfolio_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    portfolio = _get_owned_portfolio(db, user, portfolio_id)

    try:
        return compute_portfolio_stats(portfolio)
    except TickerNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=f"Ticker '{e}' not found or has no available price data.",
        )
    except InsufficientOverlapError:
        raise HTTPException(
            status_code=422,
            detail="Holdings do not have enough overlapping price history to compute statistics.",
        )
