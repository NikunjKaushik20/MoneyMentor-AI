# MoneyMentor AI — CFO for Every Indian 💰

> **ET AI Hackathon 2026 | Problem Statement #9 — AI Money Mentor**

95% of Indians don't have a financial plan. MoneyMentor AI gives every Indian a personal CFO — upload your Form 16, get instant tax optimization, missed deductions, and a personalized action plan.

## Quick Start

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env          # Add your OpenAI API key
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev                    # Runs on http://localhost:3000
```

### 3. Use It

1. Open http://localhost:3000
2. Upload your Form 16 PDF
3. Fill in additional details (rent, age, etc.)
4. Click "Analyze My Taxes"
5. Get your complete tax analysis dashboard

## Features

- **Form 16 PDF Parsing** — pdfplumber + GPT-4o vision fallback
- **Tax Regime Comparison** — Old vs New regime with exact ₹ breakdown
- **Missed Deduction Detection** — 80C, 80CCD(1B), 80D, HRA, 24(b), 80TTA
- **AI Action Plan** — GPT-powered personalized tax-saving steps
- **Premium Dashboard** — Dark glassmorphism UI with animated counters

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload-form16` | Upload PDF → parsed tax profile |
| POST | `/api/analyze-tax` | Full AI analysis with action plan |
| POST | `/api/quick-analyze` | Instant math-only analysis |
| GET | `/api/health` | Server health check |

## Tech Stack

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Python FastAPI
- **AI:** OpenAI GPT-4o / GPT-4o-mini
- **PDF Parsing:** pdfplumber + GPT-4o vision

## Environment Variables

```
OPENAI_API_KEY=sk-your-key
GPT_MODEL=gpt-4o-mini
FRONTEND_URL=http://localhost:3000
```

---

Built for the ET AI Hackathon 2026 🇮🇳
