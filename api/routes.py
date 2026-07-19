from fastapi import APIRouter, UploadFile, File
import shutil
import os

from agents.notes_agent import generate_notes
from agents.flashcard_agent import generate_flashcards
from agents.quiz_agent import generate_quiz
from agents.revision_agent import generate_revision
from services.document_service import DocumentService
from pydantic import BaseModel
from services.session_service import SessionService
from fastapi.responses import FileResponse
from exporters.pdf_export import export_notes_pdf
import tempfile


router = APIRouter()


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

class SessionRequest(BaseModel):
    name: str

class FlashcardRequest(BaseModel):
    content: str

class RevisionRequest(BaseModel):
    content: str
    type: str = "5min"

@router.post("/session/create")
async def create_session(
    request: SessionRequest
):

    session = SessionService.create_session(
        request.name
    )

    return session

    
@router.post("/notes")
async def create_notes(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename or "uploaded_file"
    )


    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    content = DocumentService.extract_content(file_path)

    notes = generate_notes(
        content
    )


    return {
        "filename": file.filename,
        "notes": notes
    }

@router.post("/export/pdf")
async def export_pdf(data: dict):

    title = data.get("title", "Study Notes")
    notes = data.get("notes", "")

    temp = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp.close()

    export_notes_pdf(
        title=title,
        notes=notes,
        output_path=temp.name
    )

    return FileResponse(
        temp.name,
        filename="StudyForge_Notes.pdf",
        media_type="application/pdf"
    )

@router.post("/flashcards")
async def create_flashcards(
    request: FlashcardRequest
):

    flashcards = generate_flashcards(
        request.content
    )

    return {
        "flashcards": flashcards
    }

class QuizRequest(BaseModel):
    content: str


@router.post("/quiz")
async def create_quiz(request: QuizRequest):

    quiz = generate_quiz(request.content)

    return {
        "quiz": quiz
    }

@router.post("/revision")
async def create_revision(
    request: RevisionRequest
):

    revision = generate_revision(
        request.content,
        request.type
    )

    return {
        "revision": revision
    }