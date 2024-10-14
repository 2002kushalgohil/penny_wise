// Import global styles
import Head from "next/head";
import "./globals.css";

// Import necessary dependencies
import { ReactNode } from "react";

// Define interface for metadata
interface Metadata {
  title: string;
  description: string;
}

// Metadata object
export const metadata: Metadata = {
  title: "Penny Wise",
  description:
    "PennyWise is your ultimate financial ally, empowering you to effortlessly track your budget and make informed spending decisions. With intuitive features and insightful analytics, PennyWise helps you optimize your finances, one penny at a time.",
};

// Define props interface for RootLayout component
interface RootLayoutProps {
  children: ReactNode;
}

// RootLayout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        {children}
      </body>
    </html>
  );
}
