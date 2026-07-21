import traceback
import requests

from app.core.config import OPENWEATHER_API_KEY
from app.services.ml_services import predict_current_aqi

BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution"


def get_live_aqi(lat, lon):
    try:
        params = {
            "lat": lat,
            "lon": lon,
            "appid": OPENWEATHER_API_KEY,
        }

        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()

        data = response.json()

        print("API Response:", data)

        components = data["list"][0]["components"]

        predicted_aqi = predict_current_aqi(components)

        return {
            "aqi": predicted_aqi,
            "components": components,
        }

    except Exception:
        traceback.print_exc()
        raise