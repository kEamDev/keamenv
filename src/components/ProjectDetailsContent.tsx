import AuthorInline from "./AuthorInline";
import SteamStats from "./SteamStats";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";
import type { Project } from "../data/projects";

interface ProjectDetailsContentProps {
  project: Project;
}

export default function ProjectDetailsContent({
  project,
}: ProjectDetailsContentProps) {
  const { lang } = useLang();
  const dateLocale = t("dateLocale", lang);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 backdrop-blur-sm sm:p-6">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {new Date(project.date).toLocaleDateString(dateLocale, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {project.title[lang]}
      </h2>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-neutral-400">
        {project.creators.map((creator, i) => (
          <span key={i} className="inline-flex items-center">
            {i > 0 && <span className="mr-2 text-neutral-600">•</span>}
            <AuthorInline
              name={creator.name}
              url={creator.url}
              avatar={creator.avatar}
              role={creator.role[lang]}
            />
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="whitespace-nowrap rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-xs font-medium text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-base">
        {project.description[lang]}
      </p>

      {project.workshopId && (
        <div className="mt-5 flex justify-start">
          <SteamStats workshopId={project.workshopId} />
        </div>
      )}
    </div>
  );
}
