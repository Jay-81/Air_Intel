from pathlib import Path
import json
import joblib
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from geopy.geocoders import Nominatim
import time
# ==========================================================
# Base Paths
# ==========================================================
BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "ml" / "models"
DATASET_PATH = BASE_DIR / "ml" / "dataset" / "cleaned_city_day.csv"

# ==========================================================
# Load ML Models
# ==========================================================
rf_model = joblib.load(MODEL_DIR / "random_forest_aqi.pkl")

lstm_model = load_model(MODEL_DIR / "lstm_model.keras")

lstm_scaler = joblib.load(MODEL_DIR / "lstm_scaler.pkl")

# ==========================================================
# Load Dataset (only once)
# ==========================================================
aqi_history = pd.read_csv(DATASET_PATH)

# ==========================================================
# Load Locations
# ==========================================================

def get_all_locations():
    """
    Load all unique cities from the ML dataset and
    automatically fetch their coordinates.
    """

    geolocator = Nominatim(user_agent="air_intel")

    # Get unique cities from dataset
    cities = (
        aqi_history["City"]
        .dropna()
        .unique()
    )

    locations = []

    for city in sorted(cities):
        try:
            location = geolocator.geocode(city)

            if location:
                locations.append({
                    "name": city,
                    "latitude": location.latitude,
                    "longitude": location.longitude
                })

            # Prevent Nominatim rate limit
            time.sleep(1)

        except Exception:
            continue

    return locations

# ==========================================================
# Random Forest - Current AQI Prediction
# ==========================================================
def predict_current_aqi(features):

    model_input = pd.DataFrame([{
        "PM2.5": features["PM2.5"],
        "PM10": features["PM10"],
        "NO": features["NO"],
        "NO2": features["NO2"],
        "NOx": features["NOx"],
        "NH3": features["NH3"],
        "CO": features["CO"],
        "SO2": features["SO2"],
        "O3": features["O3"],
    }])

    prediction = rf_model.predict(model_input)[0]

    return round(float(prediction), 2)
# ==========================================================
# Get Last 30 AQI Values
# ==========================================================
def get_last_30_aqi(city):

    city_history = (
        aqi_history[aqi_history["City"] == city]
        .sort_values("Date")
    )

    history = (
        city_history["AQI"]
        .dropna()
        .tail(30)
        .tolist()
    )

    if len(history) < 30:
        raise ValueError(f"Not enough AQI history found for {city}")

    return history


def predict_next_3_days(city):
    try:
        # Get last 30 AQI values
        last_30_aqi = get_last_30_aqi(city)

        # Convert to DataFrame
        data = pd.DataFrame(last_30_aqi, columns=["AQI"])

        # Scale
        scaled = lstm_scaler.transform(data)

        # Reshape
        X = scaled.reshape(1, 30, 1)

        # Predict
        prediction = lstm_model.predict(X, verbose=0)

        # Convert back
        prediction = lstm_scaler.inverse_transform(
            prediction.reshape(-1, 1)
        ).flatten()

        return {
            "24_hours": round(float(prediction[0]), 2),
            "48_hours": round(float(prediction[1]), 2),
            "72_hours": round(float(prediction[2]), 2),
        }

    except Exception:
        # Fallback values if no history exists
        return {
            "24_hours": 100.0,
            "48_hours": 102.0,
            "72_hours": 98.0,
        }