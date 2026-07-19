DEFAULT_MODEL = "gemini-2.5-flash"

import os
from dotenv import load_dotenv

load_dotenv()

ENABLE_VISION = os.getenv(
    "ENABLE_VISION",
    "true"
).lower() == "true"