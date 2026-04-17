import { ArrowRight, Box, Code, Sparkles } from "lucide-react";
import Link from "next/link";
import { getSortedArticlesData } from "@/lib/articles";

export default function Home() {
  const articles = getSortedArticlesData();
  const latestArticle = articles[0]; // Get the most recent article dynamically

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <header className="mb-16">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide mb-8 border border-blue-100">
          <Sparkles className="w-4 h-4" />
          Fourg Product Studio Docs
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]">
          The Architect's <br className="hidden md:block"/>
          <span className="text-blue-600">Knowledge Base.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mb-12">
          An exhaustive library of execution playbooks, GTM strategies, and architectural blueprints for Vibe Coders and Indie Founders.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {latestArticle && (
            <Link href={`/${latestArticle.slug}`} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Read The Latest Playbook <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          <a href="https://fourg.dev" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all hover:border-slate-300">
            Work with Fourg Studio
          </a>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6 mt-20">
        <div className="p-8 border border-slate-200 rounded-3xl bg-slate-50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all">
          <Box className="w-8 h-8 text-blue-600 mb-6" />
          <h3 className="text-xl font-bold text-slate-900 mb-3">The Ops Manual</h3>
          <p className="text-slate-600 leading-relaxed">
            Use the sidebar to navigate the exact operational frameworks we use. We cover everything from setting up your initial MVP infrastructure to aggressive video growth loops for both B2B and B2C audiences.
          </p>
        </div>
        <div className="p-8 border border-slate-200 rounded-3xl bg-slate-50 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
          <Code className="w-8 h-8 text-emerald-600 mb-6" />
          <h3 className="text-xl font-bold text-slate-900 mb-3">Built for Vibe Coders</h3>
          <p className="text-slate-600 leading-relaxed">
            Writing code is no longer the bottleneck. Our methodologies teach you how to shift your focus from engineering features to orchestrating elite UX aesthetics and high-velocity B2C and B2B growth.
          </p>
        </div>
      </div>
    </div>
  );
}
