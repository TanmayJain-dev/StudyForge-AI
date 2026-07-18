from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.session_service import SessionService
from services.document_service import DocumentService
from agents.notes_agent import generate_notes
from agents.flashcard_agent import generate_flashcards
from agents.quiz_agent import generate_quiz


router = APIRouter()


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/session/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )


    session = SessionService.create_session(
        file.filename
    )


    content = DocumentService.extract_content(
        file_path
    )

    session_file = os.path.join(
        "storage",
        "sessions",
        f"{session.session_id}.txt"
    )

    os.makedirs(
        "storage/sessions",
        exist_ok=True
    )

    with open(session_file, "w", encoding="utf-8") as f:
        f.write(content)


    document_hash = DocumentService.calculate_hash(
        file_path
    )


    SessionService.add_document(
        session.session_id,
        file.filename,
        document_hash,
        len(content)
    )


    return {
        "session_id": session.session_id,
        "filename": file.filename,
        "cached": DocumentService.document_exists(
            document_hash
        )
    }


@router.get("/session/{session_id}/notes")
def get_notes(session_id: str):

    session_file = os.path.join(
        "storage",
        "sessions",
        f"{session_id}.txt"
    )

    if not os.path.exists(session_file):
        return {
            "error": "Session not found"
        }

    with open(session_file, "r", encoding="utf-8") as f:
        content = f.read()

    notes = generate_notes(content)

    return {
        "notes": notes
    }


@router.get("/session/{session_id}/flashcards")
def get_flashcards(session_id: str):

    session_file = os.path.join(
        "storage",
        "sessions",
        f"{session_id}.txt"
    )

    if not os.path.exists(session_file):
        return {"error": "Session not found"}

    with open(session_file, "r", encoding="utf-8") as f:
        content = f.read()

    return {
        "flashcards": generate_flashcards(content)
    }


@router.get("/session/{session_id}/quiz")
def get_quiz(session_id: str):

    session_file = os.path.join(
        "storage",
        "sessions",
        f"{session_id}.txt"
    )

    if not os.path.exists(session_file):
        return {"error": "Session not found"}

    with open(session_file, "r", encoding="utf-8") as f:
        content = f.read()

    return {
        "quiz": generate_quiz(content)
    }