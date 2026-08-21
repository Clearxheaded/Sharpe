import numpy as np
import pandas as pd
from sqlalchemy.orm import Session

from app.models import Holding, Portfolio
from app.services.stats_service import (
    compute_log_returns,
    fetch_prices,
    get_risk_free_rate,
)

TRADING_DAYS = 252
MIN_OVERLAPPING_DAYS = 30


class InsufficientOverlapError(Exception):
    pass


def create_portfolio(
    db: Session, user_id: int, name: str, holdings: list[dict]
) -> Portfolio:
    portfolio = Portfolio(
        user_id=user_id,
        name=name,
        holdings=[
            Holding(ticker=h["ticker"].upper(), weight=h["weight"]) for h in holdings
        ],
    )
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)
    return portfolio


def list_portfolios(db: Session, user_id: int) -> list[Portfolio]:
    return db.query(Portfolio).filter(Portfolio.user_id == user_id).all()


def get_portfolio(db: Session, user_id: int, portfolio_id: int) -> Portfolio | None:
    return (
        db.query(Portfolio)
        .filter(Portfolio.id == portfolio_id, Portfolio.user_id == user_id)
        .first()
    )


def update_portfolio(
    db: Session,
    portfolio: Portfolio,
    name: str | None = None,
    holdings: list[dict] | None = None,
) -> Portfolio:
    if name is not None:
        portfolio.name = name
    if holdings is not None:
        portfolio.holdings = [
            Holding(ticker=h["ticker"].upper(), weight=h["weight"]) for h in holdings
        ]
    db.commit()
    db.refresh(portfolio)
    return portfolio


def delete_portfolio(db: Session, portfolio: Portfolio) -> None:
    db.delete(portfolio)
    db.commit()


def build_returns_matrix(tickers: list[str]) -> pd.DataFrame:
    series = {ticker: compute_log_returns(fetch_prices(ticker)) for ticker in tickers}
    returns = pd.DataFrame(series).dropna()

    if len(returns) < MIN_OVERLAPPING_DAYS:
        raise InsufficientOverlapError(tickers)

    return returns


def compute_portfolio_stats(portfolio: Portfolio) -> dict:
    tickers = [h.ticker for h in portfolio.holdings]
    weights = np.array([h.weight for h in portfolio.holdings])

    returns = build_returns_matrix(tickers)
    annualized_cov = returns.cov() * TRADING_DAYS
    annualized_mean_returns = returns.mean() * TRADING_DAYS
    correlation = returns.corr()

    portfolio_variance = float(weights @ annualized_cov.values @ weights)
    portfolio_volatility = float(np.sqrt(portfolio_variance))
    portfolio_return = float(weights @ annualized_mean_returns.values)

    risk_free_rate = get_risk_free_rate()
    sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_volatility

    return {
        "tickers": tickers,
        "weights": weights.tolist(),
        "covariance_matrix": annualized_cov.round(6).to_dict(),
        "correlation_matrix": correlation.round(4).to_dict(),
        "portfolio_variance": portfolio_variance,
        "portfolio_volatility": portfolio_volatility,
        "portfolio_return": portfolio_return,
        "risk_free_rate": risk_free_rate,
        "sharpe_ratio": sharpe_ratio,
    }
