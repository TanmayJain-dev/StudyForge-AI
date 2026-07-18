import json

from core.llm import ask_gemini


def generate_quiz(content: str) -> list[dict]:
    """
    Generate a structured multiple-choice quiz.
    """

    prompt = f"""
You are StudyForge AI, an expert assessment designer.

Create a quiz from the following study material.

Generate exactly 5 multiple-choice questions.

Requirements:
- Test genuine understanding, not trivial memorization.
- Cover different concepts.
- Include a mix of easy, medium, and difficult questions.
- Each question must have exactly 4 options.
- The correct answer must be represented by its zero-based option index.
- Include a concise explanation.

Return ONLY valid JSON.
Do not use Markdown.
Do not include ```json fences.

Required format:

[
  {{
    "question": "Question text",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correct_answer": 0,
    "explanation": "Why this answer is correct"
  }}
]

Study Material:

{content}
"""

    response = ask_gemini(prompt)

    return json.loads(response)