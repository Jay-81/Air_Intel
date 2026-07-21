import json
import os

from dotenv import load_dotenv
from google import genai

from app.prompts.analysis_prompt import build_analysis_prompt

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_health_analysis(city, current_aqi, forecast):

    prompt = build_analysis_prompt(
        city,
        current_aqi,
        forecast,
    )

    response = client.models.generate_content(
        model="models/gemini-3.1-flash-lite",
        contents=prompt,
    )

    text = response.text.strip()

    # Remove markdown code blocks if present
    if text.startswith("```"):
        text = (
            text.replace("```json", "")
                .replace("```JSON", "")
                .replace("```", "")
                .strip()
        )

    # Safely parse JSON
    try:
        return json.loads(text)

    except json.JSONDecodeError:
        return {
            "risk_level": "Unknown",
            "summary": text,
            "health_advice": [],
            "outdoor_activity": "",
            "mask_recommendation": "",
            "sensitive_groups": ""
        }