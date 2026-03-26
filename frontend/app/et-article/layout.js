import Header from "../../components/Header";

export default function ETArticleLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-white/5 py-4 px-4 text-center">
        <p className="text-[10px] text-gray-600">
          © 2026 The Economic Times — ET Wealth | <span className="text-[#e4002b]">ET</span> × MoneyMentor AI
        </p>
      </footer>
    </div>
  );
}
