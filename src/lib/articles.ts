import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  content: string;
  type?: string;
  faq?: FaqItem[];
}

/**
 * Parses the "## Frequently Asked Questions" section from markdown content.
 * Expects ### H3 as question, followed by a paragraph as the answer.
 */
function parseFaq(content: string): FaqItem[] {
  const faqSectionMatch = content.match(/## Frequently Asked Questions.*?([\s\S]*?)(?=\n## |\n---|\s*$)/i);
  if (!faqSectionMatch) return [];

  const faqSection = faqSectionMatch[1];
  const questionBlocks = faqSection.split(/\n###\s+/).filter(Boolean);

  return questionBlocks.map((block) => {
    const lines = block.trim().split('\n').filter(Boolean);
    const question = lines[0].trim();
    const answer = lines.slice(1).join(' ').trim();
    return { question, answer };
  }).filter((item) => item.question && item.answer);
}

export function getSortedArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const faq = parseFaq(matterResult.content);

    return {
      slug,
      content: matterResult.content,
      faq: faq.length > 0 ? faq : undefined,
      ...(matterResult.data as Omit<ArticleData, 'slug' | 'content' | 'faq'>),
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getArticleData(slug: string): ArticleData {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const faq = parseFaq(matterResult.content);

  return {
    slug,
    content: matterResult.content,
    faq: faq.length > 0 ? faq : undefined,
    ...(matterResult.data as Omit<ArticleData, 'slug' | 'content' | 'faq'>),
  };
}
