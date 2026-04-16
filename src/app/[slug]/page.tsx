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
      
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to all resources
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-blue-400 font-semibold uppercase tracking-wider mb-4">
            <span>{articleData.category}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">{new Date(articleData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {articleData.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {articleData.description}
          </p>
        </header>

        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-clash prose-headings:font-semibold prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {articleData.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/10">
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3">Scale Your Startup With Fourg</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              We help founders build, brand, and scale. Stop building random features and start executing with pure velocity.
            </p>
            <a href="https://fourg.dev" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black shadow hover:bg-white/90 h-10 px-8 py-2">
              Work With Us
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}
