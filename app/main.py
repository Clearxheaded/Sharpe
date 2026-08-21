"""
app entrypoint. this file's only job is to construct the FastAPI app and
register routers on it.
"""

from fastapi import FastAPI

from app.routers import auth, portfolios, stats

app = FastAPI(title="Sharpe API", version="0.1.0")

app.include_router(stats.router, prefix="/api")
app.include_router(portfolios.router, prefix="/api")
app.include_router(auth.router, prefix="/api")


@app.get("/health")
def health_check():
    return {"status": "ok"}
