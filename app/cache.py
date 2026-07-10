"""
cache: for the scope of the beginning it's the simplest thing that works

this is an in-memory dict, keyed by ticker, storing a (timestamp, dataframe) pair.
it disappears on server restart and doesn't work across multiple server processes.
"""

from datetime import datetime, timedelta
import pandas as pd

# ticker -> (fetched_at: datetime, prices: pd.DataFrame)
_cache: dict[str, tuple[datetime, pd.DataFrame]] = {}

CACHE_TTL = timedelta(hours=24)


def get_cached_prices(ticker: str) -> pd.DataFrame | None:
    entry = _cache.get(ticker)
    if entry is None:
        return None

    fetched_at, prices = entry
    if datetime.now() - fetched_at > CACHE_TTL:
        return None  # stale would just be treated as a miss

    return prices


def set_cached_prices(ticker: str, prices: pd.DataFrame) -> None:
    _cache[ticker] = (datetime.now(), prices)
