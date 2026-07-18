import json
import hashlib
from pathlib import Path


CACHE_DIR = Path("data/cache")


def get_file_hash(file_path: str) -> str:
    """
    Generate a stable hash for a file.
    """

    hasher = hashlib.sha256()

    with open(file_path, "rb") as file:
        while chunk := file.read(8192):
            hasher.update(chunk)

    return hasher.hexdigest()


def get_cache_path(file_path: str) -> Path:
    """
    Return the cache path for a document.
    """

    file_hash = get_file_hash(file_path)

    return CACHE_DIR / f"{file_hash}.json"


def save_cache(file_path: str, pages: list):
    """
    Save extracted document pages to cache.
    """

    CACHE_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    cache_path = get_cache_path(file_path)

    data = [
        {
            "page_number": page.page_number,
            "content": page.content,
            "source": page.source
        }
        for page in pages
    ]

    with open(
        cache_path,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=2
        )


def load_cache(file_path: str):
    """
    Load cached document pages if available.
    """

    cache_path = get_cache_path(file_path)

    if not cache_path.exists():
        return None

    with open(
        cache_path,
        "r",
        encoding="utf-8"
    ) as file:

        data = json.load(file)

    return data