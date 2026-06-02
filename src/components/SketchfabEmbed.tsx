import { useState } from "react";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

interface SketchfabEmbedProps {
  sketchfabId: string;
  title: string;
}

export default function SketchfabEmbed({ sketchfabId, title }: SketchfabEmbedProps) {
  const { lang } = useLang();
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = `https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0`;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-indigo-500" />
              <span className="text-sm text-neutral-500">{t("sketchfab.loading", lang)}</span>
            </div>
          </div>
        )}
        <iframe
          title={title}
          src={embedUrl}
          className={`h-full w-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Ссылка на Sketchfab */}
      <div className="mt-3 flex justify-center">
        <a
          href={`https://sketchfab.com/3d-models/${sketchfabId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.93 0L1.54 5.86v12.28l10.39 5.86 10.39-5.86V5.86L11.93 0zm0 2.15l7.63 4.3-7.63 4.3-7.63-4.3 7.63-4.3zM3.31 7.77l7.62 4.3v8.17l-7.62-4.3V7.77zm8.62 12.47v-8.17l7.62-4.3v8.17l-7.62 4.3z"/>
          </svg>
          {t("sketchfab.view", lang)}
        </a>
      </div>
    </div>
  );
}
