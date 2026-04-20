import { getAllArticleSlugs, getArticleData } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import type { Metadata } from 'next';

const BASE_URL = 'https://pranaywank.github.io/fourg.dev';

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
    alternates: {
      canonical: `${BASE_URL}/${resolvedParams.slug}/`,
    },
    openGraph: {
      title: articleData.title,
      description: articleData.description,
      url: `${BASE_URL}/${resolvedParams.slug}/`,
      type: 'article',
      publishedTime: articleData.date,
      authors: [articleData.author],
    }
  };
}

/** Splits content at the Nth occurrence of a horizontal rule (---) */
function splitContentAtSection(content: string, splitAfterSection: number): [string, string] {
  // Split on --- that appears as its own line (markdown HR)
  const parts = content.split(/\n---\n/);
  if (parts.length <= splitAfterSection) {
    // Not enough sections — return all content in first half, nothing in second
    return [content, ''];
  }
  const firstHalf = parts.slice(0, splitAfterSection).join('\n---\n');
  const secondHalf = parts.slice(splitAfterSection).join('\n---\n');
  return [firstHalf, secondHalf];
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleData = getArticleData(resolvedParams.slug);

  // Structured Data: Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.title,
    description: articleData.description,
    author: {
      '@type': 'Organization',
      name: articleData.author,
      url: 'https://fourg.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fourg Product Studio',
      url: 'https://fourg.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fourg.dev/icon.png',
      },
    },
    datePublished: articleData.date,
    dateModified: articleData.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${resolvedParams.slug}/`,
    },
  };

  // Structured Data: FAQPage (only if FAQ data exists)
  const faqJsonLd = articleData.faq && articleData.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: articleData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  // Split content: first 3 sections | mid CTA | rest
  const [firstHalf, secondHalf] = splitContentAtSection(articleData.content, 3);

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* FAQ Schema */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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

        {/* First half of article content */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {firstHalf}
          </ReactMarkdown>
        </div>

        {/* Mid-content CTA (only shown when there's a meaningful second half) */}
        {secondHalf && (
          <div className="my-12 p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 not-prose">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900 mb-0.5">Want this executed for your startup?</p>
              <p className="text-sm text-blue-700 leading-snug">
                <a
                  href="https://fourg.dev"
                  className="font-semibold underline underline-offset-2 hover:text-blue-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fourg Product Studio
                </a>{' '}
                turns playbooks like this into live, high-converting products. No fluff — pure execution velocity.
              </p>
            </div>
            <a
              href="https://fourg.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/30 whitespace-nowrap"
            >
              Work With Us →
            </a>
          </div>
        )}

        {/* Second half of article content */}
        {secondHalf && (
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {secondHalf}
            </ReactMarkdown>
          </div>
        )}

        <footer className="mt-20 pt-10 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl text-center">
            <h3 className="text-2xl font-extrabold mb-4 text-slate-900">Scale Your Startup With Fourg Product Studio</h3>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
              We help founders build, brand, and scale. Stop building random features and start executing with pure velocity.
            </p>
            <a
              href="https://fourg.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl text-base font-bold transition-all bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/50 h-12 px-8 py-3"
            >
              Work With Us
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}
