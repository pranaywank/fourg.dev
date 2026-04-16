import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fourg Resources | Strategic Insights & Playbooks",
  description: "Explore blogs, guides, and playbooks by Fourg on AI strategy, product engineering, and brand building.",
  keywords: ["Fourg", "Resources", "AI Strategy", "Playbooks", "Vibe Coding", "Brand Building"],
  authors: [{ name: "Fourg.dev" }],
  creator: "Fourg.dev",
  openGraph: {
    title: "Fourg Resources",
    description: "Deep-dives into AI strategy, product development, and brand scaling by Fourg.dev.",
    url: "https://fourg.dev",
    siteName: "Fourg.dev",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans min-h-full antialiased bg-brand-bg text-brand-fg`}>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 border-r border-slate-200 shrink-0 flex flex-col p-6 sticky top-0 md:h-screen overflow-y-auto bg-slate-50">
            <div className="mb-12">
              <a href="https://fourg.dev" className="text-2xl font-bold tracking-tight text-slate-900">Fourg.dev</a>
              <p className="text-sm text-slate-500 mt-2 font-medium">Resources Hub</p>
            </div>
            
            <nav className="flex-1 space-y-8">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-3 text-sm font-medium">
                  <li><Link href="/#playbooks" className="hover:text-blue-600 transition-colors text-slate-600">Playbooks</Link></li>
                  <li><Link href="/#guides" className="hover:text-blue-600 transition-colors text-slate-600">Tactical Guides</Link></li>
                  <li><Link href="/#articles" className="hover:text-blue-600 transition-colors text-slate-600">Deep-Dive Articles</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Links</h3>
                <ul className="space-y-3 text-sm font-medium">
                  <li><a href="https://fourg.dev" className="hover:text-blue-600 transition-colors text-blue-500">Back to Fourg →</a></li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
