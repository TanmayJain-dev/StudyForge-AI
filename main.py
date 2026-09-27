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
    allow_origins=["*"],
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
        "message": "StudyForge AI API running",
        "docs": "/docs"
    }

@app.get("/api/health")
def health():
    import os
    return {
        "status": "healthy",
        "service": "StudyForge AI API",
        "version": "1.0",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY"))
    }