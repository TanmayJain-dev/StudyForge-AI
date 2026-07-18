import markdown


def render_notes_html(markdown_text: str) -> str:
    """
    Convert markdown notes into styled HTML.
    """

    html_content = markdown.markdown(
        markdown_text,
        extensions=[
            "tables",
            "fenced_code"
        ]
    )

    template = f"""
<!DOCTYPE html>
<html>
<head>

<style>

body {{
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: auto;
    padding: 40px;
    background: #f8fafc;
    color: #1e293b;
}}

h1 {{
    color: #2563eb;
    border-bottom: 3px solid #2563eb;
    padding-bottom: 10px;
}}

h2 {{
    color: #0f766e;
    margin-top: 30px;
}}

blockquote {{
    background: #eff6ff;
    padding: 15px;
    border-left: 5px solid #2563eb;
}}

table {{
    width:100%;
    border-collapse: collapse;
}}

td, th {{
    border:1px solid #cbd5e1;
    padding:8px;
}}

code {{
    background:#e2e8f0;
    padding:3px;
}}

</style>

</head>

<body>

{html_content}

</body>

</html>
"""

    return template