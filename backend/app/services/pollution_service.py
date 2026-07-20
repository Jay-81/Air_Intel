import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution"


def get_air_pollution(lat, lon):

    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY
    }

    response = requests.get(BASE_URL, params=params)

    response.raise_for_status()

    data = response.json()

    pollution = data["list"][0]

    return {
        "aqi": pollution["main"]["aqi"],
        "co": pollution["components"]["co"],
        "no": pollution["components"]["no"],
        "no2": pollution["components"]["no2"],
        "o3": pollution["components"]["o3"],
        "so2": pollution["components"]["so2"],
        "pm2_5": pollution["components"]["pm2_5"],
        "pm10": pollution["components"]["pm10"],
        "nh3": pollution["components"]["nh3"]
    }