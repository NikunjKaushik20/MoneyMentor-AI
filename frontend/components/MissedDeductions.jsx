"use client";

function fmt(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

const priorityStyles = {
  high: "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function MissedDeductions({ deductions }) {
  if (!deductions || deductions.length === 0) {
    return (
      <div className="glass-card p-6 text-center animate-slide-up">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-green-400 font-semibold">Great job! No major missed deductions found.</p>
        <p className="text-sm text-gray-500 mt-1">You are maximizing your tax benefits.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-lg font-bold text-white mb-1">Missed Opportunities</h2>
      <p className="text-sm text-gray-500 mb-5">Deductions you could claim to save more</p>

      <div className="space-y-3">
        {deductions.map((d, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${priorityStyles[d.priority]}`}>
                  {d.priority}
                </span>
                <span className="text-white font-semibold text-sm">{d.name}</span>
              </div>
              <span className="text-green-400 font-bold text-sm whitespace-nowrap">
                Save {fmt(d.potential_saving)}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{d.description}</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-600">
              <span>Section: {d.section}</span>
              <span>Limit: {fmt(d.max_limit)}</span>
              <span>Claimed: {fmt(d.currently_claimed)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
