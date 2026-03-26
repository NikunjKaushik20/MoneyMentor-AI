"use client";

function fmt(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

const difficultyColors = {
  easy: "bg-green-500/10 text-green-400",
  medium: "bg-amber-500/10 text-amber-400",
  hard: "bg-red-500/10 text-red-400",
};

export default function ActionPlan({ actions, summary }) {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-lg font-bold text-white mb-1">Your Action Plan</h2>
      <p className="text-sm text-gray-500 mb-4">AI-powered recommendations ranked by impact</p>

      {summary && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-5">
          <p className="text-sm text-indigo-200 leading-relaxed">{summary}</p>
        </div>
      )}

      {actions && actions.length > 0 ? (
        <div className="space-y-3">
          {actions.map((a, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="text-white font-semibold text-sm">{a.action}</span>
                </div>
                <span className="text-green-400 font-bold text-sm whitespace-nowrap">
                  +{fmt(a.saving_amount)}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed ml-11">{a.explanation}</p>
              <div className="flex gap-3 mt-2 ml-11 text-xs">
                <span className={`px-2 py-0.5 rounded-full ${difficultyColors[a.difficulty] || difficultyColors.medium}`}>
                  {a.difficulty}
                </span>
                <span className="text-gray-600">⏰ {a.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">Action plan will appear after AI analysis.</p>
        </div>
      )}
    </div>
  );
}
