import "./globals.css";

export const metadata = {
  title: "MoneyMentor AI — CFO for Every Indian",
  description: "India's first AI-powered personal CFO. Tax optimization, portfolio X-Ray, FIRE planning, and money health scoring — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
