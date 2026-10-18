# AI Cover Letter Generator

A SaaS-style utility built with Vite and vanilla JavaScript. The user enters their details and the app generates a professional cover letter, first from a hardcoded template, then with the Google Gemini API, and finally personalized with an uploaded PDF resume.

## Features

### Phase 1: Base MVP
- Form: Candidate Name, Job Role, Target Company, Key Skills (plus optional Job Description)
- Single `state` object updated on every input event
- Inline validation listing missing required fields
- `generateFromTemplate(state)` for a no-API hardcoded letter ("Quick Template (No AI)")
- Output card with a working "Copy to Clipboard" button (with fallback)

### Phase 2: LLM Integration and Security
- Google Gemini API (`gemini-2.5-flash`) via `fetch`
- `buildPrompt(state)` injects form data into a system prompt + user message
- API key read only from `import.meta.env.VITE_GEMINI_API_KEY`
- "Generating..." state with spinner, disabled buttons, and full error handling

### Phase 3: SaaS-Level Features
- "Upload Resume" dropzone (click, drag-and-drop, keyboard accessible, PDF only)
- Text extraction with `pdfjs-dist`
- Resume text (first 8000 characters) appended to the LLM payload
- Markdown output parsed into clean HTML paragraphs (HTML-escaped first)

## Setup

```bash
npm install
cp .env.example .env
# open .env and paste your free Gemini key from https://aistudio.google.com/app/apikey
npm run dev
```

## Project Structure

```
├── index.html
├── package.json
├── .env.example
├── .gitignore
├── Prompts.md
├── README.md
└── src
    ├── main.js
    └── style.css
```

## Security

`.env` is gitignored. `VITE_` variables are bundled into the browser build, so for production, proxy API calls through a backend.
