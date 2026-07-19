from core.llm import ask_gemini


def generate_revision(content: str, revision_type: str = "5min") -> str:

    prompt = f"""
You are StudyForge AI.

Create a concise revision sheet from the study material.

Revision type:
{revision_type}

Rules:
- Focus only on high-value exam points.
- Include important definitions.
- Include formulas/algorithms if present.
- Use bullet points.
- Make it easy to revise quickly.
- Avoid unnecessary explanations.

Format:

# Key Concepts

- concept

# Important Terms

- term : meaning

# Quick Summary

- summary points


Study Material:

{content}
"""

    return ask_gemini(prompt)