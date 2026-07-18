from fastapi import FastAPI

from api.routes import router


app = FastAPI(
    title="StudyForge AI",
    version="1.0.0"
)


app.include_router(router)


@app.get("/")
def home():

    return {
        "message":
        "StudyForge AI Backend Running"
    }