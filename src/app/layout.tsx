import Head from "next/head";
import "./globals.css";
import { ReactNode } from "react";

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Penny Wise",
  description:
    "PennyWise is your ultimate financial ally, empowering you to effortlessly track your budget and make informed spending decisions. With intuitive features and insightful analytics, PennyWise helps you optimize your finances, one penny at a time.",
  
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className=" bg-background text-textColor">{children}</body>
    </html>
  );
}
