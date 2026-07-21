from fastapi import APIRouter, HTTPException
import json
import os

from app.services.aqi_service import get_live_aqi

router = APIRouter()

@router.get("/aqi")
def fetch_aqi(city: str):

    file_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "..",
        "data",
        "locations.json"
    )

    with open(file_path, "r") as f:
        locations = json.load(f)

    location = next(
        (x for x in locations if x["name"].lower() == city.lower()),
        None
    )

    if not location:
        raise HTTPException(status_code=404, detail="City not found")

    return get_live_aqi(
        city,
        location["latitude"],
        location["longitude"]
    )