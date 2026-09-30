import React, { useState } from 'react';
import { MAHEESHA_PROFILE, ACHIEVEMENTS_DATA } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const markdown = `# Maheesha - Software Engineer (Backend & Distributed Systems)
Email: ${MAHEESHA_PROFILE.email} | GitHub: ${MAHEESHA_PROFILE.github} | LinkedIn: ${MAHEESHA_PROFILE.linkedin}
Location: ${MAHEESHA_PROFILE.location}

## Summary
Undergraduate in Computer Science at SLIIT specializing in distributed backend systems, multi-tenant authentication, and developer tooling. Active open-source contributor to WSO2. Seeking a Software Engineering Internship in 2026.

## Education
- BSc (Hons) in Computer Science, Sri Lanka Institute of Information Technology (SLIIT)
- Expected Graduation: 2027

## Technical Competencies
- Languages: Go, Java, Python, TypeScript, C++, C# (.NET Core), SQL
- Backend & Distributed: FastAPI, Spring Boot, ASP.NET Core, LangGraph, gRPC, Docker, Kubernetes
- Identity & Security: WSO2 Identity Server & API Manager, OAuth 2.0, OpenID Connect, JWT
- Databases: PostgreSQL, MongoDB, Redis

## Selected Awards & Hackathons
${ACHIEVEMENTS_DATA.map(
  (a) => `- [${a.date}] ${a.title} (${a.badgeType}): ${a.description}`
).join('\n')}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#131318] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#f4f4f7]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#181820]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span className="font-mono text-xs text-[#f4f4f7] font-semibold">
              Curriculum Vitae · Maheesha
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-[#f4f4f7] transition-colors flex items-center gap-1 cursor-pointer border border-white/[0.08]"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-xs font-medium text-white transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[14px]">print</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1b2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* CV Content Area */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <h1 className="text-2xl font-bold text-[#f4f4f7]">
                Maheesha
              </h1>
              <p className="text-[#c084fc] font-medium text-sm mt-1">
                Backend Systems & Distributed Architectures
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#a1a1b2] mt-2">
                <span>{MAHEESHA_PROFILE.location}</span>
                <span>·</span>
                <span>{MAHEESHA_PROFILE.email}</span>
                <span>·</span>
                <span>github.com/pramudithamaheesha</span>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/25 font-mono text-xs text-[#10b981]">
              Seeking 2026 Internship
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] font-semibold mb-3">
              Education
            </h2>
            <div className="bg-[#181820] border border-white/[0.06] p-4 rounded-xl">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="font-semibold text-sm text-[#f4f4f7]">
                  Sri Lanka Institute of Information Technology (SLIIT)
                </h3>
                <span className="font-mono text-xs text-[#10b981]">2023 – 2027 (Expected)</span>
              </div>
              <p className="text-xs text-[#a1a1b2] mt-1">
                BSc (Hons) in Computer Science
              </p>
              <p className="text-xs text-[#717182] mt-2">
                Key Subjects: Distributed Systems, High-Concurrency Network Programming, Database Internals, Compiler Design.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] font-semibold mb-3">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#181820] border border-white/[0.06] p-3.5 rounded-xl">
                <span className="font-mono text-[#f4f4f7] font-semibold block mb-1">
                  Languages
                </span>
                <span className="text-[#a1a1b2]">
                  Go, Java, Python, C++, TypeScript, C# (.NET Core), SQL
                </span>
              </div>
              <div className="bg-[#181820] border border-white/[0.06] p-3.5 rounded-xl">
                <span className="font-mono text-[#f4f4f7] font-semibold block mb-1">
                  Backend & Systems
                </span>
                <span className="text-[#a1a1b2]">
                  FastAPI, Spring Boot, ASP.NET Core, gRPC, LangGraph, REST, WebSockets
                </span>
              </div>
              <div className="bg-[#181820] border border-white/[0.06] p-3.5 rounded-xl">
                <span className="font-mono text-[#f4f4f7] font-semibold block mb-1">
                  Identity & Security
                </span>
                <span className="text-[#a1a1b2]">
                  WSO2 Identity Server & API Manager, OAuth 2.0, OpenID Connect, JWT
                </span>
              </div>
              <div className="bg-[#181820] border border-white/[0.06] p-3.5 rounded-xl">
                <span className="font-mono text-[#f4f4f7] font-semibold block mb-1">
                  Databases & Infra
                </span>
                <span className="text-[#a1a1b2]">
                  PostgreSQL, MongoDB, Docker, Azure, Linux Kernel Tooling, Git
                </span>
              </div>
            </div>
          </div>

          {/* Open Source */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] font-semibold mb-3">
              Open Source Contributions
            </h2>
            <div className="bg-[#181820] border border-white/[0.06] p-4 rounded-xl">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-[#f4f4f7]">
                  WSO2 Open Source Repositories
                </h3>
                <span className="font-mono text-xs text-[#10b981]">4 Merged PRs</span>
              </div>
              <p className="text-xs text-[#a1a1b2] mt-1.5 leading-relaxed">
                Contributed bug fixes and architectural documentation refinements to WSO2 Identity Server and Micro Integrator repositories focusing on token validation caching and Carbon runtime setup.
              </p>
            </div>
          </div>

          {/* Selected Awards */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] font-semibold mb-3">
              Selected Awards & Hackathons
            </h2>
            <div className="space-y-2 text-xs">
              {ACHIEVEMENTS_DATA.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#181820] border border-white/[0.06]"
                >
                  <div>
                    <span className="font-medium text-[#f4f4f7]">{a.title}</span>
                    <span className="text-[#717182] ml-2">({a.date})</span>
                    <p className="text-[#a1a1b2] mt-0.5">{a.description}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono font-medium bg-white/[0.05] text-[#c084fc] shrink-0 ml-3">
                    {a.badgeType}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
