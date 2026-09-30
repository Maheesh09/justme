import React from 'react';
import { Article } from '../data/portfolioData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#131318] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#f4f4f7]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#181820]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c084fc]"></span>
            <span className="font-mono text-xs text-[#c084fc] font-semibold">
              ENGINEERING ESSAY · {article.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1b2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-6">
          <div className="space-y-3 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center justify-between text-xs text-[#717182] font-mono">
              <span className="text-[#c084fc]">{article.category}</span>
              <span>{article.readTime} · Published {article.date}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#f4f4f7] leading-tight">
              {article.title}
            </h1>
            <p className="text-sm md:text-base text-[#a1a1b2] italic bg-[#0e0e12] p-4 rounded-xl border border-white/[0.06]">
              "{article.excerpt}"
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base text-[#a1a1b2] leading-relaxed">
            {article.content.map((section, idx) => (
              <div key={idx} className="space-y-3">
                {section.sectionTitle && (
                  <h2 className="text-base font-semibold text-[#f4f4f7] pt-2">
                    {section.sectionTitle}
                  </h2>
                )}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Author Badge */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center font-bold text-white text-sm">
                M
              </div>
              <div>
                <span className="font-semibold text-sm text-[#f4f4f7] block">Maheesha</span>
                <span className="text-xs text-[#717182]">Backend Systems & Architecture · SLIIT</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-[#f4f4f7] transition-colors cursor-pointer border border-white/[0.08]"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
