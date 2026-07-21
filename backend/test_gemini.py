import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ API key not found")
    exit()

print("✅ API key loaded successfully")

client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="models/gemini-3.1-flash-lite",
    contents="Give one short health recommendation for a person exposed to high air pollution."
)

print("\nGemini Response:")
print(response.text)