"use client";
import { useState } from "react";
import { getFirePlan } from "../../lib/api";

const fmt = (n) => Math.round(n || 0).toLocaleString("en-IN");
const fmtCr = (n) => {
  const v = Math.round(n || 0);
  if (v >= 10_000_000) return `₹${(v / 10_000_000).toFixed(2)} Cr`;
  if (v >= 100_000) return `₹${(v / 100_000).toFixed(1)} L`;
  return `₹${v.toLocaleString("en-IN")}`;
};

export default function FirePage() {
  const [form, setForm] = useState({
    age: 30,
    annual_income: "",
    annual_expenses: "",
    current_savings: "",
    monthly_sip: "",
    risk_appetite: "moderate",
    fire_age: 45,
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const num = (v) => parseFloat(v) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getFirePlan({
        age: num(form.age),
        annual_income: num(form.annual_income),
        annual_expenses: num(form.annual_expenses) || num(form.annual_income) * 0.7,
        current_savings: num(form.current_savings),
        monthly_sip: num(form.monthly_sip),
        risk_appetite: form.risk_appetite,
        fire_age: num(form.fire_age),
      });
      setPlan(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple SVG chart for milestone projection
  const MilestoneChart = ({ milestones, target }) => {
    if (!milestones || milestones.length < 2) return null;

    const maxVal = Math.max(...milestones.map((m) => Math.max(m.projected_corpus, m.target_line)));
    const W = 560, H = 200, PAD = { l: 40, r: 20, t: 10, b: 30 };
    const cx = (i) => PAD.l + (i / (milestones.length - 1)) * (W - PAD.l - PAD.r);
    const cy = (v) => PAD.t + (1 - v / maxVal) * (H - PAD.t - PAD.b);

    const projPath = milestones.map((m, i) => `${i === 0 ? "M" : "L"}${cx(i)},${cy(m.projected_corpus)}`).join(" ");
    const targetPath = milestones.map((m, i) => `${i === 0 ? "M" : "L"}${cx(i)},${cy(m.target_line)}`).join(" ");

    return (
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
          <defs>
            <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + f * (H - PAD.t - PAD.b)} y2={PAD.t + f * (H - PAD.t - PAD.b)} stroke="rgba(255,255,255,0.05)" />
          ))}
          {/* Target line */}
          <path d={targetPath} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,4" />
          {/* Projection area fill */}
          <path d={`${projPath} L${cx(milestones.length - 1)},${H - PAD.b} L${cx(0)},${H - PAD.b} Z`} fill="url(#projGrad)" />
          {/* Projection line */}
          <path d={projPath} fill="none" stroke="#6366f1" strokeWidth="2" />
          {/* Year labels */}
          {milestones.filter((_, i) => i % 5 === 0).map((m, i, arr) => (
            <text key={i} x={cx(milestones.indexOf(m))} y={H - 6} textAnchor="middle" fill="#6b7280" fontSize="10">
              {m.year}
            </text>
          ))}
        </svg>
        <div className="flex gap-4 justify-center text-xs mt-1">
          <span className="flex items-center gap-1 text-indigo-400"><span className="w-4 h-0.5 bg-indigo-400 inline-block" /> Your Projection</span>
          <span className="flex items-center gap-1 text-amber-400"><span className="w-4 h-0.5 bg-amber-400 inline-block border-dashed" /> Target Corpus</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">FIRE Planner</h2>
        <p className="text-sm text-gray-500 mt-1">Financial Independence, Retire Early — plan your path to freedom</p>
      </div>

      {!plan ? (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ["Current Age", "age", "30"],
              ["Target FIRE Age", "fire_age", "45"],
              ["Annual Income (₹)", "annual_income", "1500000"],
              ["Annual Expenses (₹)", "annual_expenses", "900000"],
              ["Current Savings/Investments (₹)", "current_savings", "500000"],
              ["Monthly SIP (₹)", "monthly_sip", "25000"],
            ].map(([label, field, placeholder]) => (
              <div key={field}>
                <label className="text-xs text-gray-400 block mb-1">{label}</label>
                <input
                  type="number"
                  placeholder={placeholder}
                  value={form[field] || ""}
                  onChange={(e) => set(field, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-2">Risk Appetite</label>
            <div className="flex gap-2">
              {["conservative", "moderate", "aggressive"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set("risk_appetite", r)}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize transition-all ${
                    form.risk_appetite === r
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
          >
            {loading ? "Planning…" : "🔥 Generate My FIRE Plan"}
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Status banner */}
          <div className={`glass-card p-5 border ${plan.on_track ? "border-emerald-500/30 glow-green" : "border-amber-500/30 glow-amber"}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{plan.on_track ? "🟢" : "🟡"}</span>
              <div>
                <p className="text-white font-bold text-lg">
                  {plan.on_track ? "You're on track for FIRE!" : "You need to boost savings"}
                </p>
                <p className="text-gray-400 text-sm">
                  Target: retire at {plan.fire_age} in {plan.years_to_fire} years
                </p>
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Target Corpus", value: fmtCr(plan.target_corpus), icon: "🎯" },
              { label: "Projected Corpus", value: fmtCr(plan.projected_corpus), icon: "📈" },
              { label: "Shortfall", value: plan.shortfall > 0 ? fmtCr(plan.shortfall) : "None!", icon: plan.shortfall > 0 ? "⚠️" : "✅" },
              { label: "Current SIP", value: `₹${fmt(plan.monthly_sip_current)}/mo`, icon: "💰" },
              { label: "Required SIP", value: plan.monthly_sip_required > 0 ? `₹${fmt(plan.monthly_sip_required)}/mo` : "Current is enough", icon: "📌" },
              { label: "Savings Rate", value: `${plan.savings_rate_pct}%`, icon: "📊" },
            ].map((m) => (
              <div key={m.label} className="glass-card p-4">
                <p className="text-gray-500 text-xs mb-1">{m.icon} {m.label}</p>
                <p className="text-white font-bold text-lg">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="glass-card p-5">
            <h3 className="text-white font-semibold mb-4">📈 Corpus Growth Projection</h3>
            <MilestoneChart milestones={plan.milestones} target={plan.target_corpus} />
          </div>

          {/* Asset Allocation */}
          <div className="glass-card p-5">
            <h3 className="text-white font-semibold mb-4">🎨 Recommended Asset Allocation</h3>
            <div className="space-y-3">
              {Object.entries(plan.asset_allocation || {}).map(([asset, pct]) => (
                <div key={asset}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 capitalize">{asset}</span>
                    <span className="text-white font-medium">{pct}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${asset === "equity" ? "bg-indigo-500" : asset === "debt" ? "bg-blue-500" : "bg-yellow-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">Blended expected return: {plan.blended_return_pct}% p.a.</p>
          </div>

          <button
            onClick={() => setPlan(null)}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Adjust plan
          </button>
        </div>
      )}
    </div>
  );
}
