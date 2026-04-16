import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased bg-brand-bg text-brand-fg">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 border-r border-white/10 shrink-0 flex flex-col p-6 sticky top-0 md:h-screen overflow-y-auto">
            <div className="mb-12">
              <a href="https://fourg.dev" className="text-2xl font-bold tracking-tight">Fourg.dev</a>
              <p className="text-sm text-gray-400 mt-2">Resources Hub</p>
            </div>
            
            <nav className="flex-1 space-y-8">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/fourg.dev/#ai" className="hover:text-white transition-colors text-gray-300">AI Strategy</a></li>
                  <li><a href="/fourg.dev/#founders" className="hover:text-white transition-colors text-gray-300">Founder Playbooks</a></li>
                  <li><a href="/fourg.dev/#brand" className="hover:text-white transition-colors text-gray-300">Brand Building</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="https://fourg.dev" className="hover:text-white transition-colors text-blue-400">Back to Agency →</a></li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
