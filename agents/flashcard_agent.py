from core.llm import ask_gemini


def generate_flashcards(content: str) -> str:
    """
    Generate active recall flashcards.
    """

    prompt = f"""
You are StudyForge AI, an expert learning assistant.

Create high-quality flashcards from the study material.

Rules:

- Focus on important concepts.
- Use active recall style.
- Do not create trivial questions.
- Cover definitions, algorithms, formulas, and mistakes.

Format exactly:

## Flashcard 1

Q:
(question)

A:
(answer)


## Flashcard 2

Q:
(question)

A:
(answer)

Study Material:

{content}
"""

    return ask_gemini(prompt)