from app.services.weather_service import get_pollution_data
from app.services.ml_services import (
    predict_current_aqi,
    predict_next_3_days,
)


def get_live_aqi(city: str, lat: float, lon: float):
    """
    Complete AI pipeline.

    Flow:
        OpenWeather
            ↓
        Pollution Components
            ↓
        Random Forest
            ↓
        Current AQI
            ↓
        LSTM
            ↓
        Forecast
    """

    # -----------------------------
    # Get Live Pollution Data
    # -----------------------------
    weather = get_pollution_data(lat, lon)

    components = weather["components"]

    # -----------------------------
    # Convert OpenWeather format
    # to ML model format
    # -----------------------------
    model_input = {
        "PM2.5": components["pm2_5"],
        "PM10": components["pm10"],
        "NO": components["no"],
        "NO2": components["no2"],
        "NOx": components["no"] + components["no2"],
        "NH3": components["nh3"],
        "CO": components["co"],
        "SO2": components["so2"],
        "O3": components["o3"],
    }

    # -----------------------------
    # Random Forest Prediction
    # -----------------------------
    current_aqi = predict_current_aqi(model_input)

    # -----------------------------
    # LSTM Prediction
    # -----------------------------
    forecast = predict_next_3_days(city)

    # -----------------------------
    # Final Response
    # -----------------------------
    return {
        "city": city,

        "coordinates": {
            "latitude": lat,
            "longitude": lon
        },

        "current_aqi": round(current_aqi, 2),

        "forecast": forecast,

        "pollution_components": components
    }