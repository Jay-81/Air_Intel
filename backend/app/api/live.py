from fastapi import APIRouter

from app.services.aqi_service import get_live_aqi

router = APIRouter(
    prefix="/live",
    tags=["Live AQI"],
)


@router.get("/aqi")
def live_aqi(lat: float, lon: float):
    return get_live_aqi(lat, lon)