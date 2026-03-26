import Header from "../../components/Header";

export default function HealthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-8 py-8 max-w-4xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-white/5 py-3 px-4 text-center">
        <p className="text-[10px] text-gray-600 flex items-center justify-center gap-2">
          <span>🔒 Your data is processed in-memory and never stored.</span>
          <span className="text-white/10">|</span>
          <span><span className="text-[#e4002b] font-bold">ET</span> × MoneyMentor AI</span>
        </p>
      </footer>
    </div>
  );
}
