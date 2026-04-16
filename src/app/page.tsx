import { getSortedArticlesData } from "@/lib/articles";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const articles = getSortedArticlesData();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Fourg Resources</h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Deep dives, technical guides, and strategic playbooks crafted by the Fourg.dev team. Learn how to validate quickly, build premium brands, and integrate AI seamlessly.
        </p>
      </header>

      <div className="space-y-12">
        {articles.map((article) => (
          <article key={article.slug} className="group border-b border-white/10 pb-12 last:border-0 hover:border-white/30 transition-colors">
            <Link href={`/${article.slug}`} className="block focus:outline-none">
              <span className="inline-block text-xs font-semibold text-blue-400 tracking-wider uppercase mb-3">
                {article.category} • {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                {article.title}
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {article.description}
              </p>
              <span className="text-sm text-gray-300 font-medium">Read Article →</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
