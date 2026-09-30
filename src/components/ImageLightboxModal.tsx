import React from 'react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  image: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  image,
  title,
  subtitle,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#131318] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden cursor-default flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#181820] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c084fc]"></span>
            <span className="text-xs font-semibold text-[#f4f4f7] font-sans">{title}</span>
            {subtitle && (
              <span className="text-xs text-[#717182] font-mono">· {subtitle}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1b2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Image Container */}
        <div className="relative bg-[#0a0a0d] p-3 flex items-center justify-center max-h-[80vh] overflow-auto">
          <img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain max-h-[75vh] rounded-lg border border-white/[0.04]"
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-[#131318] border-t border-white/[0.06] flex items-center justify-between text-xs text-[#717182]">
          <span>Full Resolution Preview</span>
          <span>Click anywhere outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
