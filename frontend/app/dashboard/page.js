"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import SummaryCards from "../../components/SummaryCards";
import TaxComparison from "../../components/TaxComparison";
import MissedDeductions from "../../components/MissedDeductions";
import ActionPlan from "../../components/ActionPlan";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem("analysisResult");
    if (!raw) { router.push("/"); return; }
    try { setData(JSON.parse(raw)); } catch { router.push("/"); }
  }, [router]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  const { comparison, missed_deductions, action_plan, total_potential_savings, summary, tax_profile } = data;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-8 py-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Title */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-white">Your Tax Analysis</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gross Salary: ₹{Math.round(tax_profile.salary.gross_salary).toLocaleString("en-IN")} • FY 2025-26
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          comparison={comparison}
          totalSavings={total_potential_savings}
          tds={tax_profile.tds_deducted}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaxComparison comparison={comparison} />
          <MissedDeductions deductions={missed_deductions} />
        </div>

        {/* Action Plan */}
        <ActionPlan actions={action_plan} summary={summary} />

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => { sessionStorage.removeItem("analysisResult"); router.push("/"); }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            ← Analyze Another Form 16
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            📄 Save as PDF
          </button>
        </div>

        {/* Trust footer */}
        <p className="text-center text-[10px] text-gray-600 pb-6">
          Powered by MoneyMentor AI • ET AI Hackathon 2026 • CFO for Every Indian
        </p>
      </main>
    </div>
  );
}
