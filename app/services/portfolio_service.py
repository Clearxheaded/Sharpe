import numpy as np
import pandas as pd
from sqlalchemy.orm import Session

from app.models import Holding, Portfolio
from app.services.stats_service import compute_log_returns, fetch_prices

TRADING_DAYS = 252
MIN_OVERLAPPING_DAYS = 30


class InsufficientOverlapError(Exception):
    pass


def create_portfolio(db: Session, name: str, holdings: list[dict]) -> Portfolio:
    portfolio = Portfolio(
        name=name,
        holdings=[
            Holding(ticker=h["ticker"].upper(), weight=h["weight"]) for h in holdings
        ],
    )
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)
    return portfolio


def get_portfolio(db: Session, portfolio_id: int) -> Portfolio | None:
    return db.get(Portfolio, portfolio_id)


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
    correlation = returns.corr()

    portfolio_variance = float(weights @ annualized_cov.values @ weights)
    portfolio_volatility = float(np.sqrt(portfolio_variance))

    return {
        "tickers": tickers,
        "weights": weights.tolist(),
        "covariance_matrix": annualized_cov.round(6).to_dict(),
        "correlation_matrix": correlation.round(4).to_dict(),
        "portfolio_variance": portfolio_variance,
        "portfolio_volatility": portfolio_volatility,
    }
