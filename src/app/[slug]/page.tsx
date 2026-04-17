import { getAllArticleSlugs, getArticleData } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const paths = getAllArticleSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const articleData = getArticleData(resolvedParams.slug);
  return {
    title: `${articleData.title} | Fourg Resources`,
    description: articleData.description,
    openGraph: {
      title: articleData.title,
      description: articleData.description,
      type: 'article',
      publishedTime: articleData.date,
      authors: [articleData.author],
    }
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleData = getArticleData(resolvedParams.slug);

  // Structured Data for SEO / GEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.title,
    description: articleData.description,
    author: {
      '@type': 'Organization',
      name: articleData.author,
      url: 'https://fourg.dev',
    },
    datePublished: articleData.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 bg-white">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to all resources
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-blue-600 font-bold uppercase tracking-wider mb-4">
            <span>{articleData.category}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{new Date(articleData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
            {articleData.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            {articleData.description}
          </p>
        </header>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {articleData.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl text-center">
            <h3 className="text-2xl font-extrabold mb-4 text-slate-900">Scale Your Startup With Fourg Product Studio</h3>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
              We help founders build, brand, and scale. Stop building random features and start executing with pure velocity.
            </p>
            <a href="https://fourg.dev" className="inline-flex items-center justify-center rounded-xl text-base font-bold transition-all bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 h-12 px-8 py-3">
              Work With Us
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}
