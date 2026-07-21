from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.aqi import router as aqi_router
from app.api.aqi import router as locations_router

app = FastAPI(
    title="Air Intel API",
    version="1.0.0",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI AQI Endpoint
app.include_router(aqi_router)

# Locations Endpoint
app.include_router(locations_router)


@app.get("/")
def home():
    return {
        "message": "Air Intel Backend Running 🚀"
    }