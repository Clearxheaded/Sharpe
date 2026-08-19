from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, model_validator
from sqlalchemy.orm import Session

from app.db import get_db
from app.services.portfolio_service import (
    InsufficientOverlapError,
    compute_portfolio_stats,
    create_portfolio,
    get_portfolio,
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


class HoldingResponse(BaseModel):
    ticker: str
    weight: float

    model_config = {"from_attributes": True}


class PortfolioResponse(BaseModel):
    id: int
    name: str
    holdings: list[HoldingResponse]

    model_config = {"from_attributes": True}


class PortfolioStatsResponse(BaseModel):
    tickers: list[str]
    weights: list[float]
    covariance_matrix: dict[str, dict[str, float]]
    correlation_matrix: dict[str, dict[str, float]]
    portfolio_variance: float
    portfolio_volatility: float


@router.post("/portfolios", response_model=PortfolioResponse, status_code=201)
def create_portfolio_endpoint(
    request: PortfolioCreateRequest, db: Session = Depends(get_db)
):
    return create_portfolio(db, request.name, [h.model_dump() for h in request.holdings])


@router.get("/portfolios/{portfolio_id}/stats", response_model=PortfolioStatsResponse)
def read_portfolio_stats(portfolio_id: int, db: Session = Depends(get_db)):
    portfolio = get_portfolio(db, portfolio_id)
    if portfolio is None:
        raise HTTPException(
            status_code=404, detail=f"Portfolio {portfolio_id} not found."
        )

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
