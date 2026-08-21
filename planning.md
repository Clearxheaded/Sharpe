# Sharpe — Planning & Decision Log

## Status
Week 3: Sharpe ratio, JWT auth (access + refresh), user-scoped portfolio CRUD — built and tested

## Architecture
- Router → Service → Cache. Service layer never imports FastAPI; raises plain exceptions, router translates them to HTTP.
- In-memory dict cache (24h TTL) for price history for now, will be replaced
- Custom exceptions (`TickerNotFoundError`, `InsufficientOverlapError`) instead of bare `Exception`, so the router only catches what it expects to.
- Invalid/delisted ticker -> 404 with structured JSON, not 500 or a raw stack trace.
- Postgres via SQLAlchemy. Alembic for schema migrations instead of `Base.metadata.create_all`, so schema changes are versioned and reviewable, not just whatever the models currently say.
- Tooling migrated from venv/requirements.txt to uv (project-wide machine rule). `pyproject.toml` + `uv.lock`, `[tool.uv] package = false` since this is an app, not a distributable package.
- Local Postgres runs via `docker-compose.yml`. `.env` (gitignored) holds `DATABASE_URL`; `.env.example` checked in as the template.

## Open questions / TODO
- [x] Add ticker input validation before it hits the stats pipeline.
- [x] `portfolios` has no `user_id` yet — deliberately deferred. Week 3 adds auth and the column arrives via a real migration then, not speculatively now.
- [ ] No frontend yet — all endpoints tested via curl. Frontend arrives later in the roadmap.
- [ ] `refresh_tokens` grows unboundedly (revoked/expired rows are never purged) — fine at this scale, would need a cleanup job for real usage.

## Log

**Week 1** — Returns, volatility, first endpoint.
- Built: `GET /api/tickers/{ticker}/stats`
- Concepts: log return telescoping, sqrt(252) annualization, ddof=1 (Bessel's correction), normality assumption behind std dev as a risk measure
- Engineering: pandas basics, custom exceptions, Pydantic validation, cache-key normalization, HTTP/service boundary, venv + dependency pinning

**Week 2** — Covariance, correlation, portfolio variance, real persistence.
- Built: `POST /api/portfolios` (create with holdings, weights validated to sum to 1), `GET /api/portfolios/{id}/stats` (covariance matrix, correlation matrix, portfolio variance/volatility)
- Concepts: covariance matrix as the pairwise generalization of variance, correlation as covariance normalized to [-1, 1], portfolio variance in matrix form (wᵀΣw), why correlation below 1 pulls portfolio volatility below the weighted average of the individual volatilities
- Engineering: SQLAlchemy ORM models + relationships, Alembic migration, sync DB session dependency via FastAPI `Depends`, Pydantic `model_validator` for cross-field validation (weights summing to 1), reused `fetch_prices`/`compute_log_returns` from Week 1 rather than duplicating them, uv migration

**Week 3** — Sharpe ratio, JWT auth, real backend.
- Built: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`; full portfolio CRUD (`GET /api/portfolios`, `GET/PATCH/DELETE /api/portfolios/{id}`) scoped to the authenticated user; `sharpe_ratio` added to `GET /api/portfolios/{id}/stats`
- Concepts: Sharpe ratio as excess return per unit of risk (Rp − Rf) / σp, risk-free rate as a real market input (13-week T-bill via `^IRX`) rather than a stat derived from the portfolio itself, why risk-adjusted comparison beats comparing raw returns
