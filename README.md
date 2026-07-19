# 🚀 StudyForge AI

> Intelligent AI-Powered Study Assistant

StudyForge AI is an AI-powered academic productivity platform that transforms raw study materials into structured learning resources. The application helps students upload documents and automatically generate smart study content such as notes, flashcards, quizzes, and revision sheets.

## ✨ What It Generates

- 📘 Smart AI Notes
- 🧠 Active Recall Flashcards
- ❓ Practice Quizzes
- ⚡ Rapid Revision Sheets
- 📄 Exportable Study Material PDFs

The project focuses on using Generative AI to make learning faster, more personalized, and more effective.

---

## 🎓 Internship Project Information

- **Program:** CBSOT AIML Internship
- **Project:** StudyForge AI
- **Domain:** Artificial Intelligence & Machine Learning
- **Mentor:** Aryesh Rai

This project was developed as part of the CBSOT AIML Internship program, applying concepts such as:

- Generative AI
- Large Language Models
- Document Intelligence
- AI Agents
- Full Stack Application Development

---

## ✨ Features

### 📄 Intelligent Document Processing

- Upload academic documents
- Extract meaningful content from PDFs
- Cache processed documents for faster future access
- Reduce unnecessary AI processing using document hashing

### 📘 AI Notes Generation

StudyForge AI converts learning material into structured notes containing:

- Core concepts
- Important definitions
- Step-by-step explanations
- Examples
- Common mistakes
- Quick revision sections

### 🧠 AI Flashcards

Creates active-recall-based flashcards designed for efficient revision.

Features:

- Question-answer format
- Concept-focused learning
- Interactive flip-card interface

### ❓ AI Practice Quiz

Generates personalized quizzes from uploaded content.

Features:

- Multiple-choice questions
- Difficulty selection
- Answer validation
- Explanations for each answer
- Score tracking

### ⚡ Rapid Revision Generator

Creates condensed revision sheets for quick exam preparation.

Available modes:

- 5-Minute Rapid Revision
- 15-Minute Core Revision
- Full Revision Sheet

### 📄 PDF Export

Generated notes can be exported into downloadable PDF format.

---

## 🏗️ Project Architecture

```text
StudyForge-AI
├── Backend (FastAPI)
├── api
│   └── REST API routes
├── agents
│   ├── Notes Agent
│   ├── Flashcard Agent
│   ├── Quiz Agent
│   └── Revision Agent
├── services
│   └── Document Processing Services
├── core
│   └── Gemini AI Integration
├── exporters
│   └── PDF Generation
└── frontend (Next.js)
    ├── Upload Interface
    ├── Dashboard
    ├── Notes Viewer
    ├── Flashcards
    ├── Quiz System
    └── Revision Interface
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion Animations
- Lucide Icons

### Backend

- Python
- FastAPI
- Uvicorn

### Artificial Intelligence

- Google Gemini API
- Generative AI Agents
- Prompt Engineering
- AI Content Generation

### Document Processing

- PDF Extraction
- Document Hashing
- Content Caching

---

## ⚙️ Local Setup

### Backend

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

### 🔑 Environment Setup

Create a `.env` file in the project root with the following:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 🧩 Development Highlights

During development, the project implemented:

- ✅ Full-stack AI application architecture
- ✅ FastAPI backend services
- ✅ Next.js interactive frontend
- ✅ AI agent-based content generation
- ✅ PDF document intelligence pipeline
- ✅ Gemini API integration
- ✅ Document caching system
- ✅ Dynamic learning interfaces
- ✅ Quiz evaluation system
- ✅ Export functionality

---

## 📚 Learning Outcomes

Through this project, the following concepts were explored:

- Building production-style AI applications
- Working with Large Language Models
- Designing AI workflows
- Connecting frontend and backend systems
- Creating scalable API architectures
- Prompt engineering for structured outputs
- Building user-focused educational technology

---

## 🙏 Acknowledgement

I would like to sincerely thank Aryesh Rai for guidance, mentorship, and support throughout the CBSOT AIML Internship.

I am also grateful to the CBSOT AIML Internship program for providing the opportunity to explore Artificial Intelligence, Machine Learning, and Generative AI through practical implementation.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Tanmay Jain**

- GitHub: https://github.com/TanmayJain-dev
- Project: StudyForge AI