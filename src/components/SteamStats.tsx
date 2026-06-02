import { useSteamStats } from "../hooks/useSteamStats";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

interface SteamStatsProps {
  workshopId?: string;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toLocaleString();
}

export default function SteamStats({ workshopId }: SteamStatsProps) {
  const { lang } = useLang();
  const { currentSubscribers, favorites, views, loading, error, retry } =
    useSteamStats(workshopId);

  if (!workshopId) return null;

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <a
        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${workshopId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
        title={t("steam.openWorkshop", lang)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.979 0C5.678 0 .511 4.86.022 10.935l6.432 2.658a3.387 3.387 0 0 1 1.912-.59c.063 0 .125.002.188.006l2.861-4.142V8.77a4.527 4.527 0 0 1 4.524-4.524 4.527 4.527 0 0 1 4.524 4.524 4.527 4.527 0 0 1-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159a3.392 3.392 0 0 1-3.39 3.393 3.396 3.396 0 0 1-3.322-2.723L.453 14.966C1.885 19.965 6.503 23.695 11.979 23.695c6.627 0 12-5.373 12-11.848C23.979 5.22 18.605 0 11.979 0zm-6.62 16.963l-1.46-.604c.326.655.862 1.202 1.558 1.503a2.54 2.54 0 0 0 3.323-3.403l1.515.627a1.863 1.863 0 0 1-1.327.543 1.87 1.87 0 0 1-1.867-1.867c0-.224.04-.438.112-.636l-1.527-.631a2.535 2.535 0 0 0-.327 4.468zm10.58-7.048a3.02 3.02 0 0 0 3.016-3.016 3.02 3.02 0 0 0-3.016-3.016 3.02 3.02 0 0 0-3.016 3.016 3.02 3.02 0 0 0 3.016 3.016zm0-4.527a1.51 1.51 0 0 1 1.508 1.511 1.51 1.51 0 0 1-1.508 1.508 1.51 1.51 0 0 1-1.508-1.508 1.51 1.51 0 0 1 1.508-1.511z"/>
        </svg>
        {t("steam.workshop", lang)}
      </a>

      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
          <span className="text-xs text-neutral-500">{t("steam.loading", lang)}</span>
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400" title="Current Subscribers">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="font-semibold text-green-400">{formatNumber(currentSubscribers)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-semibold text-yellow-400">{formatNumber(favorites)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400" title="Views">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-semibold text-blue-400">{formatNumber(views)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
