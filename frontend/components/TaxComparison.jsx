"use client";

function fmt(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function TaxComparison({ comparison }) {
  if (!comparison) return null;
  const { old_regime_breakdown: old, new_regime_breakdown: nw, recommended_regime } = comparison;

  const rows = [
    ["Gross Salary", old.gross_salary, nw.gross_salary],
    ["Standard Deduction", old.standard_deduction, nw.standard_deduction],
    ["HRA Exemption", old.hra_exemption || 0, "—"],
    ["Professional Tax", old.professional_tax, nw.professional_tax],
    ["Other Income (net)", old.other_income || 0, nw.other_income || 0],
    ["Gross Total Income", old.gross_total_income || 0, nw.gross_total_income || 0],
    ["Chapter VI-A Deductions", old.deductions?.total || 0, "—"],
    ["Employer NPS", old.deductions?.["80CCD(2)_employer"] || 0, nw.employer_nps_deduction || 0],
    ["Taxable Income", old.taxable_income, nw.taxable_income],
    ["Base Tax", old.base_tax, nw.base_tax],
    ["Rebate u/s 87A", old.rebate_87a, nw.rebate_87a],
    ["Surcharge", old.surcharge, nw.surcharge],
    ["Cess (4%)", old.cess, nw.cess],
  ];

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-lg font-bold text-white mb-1">Tax Regime Comparison</h2>
      <p className="text-sm text-gray-500 mb-5">FY 2025-26 (AY 2026-27) — Side by side</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 text-gray-400 font-medium">Component</th>
              <th className="text-right py-3 text-gray-400 font-medium">
                Old Regime {recommended_regime === "old" && <span className="ml-1 text-green-400">★</span>}
              </th>
              <th className="text-right py-3 text-gray-400 font-medium">
                New Regime {recommended_regime === "new" && <span className="ml-1 text-green-400">★</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, oldVal, newVal], i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 text-gray-300">{label}</td>
                <td className="py-2.5 text-right text-gray-200 font-mono text-xs">
                  {typeof oldVal === "number" ? fmt(oldVal) : oldVal}
                </td>
                <td className="py-2.5 text-right text-gray-200 font-mono text-xs">
                  {typeof newVal === "number" ? fmt(newVal) : newVal}
                </td>
              </tr>
            ))}
            {/* Total row */}
            <tr className="border-t-2 border-white/10">
              <td className="py-3 text-white font-bold">Total Tax Payable</td>
              <td className={`py-3 text-right font-bold font-mono ${recommended_regime === "old" ? "text-green-400" : "text-red-400"}`}>
                {fmt(old.total_tax)}
              </td>
              <td className={`py-3 text-right font-bold font-mono ${recommended_regime === "new" ? "text-green-400" : "text-red-400"}`}>
                {fmt(nw.total_tax)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <p className="text-sm text-green-400 font-medium">
          💡 The <strong>{recommended_regime.toUpperCase()}</strong> regime saves you{" "}
          <strong>{fmt(comparison.savings_amount)}</strong>
        </p>
      </div>
    </div>
  );
}
