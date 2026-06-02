import { useState, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import ProjectTile from "./components/ProjectTile";
import ModelCard from "./components/ModelCard";
import ModelTile from "./components/ModelTile";
import TagFilter from "./components/TagFilter";
import { projects, getAllTags } from "./data/projects";
import { models } from "./data/models";
import { useAllSteamStats } from "./hooks/useSteamStats";
import { useAllSketchfabStats } from "./hooks/useSketchfabStats";
import { LangProvider, useLang } from "./i18n/LangContext";
import { t } from "./i18n/translations";

type Tab = "levels" | "models";
type ViewMode = "list" | "grid";
type SortMode = "date" | "subscribers" | "likes";
type SortDir = "asc" | "desc";

function AppContent() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("levels");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("subscribers");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => getAllTags(), []);

  // Получаем все теги моделей
  const allModelTags = useMemo(() => {
    const tagsSet = new Set<string>();
    models.forEach((m) => m.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).sort();
  }, []);

  const handleSort = (mode: SortMode) => {
    if (sortMode === mode) {
      setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortMode(mode);
      setSortDir("desc");
    }
  };

  // Steam stats
  const workshopIds = useMemo(
    () => projects.map((p) => p.workshopId),
    []
  );
  const allSteamStats = useAllSteamStats(workshopIds);
  const steamStatsLoading = Object.values(allSteamStats).some((s) => s.loading);

  // Sketchfab stats
  const sketchfabIds = useMemo(
    () => models.map((m) => m.sketchfabId),
    []
  );
  const allSketchfabStats = useAllSketchfabStats(sketchfabIds);
  const sketchfabStatsLoading = Object.values(allSketchfabStats).some(
    (s) => s.loading
  );

  // Фильтрация и сортировка проектов
  const sortedProjects = useMemo(() => {
    let filtered = [...projects];

    // Фильтруем по тегам
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTags.every((tag) => p.tags.includes(tag))
      );
    }

    const dir = sortDir === "desc" ? 1 : -1;

    if (sortMode === "date") {
      filtered.sort(
        (a, b) =>
          dir * (new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } else if (sortMode === "subscribers") {
      filtered.sort((a, b) => {
        const subsA = a.workshopId
          ? allSteamStats[a.workshopId]?.currentSubscribers ?? 0
          : 0;
        const subsB = b.workshopId
          ? allSteamStats[b.workshopId]?.currentSubscribers ?? 0
          : 0;
        return dir * (subsB - subsA);
      });
    }

    return filtered;
  }, [sortMode, sortDir, allSteamStats, selectedTags]);

  // Фильтрация и сортировка моделей
  const sortedModels = useMemo(() => {
    let filtered = [...models];

    // Фильтруем по тегам
    if (selectedTags.length > 0) {
      filtered = filtered.filter((m) =>
        selectedTags.every((tag) => m.tags.includes(tag))
      );
    }

    const dir = sortDir === "desc" ? 1 : -1;

    if (sortMode === "date") {
      filtered.sort(
        (a, b) =>
          dir * (new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } else if (sortMode === "likes") {
      filtered.sort((a, b) => {
        const likesA = allSketchfabStats[a.sketchfabId]?.likeCount ?? 0;
        const likesB = allSketchfabStats[b.sketchfabId]?.likeCount ?? 0;
        return dir * (likesB - likesA);
      });
    }

    return filtered;
  }, [sortMode, sortDir, allSketchfabStats, selectedTags]);

  const ArrowIcon = ({
    active,
    direction,
  }: {
    active: boolean;
    direction: SortDir;
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${
        active && direction === "asc" ? "rotate-180" : ""
      } ${active ? "opacity-100" : "opacity-0"}`}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );

  // Сбрасываем теги при смене вкладки и ставим дефолтную сортировку для типа контента
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedTags([]);
    setSortDir("desc");

    if (tab === "levels") {
      setSortMode("subscribers");
    } else {
      setSortMode("likes");
    }
  };

  const currentTags = activeTab === "levels" ? allTags : allModelTags;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="py-16 sm:py-24">
        {/* Tabs + Sort + Filter */}
        <div className="mx-auto mb-12 max-w-6xl px-4 sm:mb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs + View Mode */}
            <div className="flex items-center gap-3">
              {/* Tabs */}
              <div className="flex rounded-lg border border-neutral-800 bg-neutral-900/50 p-0.5">
                <button
                  onClick={() => handleTabChange("levels")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === "levels"
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                  {t("tab.levels", lang)}
                </button>
                <button
                  onClick={() => handleTabChange("models")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === "models"
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  {t("tab.models", lang)}
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-neutral-800 bg-neutral-900/50 p-0.5">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title={t("view.list", lang)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title={t("view.grid", lang)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sort + Filter */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tag Filter */}
              <TagFilter
                allTags={currentTags}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
              />

              {/* Sort */}
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                {t("sort.label", lang)}
              </span>
              <div className="flex rounded-lg border border-neutral-800 bg-neutral-900/50 p-0.5">
                <button
                  onClick={() => handleSort("date")}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    sortMode === "date"
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {t("sort.date", lang)}
                  <ArrowIcon active={sortMode === "date"} direction={sortDir} />
                </button>

                {activeTab === "levels" && (
                  <button
                    onClick={() => handleSort("subscribers")}
                    className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                      sortMode === "subscribers"
                        ? "bg-white text-black shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {t("sort.subscribers", lang)}
                    <ArrowIcon
                      active={sortMode === "subscribers"}
                      direction={sortDir}
                    />
                    {steamStatsLoading && (
                      <div className="h-2.5 w-2.5 animate-spin rounded-full border border-current border-t-transparent" />
                    )}
                  </button>
                )}

                {activeTab === "models" && (
                  <button
                    onClick={() => handleSort("likes")}
                    className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                      sortMode === "likes"
                        ? "bg-white text-black shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {t("sort.likes", lang)}
                    <ArrowIcon
                      active={sortMode === "likes"}
                      direction={sortDir}
                    />
                    {sketchfabStatsLoading && (
                      <div className="h-2.5 w-2.5 animate-spin rounded-full border border-current border-t-transparent" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "list" ? (
          <div className="flex flex-col gap-20 sm:gap-28">
            {activeTab === "levels" && sortedProjects.length === 0 && (
              <div className="mx-auto max-w-6xl px-4 text-center">
                <p className="text-neutral-500">
                  {lang === "ru"
                    ? "Нет проектов с выбранными тегами"
                    : "No projects with selected tags"}
                </p>
              </div>
            )}
            {activeTab === "levels" &&
              sortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}

            {activeTab === "models" && sortedModels.length === 0 && (
              <div className="mx-auto max-w-6xl px-4 text-center">
                <p className="text-neutral-500">
                  {lang === "ru"
                    ? "Нет моделей с выбранными тегами"
                    : "No models with selected tags"}
                </p>
              </div>
            )}
            {activeTab === "models" &&
              sortedModels.map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} />
              ))}
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {activeTab === "levels" && sortedProjects.length === 0 && (
              <p className="text-center text-neutral-500">
                {lang === "ru"
                  ? "Нет проектов с выбранными тегами"
                  : "No projects with selected tags"}
              </p>
            )}
            {activeTab === "levels" && sortedProjects.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProjects.map((project) => (
                  <ProjectTile key={project.id} project={project} />
                ))}
              </div>
            )}

            {activeTab === "models" && sortedModels.length === 0 && (
              <p className="text-center text-neutral-500">
                {lang === "ru"
                  ? "Нет моделей с выбранными тегами"
                  : "No models with selected tags"}
              </p>
            )}
            {activeTab === "models" && sortedModels.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedModels.map((model) => (
                  <ModelTile key={model.id} model={model} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}
