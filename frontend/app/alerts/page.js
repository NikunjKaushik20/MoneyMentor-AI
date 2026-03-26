"use client";
import { useState, useEffect } from "react";
import { getAlerts } from "../../lib/api";

const SEVERITY_STYLES = {
  high: { border: "border-red-500/30", bg: "bg-red-500/8", icon: "🔴", badge: "bg-red-500/20 text-red-400", label: "Urgent" },
  medium: { border: "border-amber-500/30", bg: "bg-amber-500/8", icon: "🟡", badge: "bg-amber-500/20 text-amber-400", label: "Important" },
  low: { border: "border-blue-500/30", bg: "bg-blue-500/8", icon: "🔵", badge: "bg-blue-500/20 text-blue-400", label: "FYI" },
};

const EVENT_ICONS = {
  rbi_rate: "🏦",
  budget: "📜",
  sebi: "📋",
  market: "📉",
};

const fmt = (n) => Math.round(n || 0).toLocaleString("en-IN");

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    annual_income: "",
    has_home_loan: false,
    has_nps: false,
    monthly_emi: "",
    portfolio_value: "",
  });
  const [fetched, setFetched] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const q = {
        annual_income: parseFloat(params.annual_income) || 0,
        has_home_loan: params.has_home_loan,
        has_nps: params.has_nps,
        monthly_emi: parseFloat(params.monthly_emi) || 0,
        portfolio_value: parseFloat(params.portfolio_value) || 0,
      };
      const data = await getAlerts(q);
      setAlerts(data);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Proactive Alerts</h2>
        <p className="text-sm text-gray-500 mt-1">Personalised policy & market alerts that affect YOUR portfolio right now</p>
      </div>

      {/* Profile snip for personalisation */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">🎯 Personalise alerts (optional)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ["Annual Income (₹)", "annual_income"],
            ["Monthly EMI (₹)", "monthly_emi"],
            ["Portfolio Value (₹)", "portfolio_value"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="text-xs text-gray-400 block mb-1">{label}</label>
              <input
                type="number"
                value={params[field]}
                onChange={(e) => setParams((p) => ({ ...p, [field]: e.target.value }))}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          {[["has_home_loan", "I have a home loan"], ["has_nps", "I invest in NPS"]].map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={params[field]}
                onChange={(e) => setParams((p) => ({ ...p, [field]: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              {label}
            </label>
          ))}
        </div>
        <button
          onClick={fetchAlerts}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Loading…" : fetched ? "🔄 Refresh Alerts" : "🔔 Get My Alerts"}
        </button>
      </div>

      {/* Alerts */}
      {fetched && (
        <div className="space-y-3 animate-fade-in">
          {alerts.length === 0 ? (
            <div className="glass-card p-8 text-center text-gray-500">
              <p className="text-2xl mb-2">✅</p>
              <p>No urgent alerts for your profile right now.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">{alerts.length} alerts relevant to your profile</p>
              {alerts.map((a) => {
                const style = SEVERITY_STYLES[a.severity] || SEVERITY_STYLES.low;
                const isOpen = expanded === a.id;
                return (
                  <div
                    key={a.id}
                    className={`glass-card border ${style.border} ${style.bg} transition-all cursor-pointer`}
                    onClick={() => setExpanded(isOpen ? null : a.id)}
                  >
                    <div className="p-4 flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{EVENT_ICONS[a.event_type] || "📌"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-white font-semibold text-sm">{a.title}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{a.impact_summary}</p>
                        {a.potential_saving_or_impact > 0 && (
                          <p className="text-emerald-400 text-xs mt-1 font-medium">
                            💰 Impact: ₹{fmt(a.potential_saving_or_impact)}/year
                          </p>
                        )}
                      </div>
                      <span className="text-gray-600 text-lg mt-1 shrink-0">{isOpen ? "▲" : "▼"}</span>
                    </div>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-0 space-y-3 animate-fade-in border-t border-white/5">
                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                          <p className="text-xs text-indigo-300 font-medium mb-1">👤 Personal Impact</p>
                          <p className="text-white text-sm">{a.personal_impact}</p>
                        </div>
                        {a.action_required && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <p className="text-xs text-gray-400 font-medium mb-1">⏰ Action Required</p>
                            <p className="text-gray-300 text-sm">{a.action_required}</p>
                          </div>
                        )}
                        <p className="text-[10px] text-gray-600">Source: {a.source}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {!fetched && !loading && (
        <div className="glass-card p-8 text-center text-gray-600">
          <p className="text-3xl mb-3">🔔</p>
          <p className="text-sm">Fill in your profile above to see personalised alerts</p>
          <p className="text-xs mt-1">Or click "Get My Alerts" to see all current events</p>
        </div>
      )}
    </div>
  );
}
