from pydantic import BaseModel
from typing import List


class Forecast(BaseModel):
    morning: int
    afternoon: int
    evening: int


class Location(BaseModel):
    id: int
    name: str
    coordinates: List[float]
    aqi: int
    status: str
    pm25: int
    pm10: int
    humidity: int
    temperature: int
    cause: str
    forecast: Forecast


class MapLocation(BaseModel):
    name: str
    latitude: float
    longitude: float
    aqi: int