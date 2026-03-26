"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Tax", href: "/", icon: "📄" },
  { label: "Portfolio", href: "/portfolio", icon: "📊" },
  { label: "Couples", href: "/couples", icon: "💑" },
  { label: "Health", href: "/health", icon: "💚" },
  { label: "FIRE", href: "/fire", icon: "🔥" },
  { label: "Alerts", href: "/alerts", icon: "🔔" },
];

export default function Header() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0e1a]/80 backdrop-blur-xl">
      {/* ET Top Bar */}
      <div className="bg-gradient-to-r from-[#0d2137] to-[#1a3050] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-wider text-white/90">
              <span className="text-[#e4002b] font-black">ET</span> WEALTH
            </span>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[10px] text-white/40">AI CFO</span>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[10px] text-white/40">Markets</span>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[10px] text-white/40">Tax</span>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[10px] text-white/40">Invest</span>
          </div>
          <span className="text-[10px] text-white/40 hidden sm:block">
            Powered by ET's 25 years of financial intelligence
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[#e4002b] font-black text-lg">ET</span>
            <span className="text-white/30 text-lg font-light">×</span>
          </div>
          <span className="text-white font-bold text-sm">
            MoneyMentor <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          {NAV.map((n) => {
            const active = path === n.href || (n.href !== "/" && path.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <span className="text-[11px]">{n.icon}</span>
                <span className="hidden sm:block">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Badge */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e4002b]/15 text-[#e4002b] font-bold">
            ET AI Hackathon 2026
          </span>
        </div>
      </div>
    </header>
  );
}
