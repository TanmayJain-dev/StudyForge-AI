import os
from config import DEFAULT_MODEL
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)


def ask_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model=DEFAULT_MODEL,
        contents=prompt,
    )

    return response.text

def ask_gemini_with_image(prompt: str, image_bytes: bytes) -> str:
    """
    Ask Gemini to analyze an image.
    """

    from google.genai import types

    response = client.models.generate_content(
        model=DEFAULT_MODEL,
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image_bytes,
                mime_type="image/png"
            )
        ]
    )

    return response.text