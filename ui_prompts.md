# MoneyMentor AI — UI Redesign Prompts

Here are the two comprehensive prompts you requested. The first is optimized for **Stitch / v0 / UI Generators** to create a stunning, premium frontend. The second is for **Claude** to safely wire that newly generated UI into your existing FastAPI backend without breaking the complex tax logic.

---

## 🎨 Prompt 1: For Stitch (UI Generation)

***Copy and paste this into Stitch to generate your premium UI:***

```markdown
I need a complete UI redesign for a Next.js 14 (App Router) + Tailwind CSS web application called "MoneyMentor AI", built in partnership with Economic Times (ET Wealth). 

**Design Requirements:**
- **Theme:** Premium, modern FinTech aesthetic. Implement a robust Light/Dark mode toggle. Default to Dark mode (deep navy blues, off-blacks, subtle neon purple/indigo accents for a "glassmorphism" tech feel), but the Light mode should feel clean and trustworthy (whites, light grays, ET's signature red `#e4002b`).
- **Animations:** Use `framer-motion` for premium scroll-reveal effects, smooth page transitions, and micro-interactions (e.g., hover scaling on feature cards, glowing borders on primary buttons, smooth accordions).
- **Branding:** Include "ET WEALTH" and "ET × MoneyMentor AI" branding. 

**Pages & Components to Design (Create dummy data/state for now):**

1. **Global Layout & Header/Footer:**
   - **Header:** Sticky, glassmorphic. Logo on left, navigation links (Tax, Portfolio, Couples, Health, FIRE, Alerts) in center, Theme Toggle on right.
   - **Footer:** Must include trust/privacy badges: "🔒 Documents processed in-memory — never stored" and "🧮 Tax math = deterministic code".

2. **Landing Page (`/`):**
   - **Hero Section:** High-converting headline ("Budget 2025: Maximise your take-home pay"). A beautiful Drag & Drop zone for "Upload Form 16 PDF".
   - **Features Grid:** Cards for Tax Wizard, Portfolio X-Ray, Couple's Planner, Health Score, FIRE Planner, Proactive Alerts. Add hover glowing effects.
   - **Statistics/Trust row:** E.g., "Avg ₹25k+ savings found".

3. **Tax Analysis Dashboard:**
   - A loading state with a spinner that says "Analysing with AI... extracting deductions".
   - A Side-by-Side comparison table of "Old Regime vs New Regime". Use green highlights for the recommended/winning regime.
   - Cards showing "Missed Deductions" and an "AI Action Plan" timeline.

4. **Couple's Money Planner (`/couples`):**
   - Two columns for Partner A and Partner B inputs (Income, 80C, HRA, etc.).
   - A section for "Shared Deductions" (Home Loan, Health Insurance).
   - A beautifully animated results section showing "Combined Tax (Optimised)", "Savings from Smart Assignment", and who should claim which deduction.

5. **Mock ET Article (`/et-article`):**
   - A news article layout mimicking Economic Times. Clean typography layout.
   - Midway through the text, an embedded, glowing "Analyse MY Tax Impact" CTA card that looks like a seamless ad/widget integration.

**Tech constraints for the UI:**
- Use React hooks (`useState`, `useEffect`).
- Use Tailwind CSS for all styling (arbitrary values are fine).
- Use `lucide-react` for beautiful, consistent iconography.
- Ensure the layout is responsive (mobile-first).

Please generate the code for these components. Focus entirely on the aesthetic, animations, and UI/UX. Do not worry about actual API integration yet, just use mock functions.
```

---

## ⚙️ Prompt 2: For Claude (Backend Integration)

***Once Stitch gives you the UI code, copy that UI code along with this prompt and give it to Claude to wire everything together:***

```markdown
I have a newly generated UI for my Next.js 14 frontend (Next.js + Tailwind + Framer Motion) for my application, "MoneyMentor AI". I also have an existing, fully functional backend written in FastAPI that handles complex Indian tax logic and AI-based Form 16 parsing.

I need you to take the attached new UI code and completely recreate the Next.js `app/` router structure while wiring it up to my actual backend API.

**Tech Stack Requirements to Maintain:**
- Next.js 14 (App router logic: `page.js`, `layout.js`, `"use client"` where needed).
- API_BASE URL config: `const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";`
- No LangChain in the frontend.

**Detailed Wiring Instructions:**

1. **Tax Wizard / Form 16 Upload (Landing Page -> Results):**
   - Wire the Document Drag & Drop to hit `POST ${API_BASE}/api/upload-form16` using `FormData` (key: `file`).
   - On success, it returns a parsed `tax_profile`. Store this in state.
   - Then immediately call `POST ${API_BASE}/api/analyze-tax` passing the `tax_profile` (plus user options like `rent_paid`, `is_metro`, `age`).
   - The response returns `TaxAnalysisResult` containing `comparison` (Old vs New math), `missed_deductions`, `action_plan`, and `summary`. Map this JSON to the new UI's Tax Dashboard components.

2. **Couple's Money Planner (`/couples`):**
   - Wire the React form states for Partner A, Partner B, and Shared Deductions.
   - On submit, call `POST ${API_BASE}/api/couples-plan` with the JSON body payload containing `partner_a`, `partner_b`, `home_loan_interest`, `home_loan_principal`, `education_loan_interest`, `health_insurance_family`.
   - Take the response (`joint_summary`, `deduction_assignments`, `partner_a`, `partner_b` results) and populate the beautiful results UI.
   - Ensure the "Load Demo" button still works to prefill Partner A (Income: 24L) and Partner B (Income: 12L) without hitting the backend initially.

3. **Other Pages (`/portfolio`, `/health`, `/fire`, `/alerts`):**
   - These currently rely on mock data or simple static frontend implementations. Wire the new UI designs to these routes so navigation works perfectly via the global Header.

4. **Crucial Constraints:**
   - **DO NOT** change any of the JSON payload structures sent to the backend. The FastAPI backend `pydantic` models are strict.
   - **DO NOT** remove the ET branding or the privacy footers ("Documents processed in-memory — never stored") from the UI layouts.
   - Maintain the Light/Dark mode functionality provided by the new design.
   - Ensure you handle loading states (`isUploading`, `isAnalyzing`) and Error states (`error` messages from the backend) gracefully in the new UI.

Attached is the new UI code. Please rewrite my `app/page.js`, `app/couples/page.js`, and `components/TaxComparison.jsx` (and any other relevant files) to perfectly merge this new beautiful layout with my existing API fetching logic.
```
