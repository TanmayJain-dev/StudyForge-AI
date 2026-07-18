from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.enums import TA_CENTER


def export_notes_pdf(
    title: str,
    notes: str,
    output_path: str
):
    """
    Export generated study notes as a PDF.
    """

    document = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    )

    styles = getSampleStyleSheet()

    title_style = styles["Title"]
    title_style.alignment = TA_CENTER

    body_style = styles["BodyText"]
    body_style.leading = 16

    story = []

    story.append(
        Paragraph(
            f"StudyForge AI — {title}",
            title_style
        )
    )

    story.append(Spacer(1, 15))

    for line in notes.split("\n"):

        line = line.strip()

        if not line:
            story.append(Spacer(1, 8))
            continue

        if line.startswith("# "):
            story.append(
                Paragraph(
                    line[2:],
                    styles["Heading1"]
                )
            )

        elif line.startswith("## "):
            story.append(
                Paragraph(
                    line[3:],
                    styles["Heading2"]
                )
            )

        elif line.startswith("### "):
            story.append(
                Paragraph(
                    line[4:],
                    styles["Heading3"]
                )
            )

        else:
            story.append(
                Paragraph(
                    line.replace("&", "&amp;"),
                    body_style
                )
            )

    document.build(story)