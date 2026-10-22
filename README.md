<h1 align="center">🚀 AI Cover Letter Generator</h1>

<h3 align="center">
  Generate Professional Cover Letters with AI ✨
</h3>

<p align="center">
  A smart and user-friendly web application that helps job seekers
  create personalized, professional cover letters in seconds.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini">
</p>

---

## 📌 About The Project

**AI Cover Letter Generator** is a web-based application designed to simplify the job application process.

Writing a personalized cover letter for every job can be time-consuming. This application helps users generate professional cover letters by entering their personal details, target job role, company name, and relevant skills.

It combines a quick template-based generator with Google's Gemini AI to create personalized content. Users can also upload their PDF resumes to generate cover letters tailored to their experience and qualifications.

### 🎯 Project Goals

- Simplify the cover letter writing process.
- Help job seekers create professional application letters.
- Generate personalized content using AI.
- Reduce the time spent preparing job applications.
- Make cover letter generation simple and accessible.

---

## ✨ Features

### 📝 1. Personalized Input Form

Enter the information required to generate your cover letter:

- Candidate Name
- Job Role
- Target Company
- Key Skills
- Optional Job Description

The application maintains form data in a single state object and validates required fields before generating a letter.

### ⚡ 2. Quick Template Generator

Generate a cover letter without using an AI API.

- Uses a predefined cover letter template.
- Generates content using the information entered by the user.
- Works without making an API request.
- Provides a quick alternative when AI generation is unavailable.

### 🤖 3. Google Gemini AI Integration

Create personalized cover letters with Google's Gemini AI.

- Integrates the Gemini API using JavaScript `fetch`.
- Uses the `gemini-2.5-flash` model.
- Builds prompts dynamically using user-provided information.
- Generates professional, job-specific content.
- Handles API errors and unsuccessful requests.

### 📄 4. PDF Resume Upload

Upload an existing resume to generate a more relevant cover letter.

- Supports PDF resume uploads.
- Includes a click-to-upload interface.
- Supports drag-and-drop file selection.
- Provides keyboard-accessible upload functionality.
- Extracts resume text using `pdfjs-dist`.
- Includes up to the first 8,000 characters of extracted resume text in the AI prompt.

### 📋 5. Copy to Clipboard

Copy the generated cover letter with a single click.

- Quick and convenient copying.
- Includes a fallback for clipboard operations.
- Makes it easier to paste the letter into job application forms or documents.

### 🎨 6. User-Friendly Experience

- Clear form validation.
- Displays missing required fields.
- Shows a loading spinner while generating content.
- Disables relevant buttons during generation.
- Displays error messages when something goes wrong.
- Converts Markdown-style output into clean HTML paragraphs.
- Escapes generated text before inserting it into the page.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive interface |
| JavaScript | Application logic and state management |
| Vite | Development server and build tool |
| Google Gemini API | AI-powered cover letter generation |
| pdfjs-dist | Extracting text from PDF resumes |
| Clipboard API | Copying generated cover letters |
| npm | Dependency management |

---

## ⚙️ How It Works

The application follows a simple workflow:

**Step 1:** Enter your name, job role, target company, and skills.

**Step 2:** Optionally provide a job description or upload your PDF resume.

**Step 3:** Choose the quick template generator or AI-powered generation option.

**Step 4:** The application prepares the relevant information and generates your cover letter.

**Step 5:** Review the generated content and copy it to use in your job application.

---

## 📂 Project Structure

```text
AI-Cover-Letter-Generator/
│
├── index.html
├── package.json
├── .env.example
├── .gitignore
├── Prompts.md
├── README.md
│
└── src/
    ├── main.js
    └── style.css
```

### 📄 Important Files

- `index.html` — Main HTML entry point.
- `src/main.js` — Form handling, validation, API integration, and generation logic.
- `src/style.css` — Application styling.
- `.env.example` — Example environment variable configuration.
- `Prompts.md` — Prompt design and related instructions.
- `package.json` — Project dependencies and npm scripts.
- `README.md` — Project documentation.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- A code editor such as Visual Studio Code
- A Google Gemini API key for AI-powered generation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Navigate to the Project Folder

```bash
cd AI-Cover-Letter-Generator
```

Use your actual project folder name if it is different.

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy the example environment file.

On Windows Command Prompt:

```cmd
copy .env.example .env
```

Open the `.env` file and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from the official Google AI Studio website:

https://aistudio.google.com/app/apikey

**Important:** Never commit your actual `.env` file or expose your API key in a public repository.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

---

## 🔐 Security Considerations

This project follows several basic security practices:

- Reads the API key through a Vite environment variable.
- Escapes generated text before rendering it as HTML.
- Uses DOM-safe output handling to reduce HTML injection risks.
- Validates user inputs before generation.
- Restricts resume uploads to PDF files.

**Important security note:** Vite environment variables prefixed with `VITE_` are exposed to client-side code in the browser. Therefore, the Gemini API key is not truly secret in a publicly deployed frontend application.

For production deployment, route Gemini API requests through a backend server and keep the API key in server-side environment variables. Also validate uploaded files and enforce appropriate size limits.

---

## 💡 Use Cases

This application can be useful for:

- 🎓 College students applying for internships.
- 💼 Freshers preparing for their first job.
- 👩‍💻 Software developers applying for technical roles.
- 📄 Job seekers tailoring applications to different companies.
- 🚀 Professionals looking to speed up their job application process.

---

## 🔮 Future Improvements

The project can be extended with additional features:

- [ ] Download cover letters as PDF.
- [ ] Add multiple professional cover letter templates.
- [ ] Provide tone selection, such as formal, confident, or concise.
- [ ] Improve job description-based personalization.
- [ ] Add user authentication and saved cover letters.
- [ ] Support DOCX resume uploads.
- [ ] Add an option to regenerate or edit generated content.
- [ ] Introduce a backend API for secure Gemini integration.
- [ ] Add a cover letter history feature.
- [ ] Improve mobile responsiveness and accessibility.

---

## 🎯 Learning Outcomes

Building this project provides practical experience with:

- JavaScript DOM manipulation and event handling.
- Managing form state and input validation.
- Integrating a third-party AI API.
- Working with asynchronous JavaScript and `fetch`.
- Handling loading states and API errors.
- Reading PDF documents with `pdfjs-dist`.
- Managing environment variables in Vite.
- Rendering generated content safely.
- Building a complete frontend application.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

If you have an idea to improve this project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## 👩‍💻 Author

**Ritika Saini**

Computer Science Engineering Student | Aspiring Full Stack Developer

- 💻 GitHub: [ritika02052007](https://github.com/ritika02052007)


---



---

<p align="center">
  <b>Built with ❤️ to make job applications easier and smarter.</b>
</p>
