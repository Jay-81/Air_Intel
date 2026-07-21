def build_analysis_prompt(city, current_aqi, forecast):
    return f"""
You are an AI environmental health assistant.

Analyze the following air quality data.

City: {city}

Current AQI: {current_aqi}

Forecast:
- 24 Hours: {forecast["24_hours"]}
- 48 Hours: {forecast["48_hours"]}
- 72 Hours: {forecast["72_hours"]}

Respond ONLY with valid JSON in exactly this format:

{{
    "risk_level": "",
    "summary": "",
    "health_advice": [
        "",
        "",
        ""
    ],
    "outdoor_activity": "",
    "mask_recommendation": "",
    "sensitive_groups": ""
}}

Rules:
- Return ONLY JSON.
- No markdown.
- No code fences.
- Summary must be under 40 words.
- Give exactly 3 health advice points.
- Keep responses short and practical.
"""