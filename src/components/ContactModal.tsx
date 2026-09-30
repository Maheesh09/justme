import React, { useState } from 'react';
import { MAHEESHA_PROFILE } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(MAHEESHA_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#131318] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[#f4f4f7]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181820] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span className="text-xs font-mono text-[#f4f4f7] font-semibold">
              Get in Touch with Maheesha
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1b2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-[#f4f4f7]">
              Let's connect.
            </h2>
            <p className="text-xs text-[#a1a1b2] mt-1 leading-relaxed">
              Open to 2026 software engineering internships. Always happy to discuss backend systems, distributed databases, or student projects.
            </p>
          </div>

          {/* Quick Copy Email Box */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e12] border border-white/[0.06]">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-sm text-[#c084fc]">mail</span>
              <span className="font-mono text-xs text-[#f4f4f7] truncate">
                {MAHEESHA_PROFILE.email}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-[#c084fc] shrink-0 ml-2 transition-colors cursor-pointer flex items-center gap-1 border border-white/[0.08]"
            >
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#a1a1b2] mb-1 font-medium">
                Your Name / Team
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya (Engineering Lead)"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-white/[0.08] focus:border-[#8b5cf6] focus:outline-none text-[#f4f4f7] placeholder:text-[#717182]"
              />
            </div>
            <div>
              <label className="block text-[#a1a1b2] mb-1 font-medium">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@company.com"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-white/[0.08] focus:border-[#8b5cf6] focus:outline-none text-[#f4f4f7] placeholder:text-[#717182]"
              />
            </div>
            <div>
              <label className="block text-[#a1a1b2] mb-1 font-medium">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Maheesha, we have a backend engineering internship opening on our platform team..."
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-white/[0.08] focus:border-[#8b5cf6] focus:outline-none text-[#f4f4f7] placeholder:text-[#717182] resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`mailto:${MAHEESHA_PROFILE.email}?subject=Software%20Engineering%20Internship%20Inquiry`}
                className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1b2] hover:text-[#f4f4f7] transition-colors border border-white/[0.08]"
              >
                Open Default Mail App
              </a>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="flex-1 px-4 py-2 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-white/[0.1] text-white font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {status === 'sending' ? (
                  <span>Sending message...</span>
                ) : status === 'sent' ? (
                  <span>Message Sent! Thank you.</span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
