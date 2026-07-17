import fitz


def extract_pages_from_pdf(pdf_path: str) -> list[dict[str, str | int]]:
    """
    Extract text from a PDF page by page.

    Returns:
        A list of dictionaries containing page number and text.
    """

    document = fitz.open(pdf_path)
    pages = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text().strip()

        if text:
            pages.append({
                "page_number": page_number,
                "text": text,
            })

    document.close()

    return pages


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract all selectable text from a PDF as one string.
    """

    pages = extract_pages_from_pdf(pdf_path)

    return "\n\n".join(
        f"--- Page {page['page_number']} ---\n{page['text']}"
        for page in pages
    )