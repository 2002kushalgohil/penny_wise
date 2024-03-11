import "./globals.css";

export const metadata = {
  title: "Penny Wise",
  description:
    "PennyWise is your ultimate financial ally, empowering you to effortlessly track your budget and make informed spending decisions. With intuitive features and insightful analytics, PennyWise helps you optimize your finances, one penny at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
