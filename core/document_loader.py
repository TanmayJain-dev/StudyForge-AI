from parsers.pdf_parser import extract_pages_from_pdf
from parsers.vision_parser import render_pdf_page
from core.llm import ask_gemini_with_image
from core.document import DocumentPage
from config import ENABLE_VISION
from core.cache import (
    load_cache,
    save_cache
)


def load_pdf(pdf_path: str, max_pages: int | None = None):
    cached_pages = load_cache(pdf_path)

    if cached_pages is not None:

        print("Loading document from cache")

        return [
            DocumentPage(
                page_number=page["page_number"],
                content=page["content"],
                source=page["source"]
            )
            for page in cached_pages
        ]
    """
    Load a PDF and extract content intelligently.

    Uses:
    - PyMuPDF for normal text PDFs
    - Gemini Vision for image-only pages
    """

    extracted_pages = []

    text_pages = extract_pages_from_pdf(pdf_path)

    text_page_map = {
        page["page_number"]: page["text"]
        for page in text_pages
    }

    import fitz

    document = fitz.open(pdf_path)

    total_pages = len(document)

    if max_pages:
        total_pages = min(total_pages, max_pages)

    for page_number in range(1, total_pages + 1):

        if page_number in text_page_map:

            extracted_pages.append(
                DocumentPage(
                    page_number=page_number,
                    content=str(text_page_map[page_number]),
                    source="pdf_text"
                )
            )

        else:

            if not ENABLE_VISION:
                print(
                    f"Skipping Gemini Vision for page {page_number}"
                )

                extracted_pages.append(
                    DocumentPage(
                        page_number=page_number,
                        content="",
                        source="vision_disabled"
                    )
                )

                continue

            print(
                f"Using Gemini Vision for page {page_number}"
            )

            image = render_pdf_page(
                pdf_path,
                page_number - 1
            )

            vision_text = ask_gemini_with_image(
                """
                Extract all useful information from this study page.
                Include text, diagrams, explanations,
                and important concepts.
                """,
                image
            )

            extracted_pages.append(
                DocumentPage(
                    page_number=page_number,
                    content=vision_text,
                    source="gemini_vision"
                )
            )

    document.close()

    save_cache(
        pdf_path,
        extracted_pages
    )

    return extracted_pages