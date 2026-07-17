from core.llm import ask_gemini


def generate_notes(content: str) -> str:
    """
    Generate structured study notes from learning material.
    """

    prompt = f"""
You are an expert academic note creator.

Convert the following study material into clear,
well-structured notes.

Requirements:

- Use markdown formatting.
- Add headings and subheadings.
- Explain concepts simply.
- Include important definitions.
- Include examples where useful.
- End with a quick revision summary.

Study Material:

{content}
"""

    return ask_gemini(prompt)