import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ API key not found")
    exit()

print("✅ API key loaded successfully\n")

client = genai.Client(api_key=api_key)

print("Available models:\n")

for model in client.models.list():
    print(model.name)