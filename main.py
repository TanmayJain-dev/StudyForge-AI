from fastapi import FastAPI

from api.routes import router

from api.session_routes import router as session_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="StudyForge AI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    router,
    prefix="/api"
)

app.include_router(
    session_router,
    prefix="/api"
)

@app.get("/")
def home():
    return {
        "message": "StudyForge AI API running"
    }