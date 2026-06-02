import { useState, useMemo } from "react";
import Lightbox from "./Lightbox";
import type { LightboxItem } from "./Lightbox";
import AuthorInline from "./AuthorInline";
import ProjectDetailsContent from "./ProjectDetailsContent";
import { useLang } from "../i18n/LangContext";
import type { Project } from "../data/projects";

interface ProjectTileProps {
  project: Project;
}

export default function ProjectTile({ project }: ProjectTileProps) {
  const { lang } = useLang();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mediaItems: LightboxItem[] = useMemo(() => {
    const items: LightboxItem[] = [];

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

  const thumbnail =
    project.images.length > 0
      ? project.images[0]
      : project.youtubeId
        ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
        : "";

  const totalMedia = mediaItems.length;

  const openLightbox = () => {
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const nextItem = () => {
    setLightboxIndex((prev) => (prev === totalMedia - 1 ? 0 : prev + 1));
  };

  const prevItem = () => {
    setLightboxIndex((prev) => (prev === 0 ? totalMedia - 1 : prev - 1));
  };

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 transition-all duration-500"
        onClick={openLightbox}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={thumbnail}
            alt={project.title[lang]}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            draggable={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          {project.youtubeId && (
            <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          )}

          {totalMedia > 1 && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-neutral-300 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              {totalMedia}
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <h3 className="text-sm font-bold text-white sm:text-base line-clamp-1">
              {project.title[lang]}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
              {project.creators.slice(0, 3).map((creator, i) => (
                <span key={i} className="inline-flex items-center">
                  {i > 0 && <span className="mr-2 text-neutral-600">•</span>}
                  <AuthorInline
                    name={creator.name}
                    url={creator.url}
                    avatar={creator.avatar}
                    compact
                  />
                </span>
              ))}
              {project.creators.length > 3 && (
                <span className="text-neutral-600">+{project.creators.length - 3}</span>
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-700/50 bg-neutral-800/60 px-2 py-0.5 text-[10px] font-medium text-neutral-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="rounded-full bg-neutral-800/60 px-2 py-0.5 text-[10px] text-neutral-500">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && mediaItems.length > 0 && (
        <Lightbox
          items={mediaItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={nextItem}
          onPrev={prevItem}
          footerContent={<ProjectDetailsContent project={project} />}
        />
      )}
    </>
  );
}
