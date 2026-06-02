import { useState, useMemo } from "react";
import MediaCarousel from "./MediaCarousel";
import Lightbox from "./Lightbox";
import SteamStats from "./SteamStats";
import TagScroller from "./TagScroller";
import AuthorInline from "./AuthorInline";
import ProjectDetailsContent from "./ProjectDetailsContent";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { lang } = useLang();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mediaItems = useMemo(() => {
    const items: { type: "video" | "image"; url: string; youtubeId?: string }[] = [];

    if (project.youtubeId) {
      items.push({
        type: "video",
        url: `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`,
        youtubeId: project.youtubeId,
      });
    }

    project.images.forEach((url) => {
      items.push({ type: "image", url });
    });

    return items;
  }, [project.youtubeId, project.images]);

  const imageUrls = useMemo(
    () => mediaItems.filter((i) => i.type === "image").map((i) => i.url),
    [mediaItems]
  );

  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const dateLocale = t("dateLocale", lang);

  return (
    <>
      <section
        className="relative"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {new Date(project.date).toLocaleDateString(dateLocale, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h2 className="overflow-x-auto whitespace-nowrap text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {project.title[lang]}
              </h2>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-400">
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
            </div>
            <div className="w-full sm:max-w-[48%] sm:pl-6">
              <TagScroller tags={project.tags} />
            </div>
          </div>
        </div>

        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-3 sm:px-6 lg:px-10">
          <MediaCarousel items={mediaItems} onImageClick={openLightbox} />
        </div>

        <div className="mx-auto mt-5 max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-neutral-400 sm:text-base">
            {project.description[lang]}
          </p>

          {project.workshopId && (
            <div className="mt-4">
              <SteamStats workshopId={project.workshopId} />
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && imageUrls.length > 0 && (
        <Lightbox
          images={imageUrls}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          footerContent={<ProjectDetailsContent project={project} />}
        />
      )}
    </>
  );
}
