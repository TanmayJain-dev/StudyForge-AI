from pydantic import BaseModel
from datetime import datetime


class StudySession(BaseModel):
    session_id: str
    name: str
    created_at: datetime
    documents: list[dict] = []