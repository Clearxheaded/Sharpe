# Sharpe — Planning & Decision Log

## Status
Week 1: endpoint built, and tested

## Architecture
- Router → Service → Cache. Service layer never imports FastAPI; raises plain exceptions, router translates them to HTTP.
- In-memory dict cache (24h TTL) for now, will be replaced
- Custom `TickerNotFoundError` instead of bare `Exception`, so the router only catches what it expects to.
- Invalid/delisted ticker -> 404 with structured JSON, not 500 or a raw stack trace.

## Open questions / TODO
- [ ] Add ticker input validation before it hits the stats pipeline.

## Log
 
**Week 1** — Returns, volatility, first endpoint.
- Built: `GET /api/tickers/{ticker}/stats`
- Concepts: log return telescoping, sqrt(252) annualization, ddof=1 (Bessel's correction), normality assumption behind std dev as a risk measure
- Engineering: pandas basics, custom exceptions, Pydantic validation, cache-key normalization, HTTP/service boundary, venv + dependency pinning
