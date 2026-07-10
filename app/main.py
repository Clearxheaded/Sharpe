"""
app entrypoint. this file's only job is to construct the FastAPI app and
register routers on it. 
"""

from fastapi import FastAPI

from app.routers import stats

app = FastAPI(title="Sharpe API", version="0.1.0")

app.include_router(stats.router, prefix="/api")


@app.get("/health")
def health_check():
    return {"status": "ok"}
