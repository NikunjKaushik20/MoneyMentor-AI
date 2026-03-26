"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import { uploadForm16, analyzeTax } from "../lib/api";

const STATS = [
  ["₹25K+", "Avg savings found per user"],
  ["95%", "Indians overpay tax every year"],
  ["60 sec", "Full analysis time"],
  ["7 tools", "In one platform"],
];

const FEATURES = [
  { icon: "📄", title: "Tax Wizard", desc: "Old vs New regime comparison, missed deductions & AI action plan", href: null, tag: "Form 16 Upload" },
  { icon: "📊", title: "Portfolio X-Ray", desc: "XIRR, fund overlap, expense ratio drag & rebalancing plan", href: "/portfolio", tag: "CAMS Upload" },
  { icon: "💑", title: "Couple's Planner", desc: "Joint tax optimisation — smart deduction assignment between partners", href: "/couples", tag: "New" },
  { icon: "💚", title: "Money Health Score", desc: "6-dimension financial fitness score with improvement roadmap", href: "/health", tag: "2 min quiz" },
  { icon: "🔥", title: "FIRE Planner", desc: "Retirement corpus projections & monthly SIP planning", href: "/fire", tag: "Calculator" },
  { icon: "🔔", title: "Proactive Alerts", desc: "Personalised Budget 2025, RBI & SEBI alerts for your portfolio", href: "/alerts", tag: "Live" },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("landing"); // landing | upload | options | analyzing
  const [taxProfile, setTaxProfile] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    rent_paid: 0, is_metro: true, age: 30,
    has_health_insurance: false, has_nps: false, has_home_loan: false,
  });
  const router = useRouter();

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const res = await uploadForm16(file);
      if (res.success) { setTaxProfile(res.tax_profile); setStep("options"); }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleAnalyze = async () => {
    setStep("analyzing");
    setLoading(true);
    try {
      const result = await analyzeTax(taxProfile, options);
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      router.push("/dashboard");
    } catch (e) { setError(e.message); setStep("options"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {step === "landing" && (
        <main className="flex-1 px-4 py-12 max-w-6xl mx-auto w-full">
          {/* Hero */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold">ET AI Hackathon 2026 · Problem Statement #9</p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              India's First<br />
              <span className="gradient-text">AI-Powered CFO</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              95% of Indians don't have a financial plan. MoneyMentor AI gives every Indian a personal CFO —
              tax optimizer, portfolio analyst, and retirement planner in one.
            </p>
            <p className="text-sm text-gray-600 italic">"83% of Indians feel ashamed to talk about money. We're changing that."</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map(([n, l]) => (
              <div key={l} className="glass-card p-4 text-center">
                <p className="text-2xl font-black gradient-text">{n}</p>
                <p className="text-gray-500 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                onClick={() => f.href ? router.push(f.href) : setStep("upload")}
                className="glass-card p-5 cursor-pointer hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">{f.tag}</span>
                </div>
                <h3 className="text-white font-bold mb-1 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setStep("upload")}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/30"
            >
              📄 Start with Form 16
            </button>
            <button
              onClick={() => router.push("/portfolio")}
              className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-colors"
            >
              📊 Analyse Portfolio
            </button>
          </div>

          {/* Demo personas */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600 mb-3">Try as a demo persona (for hackathon judges)</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "Sunita", role: "Teacher · Delhi · ₹8L/yr" },
                { name: "Arjun", role: "Software Engineer · Bengaluru · ₹25L/yr" },
                { name: "Kavita", role: "Business Owner · Mumbai · ₹50L/yr" },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => setStep("upload")}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {p.name} — {p.role}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-700 mt-8">
            🔒 Your data is processed securely and never stored · Powered by ET's 25 years of financial intelligence
          </p>
        </main>
      )}

      {step === "upload" && (
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl space-y-6">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-white">Upload Your Form 16</h2>
              <p className="text-gray-500 text-sm mt-1">We'll extract and analyze everything automatically</p>
            </div>
            <FileUpload onFileSelect={handleUpload} isLoading={loading} />
            {error && <p className="text-red-400 text-sm text-center">⚠️ {error}</p>}
            <button onClick={() => setStep("landing")} className="text-sm text-gray-600 hover:text-gray-400 transition-colors w-full text-center">
              ← Back
            </button>
          </div>
        </main>
      )}

      {step === "options" && (
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl space-y-5 animate-slide-up">
            <h2 className="text-xl font-bold text-white">A few more details</h2>
            <div className="glass-card p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[["Annual Rent Paid (₹)", "rent_paid", "0"], ["Age", "age", "30"]].map(([label, key, ph]) => (
                  <div key={key}>
                    <label className="text-xs text-gray-400 block mb-1">{label}</label>
                    <input type="number" placeholder={ph}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
                      value={options[key] || ""}
                      onChange={(e) => setOptions({ ...options, [key]: Number(e.target.value) })}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  ["is_metro", "I live in a metro city (Delhi / Mumbai / Kolkata / Chennai)"],
                  ["has_health_insurance", "I have health insurance"],
                  ["has_nps", "I invest in NPS"],
                  ["has_home_loan", "I have a home loan"],
                ].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                    <input type="checkbox" checked={options[key]}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="w-4 h-4 rounded" />
                    {label}
                  </label>
                ))}
              </div>
              <button onClick={handleAnalyze}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20">
                🚀 Analyze My Taxes
              </button>
            </div>
          </div>
        </main>
      )}

      {step === "analyzing" && (
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="glass-card p-10 text-center space-y-4 animate-fade-in max-w-sm w-full">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-indigo-300 font-semibold">Analysing your taxes with AI…</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>✅ Form 16 parsed</p>
              <p>⏳ Computing Old vs New regime</p>
              <p>⏳ Finding missed deductions</p>
              <p>⏳ Generating AI action plan</p>
            </div>
          </div>
        </main>
      )}
      {/* Footer with privacy + guardrails badges */}
      <footer className="border-t border-white/5 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[10px] text-gray-600">
            <span className="flex items-center gap-1">🔒 Documents processed in-memory — never stored</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1">🧮 Tax math = deterministic code — not AI-generated</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1">🤖 AI used only for language & PDF parsing</span>
          </div>
          <span className="text-[10px] text-gray-600"><span className="text-[#e4002b] font-bold">ET</span> × MoneyMentor AI</span>
        </div>
      </footer>
    </div>
  );
}
