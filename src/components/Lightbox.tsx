"use client";

import { useEffect } from "react";

export type LightboxImage = { src: string; alt: string };

export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, images.length, onClose, onIndex]);

  if (index === null) return null;
  const img = images[index];
  const many = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-0 z-[100] bg-foreground/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 text-foreground text-xl"
      >
        ×
      </button>
      {many && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + images.length) % images.length);
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % images.length);
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 text-foreground"
          >
            →
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-background/80">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}
