"""
service layer: fetch prices, compute log returns and volatility.

"""

import numpy as np
import pandas as pd
import yfinance as yf

from app.cache import get_cached_prices, set_cached_prices


class TickerNotFoundError(Exception):
    """Raised when a ticker has no retrievable price data."""


def fetch_prices(ticker: str, period: str = "1y") -> pd.DataFrame:
    cached = get_cached_prices(ticker)
    if cached is not None:
        return cached

    data = yf.Ticker(ticker).history(period=period)

    if data.empty:
        raise TickerNotFoundError(ticker)

    set_cached_prices(ticker, data)
    return data


def compute_log_returns(prices: pd.DataFrame) -> pd.Series:
    close = prices["Close"]
    return np.log(close / close.shift(1)).dropna()


def compute_annualized_return(log_returns: pd.Series) -> float:
    mean_daily = log_returns.mean()
    return float(mean_daily * 252)


def compute_annualized_volatility(log_returns: pd.Series) -> float:
    daily_vol = log_returns.std(ddof=1)
    return float(daily_vol * np.sqrt(252))


def get_risk_free_rate() -> float:
    prices = fetch_prices("^IRX")
    return float(prices["Close"].iloc[-1]) / 100


def get_ticker_stats(ticker: str) -> dict:
    prices = fetch_prices(ticker)
    log_returns = compute_log_returns(prices)

    return {
        "ticker": ticker,
        "annualized_return": compute_annualized_return(log_returns),
        "annualized_volatility": compute_annualized_volatility(log_returns),
        "data_points": len(log_returns),
    }
