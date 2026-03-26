"use client";
import { useState, useEffect } from "react";
import { uploadCams, analyzePortfolio } from "../../lib/api";

export default function PortfolioPage() {
  const [step, setStep] = useState("upload"); // upload | analyzing | result
  const [portfolio, setPortfolio] = useState(null);
  const [xray, setXray] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith(".pdf")) {
      setError("Please upload a valid PDF file.");
      return;
    }
    setLoading(true);
    setError(null);
    setStep("analyzing");
    try {
      const res = await uploadCams(file);
      if (!res.success) throw new Error(res.message);
      setPortfolio(res.portfolio);
      const xrayData = await analyzePortfolio(res.portfolio);
      setXray(xrayData);
      setStep("result");
    } catch (e) {
      setError(e.message);
      setStep("upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const fmt = (n) => Math.round(n || 0).toLocaleString("en-IN");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Portfolio X-Ray</h2>
        <p className="text-sm text-gray-500 mt-1">Upload CAMS or KFintech consolidated statement to analyse your mutual fund portfolio</p>
      </div>

      {step === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`upload-zone p-12 text-center transition-all ${dragOver ? "drag-over" : ""}`}
        >
          <div className="text-4xl mb-4">📊</div>
          <p className="text-white font-semibold mb-1">Drop your CAMS Statement PDF here</p>
          <p className="text-gray-500 text-sm mb-5">or</p>
          <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
            Browse File
            <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
          </label>
          <p className="text-xs text-gray-600 mt-4">Supports CAMS, KFintech, MFCentral statements · Max 15MB</p>
          {error && <p className="mt-4 text-red-400 text-sm">⚠️ {error}</p>}
        </div>
      )}

      {step === "analyzing" && (
        <div className="glass-card p-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          <p className="text-indigo-300 font-semibold">Analysing your portfolio…</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>✅ PDF uploaded</p>
            <p>⏳ Extracting fund holdings</p>
            <p>⏳ Calculating XIRR and overlap</p>
            <p>⏳ Generating rebalancing plan</p>
          </div>
        </div>
      )}

      {step === "result" && xray && (
        <div className="space-y-6 animate-fade-in">
          {/* Hero metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Value", value: `₹${fmt(xray.portfolio?.total_current_value)}`, color: "text-emerald-400", glow: "glow-green" },
              { label: "Portfolio XIRR", value: xray.portfolio_xirr != null ? `${xray.portfolio_xirr}%` : "—", color: "text-indigo-400", glow: "glow-blue" },
              { label: "vs NIFTY 50", value: xray.alpha != null ? `${xray.alpha > 0 ? "+" : ""}${xray.alpha}%` : "—", color: xray.alpha >= 0 ? "text-emerald-400" : "text-red-400", glow: xray.alpha >= 0 ? "glow-green" : "glow-red" },
              { label: "Annual Fee Drag", value: `₹${fmt(xray.expense_drag?.total_annual_drag)}`, color: "text-amber-400", glow: "glow-amber" },
            ].map((m) => (
              <div key={m.label} className={`glass-card p-4 ${m.glow}`}>
                <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Fund Table */}
          <div className="glass-card p-5">
            <h3 className="text-white font-semibold mb-4">Your Holdings ({xray.portfolio?.holdings?.length} funds)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-left border-b border-white/5">
                    <th className="pb-2 pr-4">Fund</th>
                    <th className="pb-2 pr-4 text-right">Value</th>
                    <th className="pb-2 pr-4 text-right">XIRR</th>
                    <th className="pb-2 text-right">Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {xray.portfolio?.holdings?.map((h, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="py-2.5 pr-4">
                        <p className="text-white text-xs font-medium">{h.name}</p>
                        <p className="text-gray-600 text-[10px] mt-0.5 capitalize">{h.category?.replace(/_/g, " ")}</p>
                      </td>
                      <td className="py-2.5 pr-4 text-right text-gray-300">₹{fmt(h.current_value)}</td>
                      <td className="py-2.5 pr-4 text-right">
                        {h.xirr != null ? (
                          <span className={h.xirr >= 12 ? "text-emerald-400" : h.xirr >= 8 ? "text-amber-400" : "text-red-400"}>
                            {h.xirr}%
                          </span>
                        ) : <span className="text-gray-600">—</span>}
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${h.plan_type === "direct" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {h.plan_type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overlap Alerts */}
          {xray.overlap_alerts?.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-3">⚠️ Fund Overlap Alerts</h3>
              <div className="space-y-2">
                {xray.overlap_alerts.map((a, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-sm ${a.severity === "high" ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"}`}>
                    <span className="font-medium">{a.overlap_pct}% overlap</span> — {a.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expense Drag */}
          {xray.expense_drag?.total_annual_drag > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-1">💸 Expense Ratio Drag</h3>
              <p className="text-sm text-gray-400 mb-4">{xray.expense_drag.tip}</p>
              <div className="space-y-2">
                {xray.expense_drag.details?.slice(0, 5).map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                    <p className="text-gray-300 text-xs">{d.fund}</p>
                    <div className="text-right">
                      <p className="text-amber-400 font-medium">₹{fmt(d.annual_saving)}/yr</p>
                      <p className="text-gray-600 text-[10px]">{d.current_er}% → {d.direct_er}% ER</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rebalancing */}
          {xray.rebalancing_plan?.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-3">⚖️ Rebalancing Recommendations</h3>
              <div className="space-y-2">
                {xray.rebalancing_plan.map((r, i) => (
                  <div key={i} className={`p-3 rounded-xl flex items-start gap-3 ${r.action === "buy" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                    <span className="text-lg">{r.action === "buy" ? "📈" : "📉"}</span>
                    <div>
                      <p className="text-sm text-white font-medium capitalize">{r.action} {r.category}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.message}</p>
                    </div>
                    <span className={`ml-auto text-sm font-bold ${r.action === "buy" ? "text-emerald-400" : "text-red-400"}`}>
                      ₹{fmt(r.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { setStep("upload"); setXray(null); setPortfolio(null); }}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Analyse another statement
          </button>
        </div>
      )}
    </div>
  );
}
