from dotenv import load_dotenv
import os

# Load .env
load_dotenv()

# ============================
# API Keys
# ============================
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ============================
# Validation
# ============================
if not OPENWEATHER_API_KEY:
    raise ValueError("OPENWEATHER_API_KEY not found in .env")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")