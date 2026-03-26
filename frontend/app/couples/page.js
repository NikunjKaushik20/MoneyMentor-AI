"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const defaultPartner = (name) => ({
  name,
  annual_income: 0,
  section_80c: 0,
  section_80ccd_1b: 0,
  section_80d_self: 0,
  section_80d_parents: 0,
  hra_received: 0,
  rent_paid: 0,
  is_metro: true,
  basic_salary: 0,
  age: 30,
});

const fmt = (n) => Math.round(n || 0).toLocaleString("en-IN");

const InputField = ({ label, value, onChange, prefix = "₹" }) => (
  <div>
    <label className="text-xs text-gray-500 block mb-1">{label}</label>
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
      {prefix && <span className="text-gray-600 text-xs">{prefix}</span>}
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="bg-transparent text-white text-sm w-full outline-none"
        placeholder="0"
      />
    </div>
  </div>
);

const PartnerColumn = ({ title, emoji, color, partner, setPartner }) => {
  const set = (key, val) => setPartner({ ...partner, [key]: val });
  return (
    <div className={`glass-card p-5 space-y-4 border-t-2 ${color}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{emoji}</span>
        <div>
          <input
            type="text"
            value={partner.name}
            onChange={(e) => set("name", e.target.value)}
            className="bg-transparent text-white font-bold text-lg outline-none border-b border-transparent hover:border-white/20 focus:border-indigo-500 transition-colors w-full"
          />
          <p className="text-xs text-gray-600">{title}</p>
        </div>
      </div>

      <InputField label="Annual Income" value={partner.annual_income} onChange={(v) => set("annual_income", v)} />
      <InputField label="Basic Salary (for HRA)" value={partner.basic_salary} onChange={(v) => set("basic_salary", v)} />

      <div className="grid grid-cols-2 gap-3">
        <InputField label="80C (EPF+ELSS)" value={partner.section_80c} onChange={(v) => set("section_80c", v)} />
        <InputField label="80CCD(1B) NPS" value={partner.section_80ccd_1b} onChange={(v) => set("section_80ccd_1b", v)} />
        <InputField label="80D Self" value={partner.section_80d_self} onChange={(v) => set("section_80d_self", v)} />
        <InputField label="80D Parents" value={partner.section_80d_parents} onChange={(v) => set("section_80d_parents", v)} />
        <InputField label="HRA Received" value={partner.hra_received} onChange={(v) => set("hra_received", v)} />
        <InputField label="Rent Paid/yr" value={partner.rent_paid} onChange={(v) => set("rent_paid", v)} />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
          <input type="checkbox" checked={partner.is_metro} onChange={(e) => set("is_metro", e.target.checked)} className="accent-indigo-500" />
          Metro city (Delhi/Mumbai/Chennai/Kolkata)
        </label>
      </div>
    </div>
  );
};

export default function CouplesPage() {
  const [partnerA, setPartnerA] = useState(defaultPartner("Partner A"));
  const [partnerB, setPartnerB] = useState(defaultPartner("Partner B"));
  const [shared, setShared] = useState({
    home_loan_interest: 0,
    home_loan_principal: 0,
    education_loan_interest: 0,
    health_insurance_family: 0,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyse = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/couples-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partner_a: partnerA,
          partner_b: partnerB,
          ...shared,
        }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Demo: prefill with Arjun + Sunita
  const loadDemo = () => {
    setPartnerA({
      name: "Arjun", annual_income: 2400000, basic_salary: 960000,
      section_80c: 34800, section_80ccd_1b: 0, section_80d_self: 18000,
      section_80d_parents: 0, hra_received: 384000, rent_paid: 360000,
      is_metro: false, age: 29,
    });
    setPartnerB({
      name: "Priya", annual_income: 1200000, basic_salary: 480000,
      section_80c: 96000, section_80ccd_1b: 50000, section_80d_self: 12000,
      section_80d_parents: 0, hra_received: 192000, rent_paid: 240000,
      is_metro: false, age: 28,
    });
    setShared({
      home_loan_interest: 180000,
      home_loan_principal: 120000,
      education_loan_interest: 0,
      health_insurance_family: 25000,
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            💑 Couple&apos;s Money Planner
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Optimise tax deductions between partners — who claims what for maximum joint savings
          </p>
        </div>
        <button onClick={loadDemo} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          🎭 Load Demo
        </button>
      </div>

      {/* Partner Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PartnerColumn title="First Partner" emoji="👤" color="border-indigo-500" partner={partnerA} setPartner={setPartnerA} />
        <PartnerColumn title="Second Partner" emoji="👤" color="border-purple-500" partner={partnerB} setPartner={setPartnerB} />
      </div>

      {/* Shared Deductions */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          🤝 Shared Deductions
          <span className="text-[10px] text-gray-500 font-normal">We&apos;ll assign each to the optimal partner</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputField label="Home Loan Interest (24b)" value={shared.home_loan_interest} onChange={(v) => setShared({ ...shared, home_loan_interest: v })} />
          <InputField label="Home Loan Principal (80C)" value={shared.home_loan_principal} onChange={(v) => setShared({ ...shared, home_loan_principal: v })} />
          <InputField label="Education Loan Interest (80E)" value={shared.education_loan_interest} onChange={(v) => setShared({ ...shared, education_loan_interest: v })} />
          <InputField label="Family Health Insurance (80D)" value={shared.health_insurance_family} onChange={(v) => setShared({ ...shared, health_insurance_family: v })} />
        </div>
      </div>

      {/* Analyse Button */}
      <button
        onClick={handleAnalyse}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
      >
        {loading ? "⏳ Analysing..." : "🧮 Optimise Joint Tax"}
      </button>

      {error && <p className="text-red-400 text-sm text-center">⚠️ {error}</p>}

      {/* Results */}
      {result && (
        <div className="space-y-5 animate-fade-in">
          {/* Joint Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center glow-green">
              <p className="text-xs text-gray-500 mb-1">Combined Tax (Optimised)</p>
              <p className="text-2xl font-bold text-emerald-400">₹{fmt(result.joint_summary.combined_tax)}</p>
            </div>
            <div className="glass-card p-4 text-center glow-blue">
              <p className="text-xs text-gray-500 mb-1">Savings from Smart Assignment</p>
              <p className="text-2xl font-bold text-indigo-400">₹{fmt(result.joint_summary.savings_from_optimisation)}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Combined Income</p>
              <p className="text-2xl font-bold text-white">₹{fmt(result.joint_summary.combined_income)}</p>
            </div>
          </div>

          {/* Per-Partner Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[result.partner_a, result.partner_b].map((p, idx) => (
              <div key={idx} className={`glass-card p-5 space-y-3 border-t-2 ${idx === 0 ? "border-indigo-500" : "border-purple-500"}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-bold">{p.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.recommended_regime === "new" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                    {p.recommended_regime.toUpperCase()} Regime ✓
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Income:</span>
                  <span className="text-white text-right">₹{fmt(p.income)}</span>
                  <span className="text-gray-500">Bracket:</span>
                  <span className="text-white text-right">{p.bracket}</span>
                  <span className="text-gray-500">Old Regime Tax:</span>
                  <span className="text-white text-right">₹{fmt(p.old_regime_tax)}</span>
                  <span className="text-gray-500">New Regime Tax:</span>
                  <span className="text-white text-right">₹{fmt(p.new_regime_tax)}</span>
                  <span className="text-gray-500">Total Deductions:</span>
                  <span className="text-indigo-400 text-right font-semibold">₹{fmt(p.total_deductions)}</span>
                  <span className="text-gray-500 font-semibold">Final Tax:</span>
                  <span className="text-emerald-400 text-right font-bold">₹{fmt(p.tax_payable)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Assignments */}
          {result.deduction_assignments?.length > 0 && (
            <div className="glass-card p-5 space-y-3">
              <h4 className="text-white font-semibold">📋 Smart Deduction Assignments</h4>
              <div className="space-y-2">
                {result.deduction_assignments.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold mt-0.5 ${d.assigned_to === "A" ? "bg-indigo-500/20 text-indigo-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {d.assigned_to === "A" ? result.partner_a.name : result.partner_b.name}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{d.deduction} — ₹{fmt(d.amount)}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{d.reason}</p>
                    </div>
                    {d.extra_saving_vs_wrong_partner > 0 && (
                      <span className="text-emerald-400 text-xs font-bold whitespace-nowrap">
                        +₹{fmt(d.extra_saving_vs_wrong_partner)} saved
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Tips */}
          {result.tips?.length > 0 && (
            <div className="glass-card p-5 space-y-3">
              <h4 className="text-white font-semibold">💡 Joint Optimisation Tips</h4>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <span className="text-indigo-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Adjust inputs and re-analyse
          </button>
        </div>
      )}
    </div>
  );
}
