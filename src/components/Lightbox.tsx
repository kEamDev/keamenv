import { useEffect, useCallback, type ReactNode } from "react";

export interface LightboxItem {
  type: "image" | "video";
  url: string;
  youtubeId?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  footerContent?: ReactNode;
}

interface LightboxLegacyProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  footerContent?: ReactNode;
}

export default function Lightbox(props: LightboxProps | LightboxLegacyProps) {
  const items: LightboxItem[] =
    "items" in props
      ? props.items
      : props.images.map((url) => ({ type: "image" as const, url }));

  const { currentIndex, onClose, onNext, onPrev, footerContent } = props;

  const total = items.length;
  const current = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 z-50 -translate-x-1/2 text-sm font-medium tracking-wider text-white/60">
        {currentIndex + 1} / {total}
      </div>

      {/* Previous button */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer md:left-6"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Scrollable content */}
      <div
        className="relative z-40 h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
            {current?.type === "video" && current.youtubeId ? (
              <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                  className="h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={current?.url}
                alt={`Screenshot ${currentIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
                draggable={false}
              />
            )}
          </div>

          {footerContent && (
            <div className="mx-auto mt-8 w-full max-w-4xl pb-10">
              {footerContent}
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer md:right-6"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
