import { useSketchfabStats } from "../hooks/useSketchfabStats";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

interface SketchfabStatsProps {
  sketchfabId?: string;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toLocaleString();
}

export default function SketchfabStats({ sketchfabId }: SketchfabStatsProps) {
  const { lang } = useLang();
  const {
    viewCount,
    likeCount,
    commentCount,
    faceCount,
    vertexCount,
    loading,
    error,
    retry,
  } = useSketchfabStats(sketchfabId);

  if (!sketchfabId) return null;

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <a
        href={`https://sketchfab.com/3d-models/${sketchfabId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
        title={t("sketchfab.view", lang)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.93 0L1.54 5.86v12.28l10.39 5.86 10.39-5.86V5.86L11.93 0zm0 2.15l7.63 4.3-7.63 4.3-7.63-4.3 7.63-4.3zM3.31 7.77l7.62 4.3v8.17l-7.62-4.3V7.77zm8.62 12.47v-8.17l7.62-4.3v8.17l-7.62 4.3z"/>
        </svg>
        Sketchfab
      </a>

      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
          <span className="text-xs text-neutral-500">{t("sketchfab.loading", lang)}</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-600">{t("steam.unavailable", lang)}</span>
          <button
            onClick={retry}
            className="rounded-md border border-neutral-700 bg-neutral-800/60 px-2.5 py-1 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white cursor-pointer"
          >
            {t("stats.retry", lang)}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400" title="Views">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-semibold text-blue-400">{formatNumber(viewCount)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Likes">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="font-semibold text-red-400">{formatNumber(likeCount)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Comments">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="font-semibold text-green-400">{formatNumber(commentCount)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Triangles">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 19 9-15 9 15H3Z" />
            </svg>
            <span className="font-semibold text-violet-400">{formatNumber(faceCount)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Vertices">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="5" cy="19" r="1.5" />
              <circle cx="19" cy="19" r="1.5" />
              <path d="M12 6.5 6.3 17.5" />
              <path d="M12 6.5 17.7 17.5" />
              <path d="M6.5 18h11" />
            </svg>
            <span className="font-semibold text-cyan-400">{formatNumber(vertexCount)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
