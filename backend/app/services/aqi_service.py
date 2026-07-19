import requests

from app.core.config import OPENWEATHER_API_KEY

BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution"


def get_live_aqi(lat, lon):
    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY,
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    return {
        "aqi": data["list"][0]["main"]["aqi"],
        "components": data["list"][0]["components"],
    }