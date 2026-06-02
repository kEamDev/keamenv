import { useState, useEffect } from "react";
import AuthorInline from "./AuthorInline";
import { useLang } from "../i18n/LangContext";
import type { Model3D } from "../data/models";

interface ModelTileProps {
  model: Model3D;
}

export default function ModelTile({ model }: ModelTileProps) {
  const { lang } = useLang();
  const [showEmbed, setShowEmbed] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // Загружаем превью через oEmbed API Sketchfab
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const res = await fetch(
          `https://sketchfab.com/oembed?url=https://sketchfab.com/3d-models/${model.sketchfabId}`
        );
        if (res.ok) {
          const data = await res.json();
          setThumbnailUrl(data.thumbnail_url || "");
        }
      } catch {
        // fallback — пустое превью
      }
    };
    fetchThumbnail();
  }, [model.sketchfabId]);

  // Блокируем скролл при открытом попапе
  useEffect(() => {
    if (showEmbed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEmbed]);

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 transition-all duration-500"
        onClick={() => setShowEmbed(true)}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={model.title[lang]}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-800">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          {/* 3D badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-indigo-600/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
            3D
          </div>

          {/* Play-like overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <h3 className="text-sm font-bold text-white sm:text-base line-clamp-1">
              {model.title[lang]}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
              {model.creators.slice(0, 3).map((creator, i) => (
                <span key={i} className="inline-flex items-center">
                  {i > 0 && <span className="mr-2 text-neutral-600">•</span>}
                  <AuthorInline
                    name={creator.name}
                    url={creator.url}
                    avatar={creator.avatar}
                    compact
                  />
                </span>
              ))}
            </div>

            <div className="mt-1.5 flex flex-wrap gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {model.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-700/50 bg-neutral-800/60 px-2 py-0.5 text-[10px] font-medium text-neutral-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {model.tags.length > 3 && (
                <span className="rounded-full bg-neutral-800/60 px-2 py-0.5 text-[10px] text-neutral-500">
                  +{model.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sketchfab popup */}
      {showEmbed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowEmbed(false)}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

          {/* Close */}
          <button
            onClick={() => setShowEmbed(false)}
            className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Title */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm font-medium">
            {model.title[lang]}
          </div>

          <div
            className="relative z-10 w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
              <iframe
                title={model.title[lang]}
                src={`https://sketchfab.com/models/${model.sketchfabId}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0`}
                className="h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
