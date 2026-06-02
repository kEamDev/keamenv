import { useEffect, useState, useCallback } from "react";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

interface ContactModalProps {
  onClose: () => void;
}

const contacts = [
  {
    id: "email",
    label: "Email",
    value: "kEamofc@gmail.com",
    href: "mailto:kEamofc@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@kEamofc",
    href: "https://t.me/kEamofc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: "text-sky-400",
    hoverBorder: "hover:border-sky-500/50",
  },
  {
    id: "vk",
    label: "ВКонтакте",
    value: "vk.com/keamofc",
    href: "https://vk.com/keamofc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.51-.743.672-1.021.672-.14 0-.344-.162-.344-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.128.836-.406.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.852v-1.966c0-.627.132-.752.574-.752.325 0 .882.162 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.193c.627 0 .94-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.51-.603-1.277-1.253-1.51-1.579-.325-.417-.232-.603 0-.975 0 0 2.672-3.761 2.95-5.04z"/>
      </svg>
    ),
    color: "text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
  },
];

export default function ContactModal({ onClose }: ContactModalProps) {
  const { lang } = useLang();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="mb-5 text-lg font-bold text-white">
          {t("contact.title", lang)}
        </h2>

        {/* Contact list */}
        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-800/30 px-4 py-3 transition-colors ${contact.hoverBorder}`}
            >
              {/* Icon */}
              <span className={`flex-shrink-0 ${contact.color}`}>
                {contact.icon}
              </span>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                  {contact.label}
                </span>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-sm font-medium text-neutral-200 transition-colors hover:text-white"
                >
                  {contact.value}
                </a>
              </div>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(contact.id, contact.value)}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-700 hover:text-white cursor-pointer"
                title={copiedId === contact.id ? t("contact.copy", lang) : "Copy"}
              >
                {copiedId === contact.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
