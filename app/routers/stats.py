"""
router: HTTP concerns only.

this file's job is to translate an HTTP request into a service function call,
and translate the result (or exception) into an HTTP response. It does not
contain any math or any yfinance calls directly.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.stats_service import get_ticker_stats, TickerNotFoundError

router = APIRouter()


class TickerStatsResponse(BaseModel):
    ticker: str
    annualized_return: float
    annualized_volatility: float
    data_points: int


@router.get("/tickers/{ticker}/stats", response_model=TickerStatsResponse)
def read_ticker_stats(ticker: str):
    try:
        stats = get_ticker_stats(ticker.upper())
    except TickerNotFoundError:
        raise HTTPException(
            status_code=404,
            detail=f"Ticker '{ticker}' not found or has no available price data.",
        )

    return stats
