from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.aqi import router as aqi_router
from app.api.live import router as live_router

app = FastAPI(
    title="AirIntel API",
    version="1.0.0",
    description="Backend API for AirIntel"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(aqi_router)
app.include_router(live_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to AirIntel API"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }