'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxModalProps {
  images: { url: string; caption: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar with Counter and Close Button */}
      <div
        className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-xs text-white/80 font-serif italic">Vietnam Unveiled Gallery</span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Đóng ảnh"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] text-white transition-all z-50 shadow-lg"
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Display */}
      <div
        className="max-w-5xl max-h-[80vh] px-4 flex flex-col items-center justify-center relative z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.caption}
          className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
        />

        {/* Caption */}
        <p className="mt-4 text-center text-sm sm:text-base text-white/90 font-serif max-w-2xl px-4">
          {currentImage.caption}
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] text-white transition-all z-50 shadow-lg"
        aria-label="Ảnh sau"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
