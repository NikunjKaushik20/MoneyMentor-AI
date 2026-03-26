"use client";
import { useRouter } from "next/navigation";

export default function ETArticlePage() {
  const router = useRouter();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="text-[#e4002b] font-bold">ET Wealth</span>
        <span>/</span>
        <span>Tax Planning</span>
        <span>/</span>
        <span className="text-gray-400">Budget 2025 Analysis</span>
      </div>

      {/* Article */}
      <article className="space-y-5">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-[#e4002b] font-bold">
            Tax Planning
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Budget 2025: New Tax Regime Is Now Default — What Every Salaried Employee Must Do Before April 1
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>By ET Wealth Bureau</span>
            <span>|</span>
            <span>Updated: Mar 24, 2026, 06:30 AM IST</span>
            <span>|</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="h-48 rounded-xl bg-gradient-to-br from-[#0d2137] to-[#1a3050] flex items-center justify-center border border-white/10">
          <div className="text-center">
            <p className="text-4xl mb-2">🏛️</p>
            <p className="text-white/60 text-sm">Budget 2025 — Tax Regime Changes</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed text-[15px]">
          <p>
            In a significant move that impacts every salaried Indian, the government has made the <strong className="text-white">New Tax Regime the default</strong> starting FY 2025-26. This means if you don't proactively inform your employer about your regime preference, your TDS will be calculated under the New Regime — which may or may not be the right choice for you.
          </p>

          <p>
            The New Regime offers lower slab rates and a <strong className="text-white">full rebate up to Rs 12 lakh</strong> of taxable income under Section 87A, effectively making income up to Rs 12 lakh tax-free. However, it strips away most deductions — no 80C, no HRA exemption, no home loan interest under Section 24(b). For employees with significant deductions, this could mean <strong className="text-white">paying Rs 20,000–50,000 more</strong> in tax.
          </p>

          {/* ── CTA BLOCK — This is the key "ET Integration" proof ── */}
          <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-600/15 to-purple-600/15 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                  AI-POWERED
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#e4002b]/20 text-[#e4002b] font-bold">
                  ET EXCLUSIVE
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">
                Which regime saves YOU more? Find out in 60 seconds.
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Upload your Form 16 and get an instant Old vs New regime comparison with exact Rs. savings — powered by ET's MoneyMentor AI.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
              >
                📄 Analyse MY Tax Impact →
              </button>
            </div>
          </div>

          <p>
            <strong className="text-white">Who should stay on Old Regime?</strong> If your total deductions under 80C, 80D, HRA, and home loan interest exceed Rs 3.75 lakh, the Old Regime is likely better. This typically applies to employees in the Rs 15–25 lakh income bracket who have home loans and active ELSS investments.
          </p>

          <p>
            <strong className="text-white">Who benefits from the New Regime?</strong> Employees with minimal deductions — especially young professionals who don't have home loans or significant insurance premiums — will find the New Regime saves them money. The zero-tax threshold at Rs 12 lakh is the strongest it has ever been.
          </p>

          <p>
            <strong className="text-white">The deadline is April 1, 2026.</strong> If you don't submit Form 12B to your employer choosing the Old Regime, TDS will default to the New Regime for the entire year. Switching mid-year is not possible for salaried employees. The time to act is now.
          </p>
        </div>

        {/* Second CTA — Portfolio */}
        <div className="p-5 rounded-xl bg-white/3 border border-white/8">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📊</span>
            <div>
              <p className="text-white font-semibold text-sm">Also on ET Wealth: Is your mutual fund portfolio underperforming?</p>
              <p className="text-gray-500 text-xs mt-1">Upload your CAMS statement to check fund overlap, expense ratio drag, and NIFTY 50 benchmark comparison.</p>
              <button
                onClick={() => router.push("/portfolio")}
                className="mt-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs hover:bg-white/10 transition-colors"
              >
                X-Ray My Portfolio →
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {["Budget 2025", "New Tax Regime", "Income Tax", "Section 87A", "Form 16", "Old vs New Regime", "Tax Saving"].map((t) => (
            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-500">
              {t}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      <div className="space-y-3 pb-8">
        <h3 className="text-white font-semibold text-sm">More from ET Wealth</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: "RBI Cuts Repo Rate by 25bps — Will Your Home Loan EMI Fall?", tag: "RBI Policy", cta: "/alerts" },
            { title: "ELSS vs PPF vs NPS: Where to Invest Your Last Rs 1.5 Lakh Before March 31", tag: "Tax Saving", cta: "/" },
            { title: "5 Signs Your Mutual Fund Portfolio Needs a Rebalance", tag: "Investing", cta: "/portfolio" },
            { title: "How Much Do You Really Need to Retire at 45? A FIRE Calculator", tag: "Retirement", cta: "/fire" },
          ].map((a) => (
            <div
              key={a.title}
              onClick={() => router.push(a.cta)}
              className="p-4 rounded-xl bg-white/3 border border-white/5 cursor-pointer hover:border-indigo-500/30 transition-all group"
            >
              <span className="text-[9px] text-[#e4002b] font-bold uppercase">{a.tag}</span>
              <p className="text-white text-sm font-medium mt-1 group-hover:text-indigo-300 transition-colors">{a.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
