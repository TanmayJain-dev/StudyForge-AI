from core.document_loader import load_pdf
from agents.notes_agent import generate_notes


pages = load_pdf(
    "sample_docs/DSA_Patterns.pdf",
    max_pages=2
)


combined_content = "\n\n".join(
    f"""
--- SOURCE PAGE {page.page_number} ---
{page.content}
"""
    for page in pages
)


notes = generate_notes(combined_content)


print(notes)