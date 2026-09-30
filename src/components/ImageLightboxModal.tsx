import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  image: string;
  title: string;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({ isOpen, image, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-panel-2 p-2 text-muted hover:text-ink"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <img src={image} alt={title} className="max-h-[80vh] w-full rounded-xl object-contain" />
      </div>
    </div>
  );
};
