import json
import uuid
from pathlib import Path
from datetime import datetime

from models.session import StudySession


class SessionService:

    STORAGE = Path("storage/sessions")

    @classmethod
    def create_session(cls, name: str) -> StudySession:

        session = StudySession(
            session_id=str(uuid.uuid4())[:8],
            name=name,
            created_at=datetime.now(),
        )

        session_folder = cls.STORAGE / session.session_id
        session_folder.mkdir(parents=True, exist_ok=True)

        with open(
            session_folder / "metadata.json",
            "w"
        ) as f:

            json.dump(
                session.model_dump(mode="json"),
                f,
                indent=4,
            )

        return session

    @classmethod
    def load_session(cls, session_id: str) -> StudySession:

        session_file = (
            cls.STORAGE /
            session_id /
            "metadata.json"
        )

        with open(session_file) as f:
            data = json.load(f)

        return StudySession(**data)

    @classmethod
    def save_session(cls, session: StudySession):

        session_file = (
            cls.STORAGE /
            session.session_id /
            "metadata.json"
        )

        with open(session_file, "w") as f:

            json.dump(
                session.model_dump(
                    mode="json"
                ),
                f,
                indent=4
            )

    @classmethod
    def add_document(
        cls,
        session_id: str,
        filename: str,
        document_hash: str,
        pages: int
    ):

        session = cls.load_session(
            session_id
        )

        session.documents.append({

            "filename": filename,

            "hash": document_hash,

            "pages": pages

        })

        cls.save_session(session)