from pathlib import Path
import json
import joblib
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

# ==========================================================
# Base Paths
# ==========================================================
BASE_DIR = Path(__file__).resolve().parents[3]

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
    data_file = (
        Path(__file__).resolve().parent.parent
        / "data"
        / "locations.json"
    )

    with open(data_file, "r", encoding="utf-8") as file:
        return json.load(file)

# ==========================================================
# Random Forest - Current AQI Prediction
# ==========================================================
def predict_current_aqi(components):

    features = np.array([[
        components["pm2_5"],
        components["pm10"],
        components["no"],
        components["no2"],
        components["no"] + components["no2"],   # Approximate NOx
        components["nh3"],
        components["co"],
        components["so2"],
        components["o3"],
    ]])

    prediction = rf_model.predict(features)[0]

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

    last_30_aqi = get_last_30_aqi(city)

    data = np.array(last_30_aqi).reshape(-1, 1)

    scaled = lstm_scaler.transform(data)

    X = scaled.reshape(1, 30, 1)

    prediction = lstm_model.predict(X, verbose=0)

    prediction = lstm_scaler.inverse_transform(
        prediction.reshape(-1, 1)
    ).flatten()

    return {
        "24_hours": round(float(prediction[0]), 2),
        "48_hours": round(float(prediction[1]), 2),
        "72_hours": round(float(prediction[2]), 2),
    }