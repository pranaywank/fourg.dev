import { getSortedArticlesData, ArticleData } from "@/lib/articles";
import Link from "next/link";
import { BookOpen, Compass, FileText, ArrowUpRight } from "lucide-react";

function CategorySection({ title, icon, articles }: { title: string, icon: React.ReactNode, articles: ArticleData[] }) {
  if (articles.length === 0) return null;
  
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
        {icon}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/${article.slug}`} className="group block p-6 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="inline-block text-xs font-bold text-blue-600 tracking-wider uppercase mb-3">
              {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors flex items-start justify-between gap-4">
              <span className="leading-tight">{article.title}</span>
              <ArrowUpRight className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const articles = getSortedArticlesData();

  const guides = articles.filter(a => a.type === 'guide' || a.category.toLowerCase().includes('brand'));
  const playbooks = articles.filter(a => a.type === 'playbook' || a.category.toLowerCase().includes('founder'));
  const pureArticles = articles.filter(a => a.type === 'article' || a.category.toLowerCase().includes('ai strategy'));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-20">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide mb-6 border border-blue-100">
          Fourg Education
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
          Welcome to the <br/><span className="text-blue-600">Resources Hub</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
          Deep dives, technical guides, and strategic playbooks crafted by the Fourg team. Learn how to validate quickly, build premium brands, and integrate AI seamlessly without writing unnecessary code.
        </p>
      </header>

      <CategorySection title="Playbooks" icon={<BookOpen className="w-6 h-6 text-blue-600" />} articles={playbooks} />
      <CategorySection title="Tactical Guides" icon={<Compass className="w-6 h-6 text-emerald-600" />} articles={guides} />
      <CategorySection title="Deep-Dive Articles" icon={<FileText className="w-6 h-6 text-indigo-600" />} articles={pureArticles} />

    </div>
  );
}
