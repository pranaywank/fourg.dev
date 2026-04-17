import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getSortedArticlesData } from "@/lib/articles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fourg Resources | Strategic Insights & Playbooks",
  description: "Explore blogs, guides, and playbooks by Fourg Product Studio on AI strategy, product engineering, and brand building.",
  keywords: ["Fourg", "Resources", "AI Strategy", "Playbooks", "Vibe Coding", "Brand Building"],
  authors: [{ name: "Fourg Product Studio" }],
  creator: "Fourg Product Studio",
  openGraph: {
    title: "Fourg Resources",
    description: "Deep-dives into AI strategy, product development, and brand scaling by Fourg Product Studio.",
    url: "https://fourg.dev",
    siteName: "Fourg Product Studio",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "VFi6tNJPaQC_hDrRm2SusLj8utCU_02uEDWKrRbt7Gk",
  },
};

import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const articles = getSortedArticlesData();

  // Create a minimal version of articles to pass to client component to reduce hydration payload
  const sidebarData = articles.map(a => ({
    title: a.title,
    slug: a.slug,
    category: a.category
  }));

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans min-h-full antialiased bg-brand-bg text-brand-fg`}>
        <div className="flex flex-col md:flex-row min-h-screen relative">
          <Sidebar articles={sidebarData} />

          {/* Main Content */}
          <main className="flex-1 min-w-0 bg-white shadow-sm overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
