import fitz


def render_pdf_page(pdf_path: str, page_number: int = 0):
    """
    Convert a PDF page into an image.

    Args:
        pdf_path: Path to PDF.
        page_number: Zero-indexed page.

    Returns:
        PNG image bytes.
    """

    document = fitz.open(pdf_path)

    page = document[page_number]

    pix = page.get_pixmap(
        matrix=fitz.Matrix(2, 2)
    )

    image_bytes = pix.tobytes("png")

    document.close()

    return image_bytes