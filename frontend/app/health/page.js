"use client";
import { useState } from "react";
import { getHealthScore } from "../../lib/api";

const DIMENSIONS = [
  "Emergency Fund",
  "Insurance Coverage",
  "Investment Diversification",
  "Debt Health",
  "Tax Efficiency",
  "Retirement Readiness",
];

const DIMENSION_ICONS = {
  "Emergency Fund": "🛡️",
  "Insurance Coverage": "❤️",
  "Investment Diversification": "📊",
  "Debt Health": "💳",
  "Tax Efficiency": "📋",
  "Retirement Readiness": "🏖️",
};

export default function HealthPage() {
  const [form, setForm] = useState({
    annual_income: "",
    monthly_expenses: "",
    emergency_fund: "",
    life_cover: "",
    health_cover: "",
    dependants: 1,
    total_investments: "",
    equity_pct: 60,
    debt_pct: 30,
    gold_pct: 10,
    monthly_emi: "",
    avg_loan_rate: 0,
    missed_deductions_count: 0,
    tax_potential_savings: 0,
    current_corpus: "",
    monthly_sip: "",
    age: 30,
    retirement_age: 60,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const num = (v) => parseFloat(v) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        annual_income: num(form.annual_income),
        monthly_expenses: num(form.monthly_expenses),
        emergency_fund: num(form.emergency_fund),
        life_cover: num(form.life_cover),
        health_cover: num(form.health_cover),
        dependants: num(form.dependants),
        total_investments: num(form.total_investments),
        equity_pct: num(form.equity_pct),
        debt_pct: num(form.debt_pct),
        gold_pct: num(form.gold_pct),
        monthly_emi: num(form.monthly_emi),
        avg_loan_rate: num(form.avg_loan_rate),
        missed_deductions_count: num(form.missed_deductions_count),
        tax_potential_savings: num(form.tax_potential_savings),
        current_corpus: num(form.current_corpus),
        monthly_sip: num(form.monthly_sip),
        age: num(form.age),
        retirement_age: num(form.retirement_age),
      };
      const data = await getHealthScore(payload);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) => s >= 70 ? "text-emerald-400" : s >= 50 ? "text-amber-400" : "text-red-400";
  const scoreBg = (s) => s >= 70 ? "bg-emerald-500" : s >= 50 ? "bg-amber-500" : "bg-red-500";
  const gradeColor = (g) => ({ A: "text-emerald-400", B: "text-blue-400", C: "text-amber-400", D: "text-orange-400", F: "text-red-400" }[g] || "text-gray-400");

  const InputField = ({ label, field, type = "number", placeholder = "0" }) => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field] || ""}
        onChange={(e) => set(field, type === "number" ? e.target.value : e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Money Health Score</h2>
        <p className="text-sm text-gray-500 mt-1">Rate your financial fitness across 6 dimensions · Takes 2 minutes</p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Income & Expenses */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">💰 Income & Expenses</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Annual Income (₹)" field="annual_income" placeholder="1200000" />
              <InputField label="Monthly Expenses (₹)" field="monthly_expenses" placeholder="50000" />
              <InputField label="Age" field="age" placeholder="30" />
            </div>
          </div>

          {/* Emergency Fund */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">🛡️ Emergency Fund</h3>
            <InputField label="Emergency Fund in Savings/Liquid Funds (₹)" field="emergency_fund" placeholder="300000" />
          </div>

          {/* Insurance */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">❤️ Insurance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Term Life Cover (₹)" field="life_cover" placeholder="10000000" />
              <InputField label="Health Insurance Cover (₹)" field="health_cover" placeholder="500000" />
              <InputField label="Number of Dependants" field="dependants" placeholder="1" />
            </div>
          </div>

          {/* Investments */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">📊 Investments</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField label="Total Investments (₹)" field="total_investments" placeholder="500000" />
              <InputField label="Equity %" field="equity_pct" placeholder="60" />
              <InputField label="Debt %" field="debt_pct" placeholder="30" />
              <InputField label="Gold %" field="gold_pct" placeholder="10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Current Retirement Corpus (₹)" field="current_corpus" placeholder="0" />
              <InputField label="Monthly SIP (₹)" field="monthly_sip" placeholder="10000" />
              <InputField label="Target Retirement Age" field="retirement_age" placeholder="60" />
            </div>
          </div>

          {/* Debt */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">💳 Debt & Loans</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Total Monthly EMI (₹)" field="monthly_emi" placeholder="0" />
              <InputField label="Avg Loan Interest Rate (%)" field="avg_loan_rate" placeholder="8.5" />
            </div>
          </div>

          {/* Tax */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">📋 Tax Efficiency</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Missed Deductions Count" field="missed_deductions_count" placeholder="0" />
              <InputField label="Potential Tax Savings (₹)" field="tax_potential_savings" placeholder="0" />
            </div>
            <p className="text-xs text-gray-600">Use the Tax Analysis tab to get these figures automatically.</p>
          </div>

          {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
          >
            {loading ? "Calculating…" : "🧮 Calculate My Health Score"}
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Overall Score */}
          <div className="glass-card p-8 text-center glow-blue">
            <p className="text-gray-400 text-sm mb-2">Your Money Health Score</p>
            <div className="relative inline-block">
              <p className={`text-8xl font-black ${scoreColor(result.overall_score)}`}>{result.overall_score}</p>
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <p className={`text-3xl font-bold mt-2 ${gradeColor(result.grade)}`}>Grade {result.grade}</p>
            {result.projected_score_after_actions && (
              <p className="text-sm text-gray-500 mt-2">
                Follow recommendations → <span className="text-emerald-400 font-bold">{result.projected_score_after_actions}/100</span>
              </p>
            )}
          </div>

          {/* Radar Bars */}
          <div className="glass-card p-5">
            <h3 className="text-white font-semibold mb-4">Dimension Breakdown</h3>
            <div className="space-y-4">
              {result.dimensions?.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">
                      {DIMENSION_ICONS[d.name] || "📌"} {d.name}
                    </span>
                    <span className={`text-sm font-bold ${scoreColor(d.score)}`}>{d.score}/100</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreBg(d.score)}`}
                      style={{ width: `${d.score}%`, opacity: 0.8 }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">{d.improvement_tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Actions */}
          {result.improvement_actions?.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-3">🎯 Top 3 Improvement Actions</h3>
              <div className="space-y-3">
                {result.improvement_actions.map((a, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/8">
                    <div className="flex items-start justify-between">
                      <p className="text-white text-sm font-medium">{a.dimension}</p>
                      <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full">
                        +{a.score_impact} pts
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{a.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Recalculate
          </button>
        </div>
      )}
    </div>
  );
}
