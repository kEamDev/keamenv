import SketchfabEmbed from "./SketchfabEmbed";
import SketchfabStats from "./SketchfabStats";
import TagScroller from "./TagScroller";
import AuthorInline from "./AuthorInline";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";
import type { Model3D } from "../data/models";

interface ModelCardProps {
  model: Model3D;
  index: number;
}

export default function ModelCard({ model, index }: ModelCardProps) {
  const { lang } = useLang();
  const dateLocale = t("dateLocale", lang);

  return (
    <section
      className="relative"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Model Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {new Date(model.date).toLocaleDateString(dateLocale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <h2 className="overflow-x-auto whitespace-nowrap text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {model.title[lang]}
            </h2>

            {/* Creators */}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-400">
              {model.creators.map((creator, i) => (
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
          </div>
          <div className="w-full sm:max-w-[48%] sm:pl-6">
            <TagScroller tags={model.tags} />
          </div>
        </div>
      </div>

      {/* Sketchfab Embed */}
      <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-3 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <SketchfabEmbed sketchfabId={model.sketchfabId} title={model.title[lang]} />
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Description */}
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-neutral-400 sm:text-base">
          {model.description[lang]}
        </p>

        {/* Sketchfab Stats */}
        <div className="mt-4">
          <SketchfabStats sketchfabId={model.sketchfabId} />
        </div>
      </div>
    </section>
  );
}
