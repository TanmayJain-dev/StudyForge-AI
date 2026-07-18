from fastapi import APIRouter, UploadFile, File
import shutil
import os

from agents.notes_agent import generate_notes
from services.document_service import DocumentService
from pydantic import BaseModel
from services.session_service import SessionService


router = APIRouter()


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

class SessionRequest(BaseModel):
    name: str

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
        file.filename
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