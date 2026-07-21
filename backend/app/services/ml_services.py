from pathlib import Path
import json
import joblib
import numpy as np

# -----------------------------
# Load Random Forest Model
# -----------------------------
BASE_DIR = Path(__file__).resolve().parents[3]

MODEL_DIR = BASE_DIR / "ml" / "models"

rf_model = joblib.load(MODEL_DIR / "random_forest_aqi.pkl")


# -----------------------------
# Load Locations
# -----------------------------
def get_all_locations():
    data_file = (
        Path(__file__).resolve().parent.parent
        / "data"
        / "locations.json"
    )

    with open(data_file, "r", encoding="utf-8") as file:
        return json.load(file)


# -----------------------------
# Predict Current AQI
# -----------------------------
def predict_current_aqi(components):
    features = np.array([[
        components["pm2_5"],
        components["pm10"],
        components["no"],
        components["no2"],
        components["no"] + components["no2"],  # Approximate NOx
        components["nh3"],
        components["co"],
        components["so2"],
        components["o3"],
    ]])

    prediction = rf_model.predict(features)[0]

    return round(float(prediction), 2)