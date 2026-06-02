import { useState } from "react";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";
import ContactModal from "./ContactModal";

export default function Header() {
  const { lang, setLang } = useLang();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <header className="relative overflow-hidden border-b border-neutral-800/50">
      {/* Background image — замени /images/header-bg.jpg на своё изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(./images/header-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Language switcher */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:right-8">
          <div className="flex rounded-lg border border-neutral-700/50 bg-black/50 p-0.5 backdrop-blur-md">
            <button
              onClick={() => setLang("ru")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-300 cursor-pointer ${
                lang === "ru"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-300 cursor-pointer ${
                lang === "en"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Logo — замени /images/logo.png на своё изображение */}
            <img
              src="./images/logo.png"
              alt="Logo"
              className="h-32 w-32 flex-shrink-0 rounded-xl object-cover sm:h-48 sm:w-48"
            />

            <div>
              {/* Ник — главный */}
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("header.nickname", lang)}
              </h1>
              {/* Роль — поменьше */}
              <p className="mt-1 text-lg font-semibold tracking-wide text-indigo-400 sm:text-xl">
                {t("header.role", lang)}
              </p>
              {/* Описание */}
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base">
                {t("header.description", lang)}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://steamcommunity.com/id/keam16/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700/50 bg-black/40 text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
              aria-label="Steam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.979 0C5.678 0 .511 4.86.022 10.935l6.432 2.658a3.387 3.387 0 0 1 1.912-.59c.063 0 .125.002.188.006l2.861-4.142V8.77a4.527 4.527 0 0 1 4.524-4.524 4.527 4.527 0 0 1 4.524 4.524 4.527 4.527 0 0 1-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159a3.392 3.392 0 0 1-3.39 3.393 3.396 3.396 0 0 1-3.322-2.723L.453 14.966C1.885 19.965 6.503 23.695 11.979 23.695c6.627 0 12-5.373 12-11.848C23.979 5.22 18.605 0 11.979 0zm-6.62 16.963l-1.46-.604c.326.655.862 1.202 1.558 1.503a2.54 2.54 0 0 0 3.323-3.403l1.515.627a1.863 1.863 0 0 1-1.327.543 1.87 1.87 0 0 1-1.867-1.867c0-.224.04-.438.112-.636l-1.527-.631a2.535 2.535 0 0 0-.327 4.468zm10.58-7.048a3.02 3.02 0 0 0 3.016-3.016 3.02 3.02 0 0 0-3.016-3.016 3.02 3.02 0 0 0-3.016 3.016 3.02 3.02 0 0 0 3.016 3.016zm0-4.527a1.51 1.51 0 0 1 1.508 1.511 1.51 1.51 0 0 1-1.508 1.508 1.51 1.51 0 0 1-1.508-1.508 1.51 1.51 0 0 1 1.508-1.511z"/>
              </svg>
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700/50 bg-black/40 text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
              aria-label="ArtStation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-3.134a2.422 2.422 0 0 0-.496-1.47L15.348 0H10.9a2.42 2.42 0 0 0-2.096 1.21L.528 15.589h5.09L11.9 4.262l5.648 9.788H24v.539zm-2.792 3.134H19.41l-2.793 4.838h5.584a2.423 2.423 0 0 0 2.093-1.21l.614-1.063-2.793-2.565z"/>
              </svg>
            </a>
            <a
              href="https://t.me/keamnatka"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700/50 bg-black/40 text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href="https://vk.com/keamofc"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700/50 bg-black/40 text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
              aria-label="VK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.51-.743.672-1.021.672-.14 0-.344-.162-.344-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.128.836-.406.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.852v-1.966c0-.627.132-.752.574-.752.325 0 .882.162 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.193c.627 0 .94-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.51-.603-1.277-1.253-1.51-1.579-.325-.417-.232-.603 0-.975 0 0 2.672-3.761 2.95-5.04z"/>
              </svg>
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="flex h-10 items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 text-sm font-medium text-indigo-400 backdrop-blur-sm transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/20 hover:text-indigo-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {t("header.contact", lang)}
            </button>
          </div>
        </div>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </header>
  );
}

