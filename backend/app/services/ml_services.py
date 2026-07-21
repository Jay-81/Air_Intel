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

    # Get last 30 AQI values for the city
    last_30_aqi = get_last_30_aqi(city)

    # Convert to DataFrame (same format used during training)
    data = pd.DataFrame(last_30_aqi, columns=["AQI"])

    # Scale the data
    scaled = lstm_scaler.transform(data)

    # Reshape for LSTM input
    X = scaled.reshape(1, 30, 1)

    # Predict next 3 AQI values
    prediction = lstm_model.predict(X, verbose=0)

    # Convert back to original AQI scale
    prediction = lstm_scaler.inverse_transform(
        prediction.reshape(-1, 1)
    ).flatten()

    return {
        "24_hours": round(float(prediction[0]), 2),
        "48_hours": round(float(prediction[1]), 2),
        "72_hours": round(float(prediction[2]), 2),
    }