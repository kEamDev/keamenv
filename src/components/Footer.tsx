import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-neutral-800/50 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <span className="text-sm">
              {t("footer.rights", lang)}
            </span>
          </div>
          <p className="text-sm text-neutral-600">
            {t("footer.status", lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
