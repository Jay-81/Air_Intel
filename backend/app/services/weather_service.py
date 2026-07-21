import requests

from app.core.config import OPENWEATHER_API_KEY


BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution"


def get_pollution_data(lat: float, lon: float):
    """
    Fetch live pollution data from OpenWeather.

    Returns:
        {
            "components": {...},
            "aqi": int
        }
    """

    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY,
    }

    response = requests.get(BASE_URL, params=params, timeout=10)

    response.raise_for_status()

    data = response.json()

    if "list" not in data or len(data["list"]) == 0:
        raise Exception("No pollution data returned by OpenWeather.")

    pollution = data["list"][0]

    return {
        "aqi": pollution["main"]["aqi"],
        "components": pollution["components"],
    }