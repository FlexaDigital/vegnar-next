'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const allImages = images.length > 0
    ? images
    : ['https://placehold.co/600x600/f5f5f5/aaaaaa?text=No+Image'];

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPos, setZoomPos]         = useState({ x: 50, y: 50 });
  const [lensStyle, setLensStyle]     = useState<React.CSSProperties>({});
  const [showZoom, setShowZoom]       = useState(false);

  const touchStartX = useRef<number | null>(null);
  const mainImgRef  = useRef<HTMLDivElement>(null);
  const thumbsRef   = useRef<HTMLDivElement>(null);
  const LENS_SIZE   = 100; // px

  /* ── keyboard nav ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only navigate when no input is focused
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft')  setActiveIndex(i => (i - 1 + allImages.length) % allImages.length);
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % allImages.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allImages.length]);

  /* ── auto-scroll thumbnail ── */
  useEffect(() => {
    const el = thumbsRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  /* ── mouse zoom tracking ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = mainImgRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const relX = Math.max(0, Math.min(e.clientX - left, width));
    const relY = Math.max(0, Math.min(e.clientY - top, height));

    setZoomPos({ x: (relX / width) * 100, y: (relY / height) * 100 });
    setLensStyle({
      left: relX - LENS_SIZE / 2,
      top:  relY - LENS_SIZE / 2,
    });
  }, []);

  /* ── swipe ── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40)
      setActiveIndex(i => diff < 0
        ? (i + 1) % allImages.length
        : (i - 1 + allImages.length) % allImages.length
      );
    touchStartX.current = null;
  };

  const prev = () => setActiveIndex(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex(i => (i + 1) % allImages.length);
  const multi = allImages.length > 1;

  return (
    /*
     * Outer wrapper:  position:relative so the zoom panel can be
     * positioned absolutely outside the main image box without
     * affecting the page flow.
     */
    <div className="relative flex gap-3 w-full md:w-auto flex-shrink-0 select-none" style={{ maxWidth: 520 }}>

      {/* ─────────────────────────────────────────────
          LEFT: Vertical Thumbnail Strip (desktop only)
      ───────────────────────────────────────────── */}
      {multi && (
        <div
          ref={thumbsRef}
          className="hidden md:flex flex-col gap-2 overflow-y-auto flex-shrink-0"
          style={{ width: 76, maxHeight: 480, scrollbarWidth: 'none' }}
        >
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={[
                'relative flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none bg-white/60',
                idx === activeIndex
                  ? 'border-green-600 ring-1 ring-green-400 shadow-md'
                  : 'border-gray-200 hover:border-green-400 opacity-60 hover:opacity-100',
              ].join(' ')}
              style={{ width: 72, height: 72 }}
            >
              {idx === activeIndex && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center z-10 shadow">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <img
                src={img}
                alt={`${productName} view ${idx + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────
          CENTER: Main Image
      ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Image frame */}
        <div
          ref={mainImgRef}
          className="relative rounded-xl overflow-hidden cursor-crosshair"
          style={{ aspectRatio: '1/1', maxWidth: 440 }}
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Product image */}
          <img
            key={activeIndex}
            src={allImages[activeIndex]}
            alt={`${productName} – image ${activeIndex + 1}`}
            className="w-full h-full object-contain animate-fade-in"
            draggable={false}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
          />

          {/* Zoom lens square */}
          {showZoom && (
            <div
              className="absolute pointer-events-none border-2 border-green-500/70 bg-green-100/20 z-20"
              style={{ width: LENS_SIZE, height: LENS_SIZE, borderRadius: 6, ...lensStyle }}
            />
          )}

          {/* Prev / Next */}
          {multi && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                  w-9 h-9 rounded-full bg-white/90 hover:bg-white
                  border border-gray-200 shadow-md
                  flex items-center justify-center
                  text-gray-500 hover:text-green-700
                  transition-all duration-150 hover:scale-105"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                  w-9 h-9 rounded-full bg-white/90 hover:bg-white
                  border border-gray-200 shadow-md
                  flex items-center justify-center
                  text-gray-500 hover:text-green-700
                  transition-all duration-150 hover:scale-105"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Bottom badges */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none z-10">
            {/* Zoom hint — hide while zoomed */}
            <span className={[
              'flex items-center gap-1 bg-black/45 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full transition-opacity duration-200',
              showZoom ? 'opacity-0' : 'opacity-100',
            ].join(' ')}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 5a6 6 0 0116 6z" />
              </svg>
              Hover to zoom
            </span>
            {/* Counter */}
            {multi && (
              <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                {activeIndex + 1} / {allImages.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile: dots */}
        {multi && (
          <div className="flex md:hidden justify-center gap-1.5">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={[
                  'rounded-full transition-all duration-200',
                  idx === activeIndex ? 'bg-green-600 w-5 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-green-400',
                ].join(' ')}
              />
            ))}
          </div>
        )}

        {/* Mobile: horizontal thumbnails */}
        {multi && (
          <div className="flex md:hidden gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                className={[
                  'flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none bg-white/60',
                  idx === activeIndex ? 'border-green-600 shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-green-400',
                ].join(' ')}
              >
                <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-contain" draggable={false} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────
          RIGHT: Amazon-style Zoom Panel
          Positioned absolutely so it floats outside
          the gallery container without pushing content
      ───────────────────────────────────────────── */}
      {showZoom && (
        <div
          className="absolute hidden lg:block rounded-xl overflow-hidden border border-gray-200 shadow-2xl pointer-events-none z-50"
          style={{
            width: 400,
            height: 400,
            // Place it just to the right of the gallery
            left: 'calc(100% + 16px)',
            top: 0,
            backgroundImage: `url(${allImages[activeIndex]})`,
            backgroundSize: '280%',
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#fff',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
