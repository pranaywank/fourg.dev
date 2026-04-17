"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Home } from "lucide-react";

interface SidebarArticle {
  title: string;
  slug: string;
  category: string;
}

export function Sidebar({ articles }: { articles: SidebarArticle[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Group articles by category
  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, SidebarArticle[]>);

  const categories = Object.keys(groupedArticles).sort();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-50">
        <div className="flex flex-col">
           <a href="https://fourg.dev" className="text-xl font-bold tracking-tight text-slate-900">Fourg Product Studio</a>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Actual Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-72 lg:w-80 border-r border-slate-200 bg-slate-50 flex flex-col pt-6 pb-20 px-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto no-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}
      >
        <div className="mb-10 hidden md:block">
          <a href="https://fourg.dev" className="text-2xl font-black tracking-tight text-slate-900 block mb-1">Fourg.dev</a>
          <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Product Studio Docs</div>
        </div>

        <nav className="flex-1 space-y-8 mt-4 md:mt-0">
          
          <div className="mb-8">
            <ul className="space-y-1">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-200/50 text-slate-700 transition-colors">
                  <Home className="w-4 h-4 text-slate-500" /> Introduction
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Directory</h3>
            
            <div className="space-y-4">
              {categories.map((category) => (
                <CategoryAccordion key={category} category={category} articles={groupedArticles[category]} closeMobile={() => setIsOpen(false)} />
              ))}
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-200">
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-1 text-sm font-medium">
              <li>
                <a href="https://fourg.dev" className="flex items-center px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-200/50 text-slate-700 transition-colors">
                  Back to Fourg →
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

// Sub-component to handle Accordion State per category
function CategoryAccordion({ category, articles, closeMobile }: { category: string, articles: SidebarArticle[], closeMobile: () => void }) {
  const pathname = usePathname();
  
  // Auto-expand if the current article belongs to this category
  const isActiveCategory = articles.some(a => pathname === `/${a.slug}`);
  const [isExpanded, setIsExpanded] = useState(isActiveCategory); // Closed by default unless active

  return (
    <div className="group">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-bold text-slate-900 rounded-lg hover:bg-slate-200/50 transition-colors"
      >
        <span>{category}</span>
        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
      </button>
      
      {isExpanded && (
        <ul className="mt-1 space-y-[2px] ml-1 pl-3 border-l border-slate-200">
          {articles.map((article) => {
            const isActive = pathname === `/${article.slug}`;
            return (
              <li key={article.slug}>
                <Link 
                  href={`/${article.slug}`} 
                  onClick={closeMobile}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors leading-snug ${
                    isActive 
                      ? "bg-blue-50 text-blue-700 font-semibold" 
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {article.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
