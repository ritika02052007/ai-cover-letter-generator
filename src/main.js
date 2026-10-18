import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// ---------- Config (key comes from .env, never hardcode it) ----------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// ---------- State ----------
const state = {
  name: "",
  role: "",
  company: "",
  skills: "",
  jd: "",
  resumeText: "",
};

// ---------- DOM ----------
const $ = (id) => document.getElementById(id);
const form = $("letter-form");
const fields = ["name", "role", "company", "skills", "jd"];
const errorEl = $("error");
const outputCard = $("output-card");
const outputEl = $("output");
const loadingEl = $("loading");
const btnAI = $("btn-ai");
const btnTemplate = $("btn-template");
const btnCopy = $("btn-copy");
const dropzone = $("dropzone");
const resumeInput = $("resume");
const dropText = $("drop-text");

// ---------- Phase 1: state capture ----------
fields.forEach((f) => {
  $(f).addEventListener("input", (e) => {
    state[f] = e.target.value.trim();
  });
});

function validate() {
  const missing = ["name", "role", "company", "skills"].filter((k) => !state[k]);
  if (missing.length) {
    showError(`Please fill: ${missing.join(", ")}`);
    return false;
  }
  hideError();
  return true;
}

// ---------- Phase 1: simulated controller (hardcoded template) ----------
function generateFromTemplate({ name, role, company, skills }) {
  return `Dear Hiring Manager at ${company},

I am writing to express my interest in the ${role} position at ${company}. My name is ${name}, and I bring hands-on experience in ${skills}.

I am passionate about building reliable, user-focused solutions, and I believe my skills align well with what ${company} is looking for. I would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your time and consideration.

Sincerely,
${name}`;
}

// ---------- Phase 2: prompt engineering + Gemini call ----------
function buildPrompt(s) {
  const system = [
    "You are an expert career coach and professional cover letter writer.",
    "Write a concise, compelling cover letter of 250-350 words in a confident, professional tone.",
    "Use only facts provided by the candidate. Never invent employers, degrees or numbers.",
    "Structure: greeting, strong opening, 1-2 body paragraphs matching skills to the role, closing with a call to action, and a sign-off.",
    "Output plain markdown paragraphs only: no headings, no preamble, no explanations.",
  ].join(" ");

  const user = [
    `Candidate Name: ${s.name}`,
    `Job Role: ${s.role}`,
    `Target Company: ${s.company}`,
    `Key Skills: ${s.skills}`,
    s.jd ? `Job Description:\n${s.jd}` : "",
    s.resumeText ? `Resume Text (use for personalization):\n${s.resumeText.slice(0, 8000)}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return { system, user };
}

async function generateWithGemini(s) {
  if (!API_KEY || API_KEY === "your_key_here") {
    throw new Error("Missing API key. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server.");
  }
  const { system, user } = buildPrompt(s);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });

  if (!res.ok) {
    let msg = `API error (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.error?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
  if (!text) throw new Error("The AI returned an empty response. Try again.");
  return text;
}

// ---------- Phase 3: PDF parsing ----------
async function extractPdfText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return text.replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
}

async function handleResume(file) {
  if (!file) return;
  if (file.type !== "application/pdf") {
    showError("Please upload a PDF file.");
    return;
  }
  hideError();
  dropText.textContent = "⏳ Reading resume...";
  try {
    state.resumeText = await extractPdfText(file);
    if (!state.resumeText) throw new Error("No text found (scanned PDF?).");
    dropzone.classList.add("loaded");
    dropText.textContent = `✅ ${file.name} loaded (${state.resumeText.length} characters)`;
  } catch (err) {
    state.resumeText = "";
    dropzone.classList.remove("loaded");
    dropText.textContent = "📄 Upload Resume (PDF) — click or drag & drop";
    showError(`Could not read PDF: ${err.message}`);
  }
}

dropzone.addEventListener("click", () => resumeInput.click());
dropzone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") resumeInput.click();
});
resumeInput.addEventListener("change", (e) => handleResume(e.target.files[0]));
["dragenter", "dragover"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add("drag"); })
);
["dragleave", "drop"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.remove("drag"); })
);
dropzone.addEventListener("drop", (e) => handleResume(e.dataTransfer.files[0]));

// ---------- Markdown -> clean HTML paragraphs ----------
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function markdownToHtml(md) {
  return escapeHtml(md)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

// ---------- UI helpers ----------
function showError(msg) { errorEl.textContent = msg; errorEl.hidden = false; }
function hideError() { errorEl.hidden = true; }

function setLoading(isLoading) {
  loadingEl.hidden = !isLoading;
  btnAI.disabled = isLoading;
  btnTemplate.disabled = isLoading;
  btnAI.textContent = isLoading ? "Generating..." : "Generate with AI";
  if (isLoading) { outputEl.innerHTML = ""; btnCopy.disabled = true; }
  else btnCopy.disabled = false;
}

// ---------- Handlers ----------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;
  outputCard.hidden = false;
  setLoading(true);
  try {
    const text = await generateWithGemini(state);
    outputEl.innerHTML = markdownToHtml(text);
  } catch (err) {
    outputCard.hidden = true;
    showError(err.message);
  } finally {
    setLoading(false);
  }
});

btnTemplate.addEventListener("click", () => {
  if (!validate()) return;
  outputCard.hidden = false;
  outputEl.innerHTML = markdownToHtml(generateFromTemplate(state));
});

btnCopy.addEventListener("click", async () => {
  const text = outputEl.innerText;
  if (!text.trim()) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const old = btnCopy.textContent;
  btnCopy.textContent = "Copied ✓";
  setTimeout(() => (btnCopy.textContent = old), 1500);
});
