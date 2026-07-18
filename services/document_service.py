from core.document_loader import load_pdf
import hashlib
from pathlib import Path

class DocumentService:

    @staticmethod
    def extract_content(
        file_path: str,
        max_pages: int = 5
    ) -> str:

        document_hash = DocumentService.calculate_hash(
            file_path
        )

        if DocumentService.document_exists(
            document_hash
        ):

            print("📦 Loading document from cache")

            return DocumentService.load_cache(
                document_hash
            )

        pages = load_pdf(
            file_path,
            max_pages=max_pages
        )

        content = "\n\n".join(
            page.content
            for page in pages
        )

        DocumentService.save_cache(
            document_hash,
            content
        )

        return content

    @staticmethod
    def calculate_hash(file_path: str) -> str:

        sha256 = hashlib.sha256()

        with open(file_path, "rb") as f:

            while chunk := f.read(8192):
                sha256.update(chunk)

        return sha256.hexdigest()

    @staticmethod
    def document_exists(document_hash: str) -> bool:

        cache_folder = Path("storage/cache")

        return (
            cache_folder /
            f"{document_hash}.txt"
        ).exists()

    @staticmethod
    def get_cache_path(document_hash: str) -> Path:

        cache_dir = Path("storage/cache")
        cache_dir.mkdir(
            parents=True,
            exist_ok=True
        )

        return cache_dir / f"{document_hash}.txt"

    @staticmethod
    def save_cache(
        document_hash: str,
        content: str
    ):

        cache_path = DocumentService.get_cache_path(
            document_hash
        )

        cache_path.write_text(
            content,
            encoding="utf-8"
        )

    @staticmethod
    def load_cache(
        document_hash: str
    ) -> str:

        cache_path = DocumentService.get_cache_path(
            document_hash
        )

        return cache_path.read_text(
            encoding="utf-8"
        )