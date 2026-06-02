import { useState } from "react";

interface MediaItem {
  type: "video" | "image";
  url: string;
  youtubeId?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  onImageClick: (index: number) => void;
}

export default function MediaCarousel({ items, onImageClick }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);

  const total = items.length;

  if (total === 0) {
    return (
      <div className="relative mx-auto max-w-5xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
          <span className="text-neutral-600 text-sm">Нет медиа</span>
        </div>
      </div>
    );
  }

  if (total === 1) {
    const item = items[0];
    return (
      <div className="relative mx-auto max-w-5xl">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
          onClick={() => item.type === "image" && onImageClick(0)}
        >
          {item.type === "video" && item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
              className="h-full w-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={item.url}
              alt="Screenshot"
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}
        </div>
      </div>
    );
  }

  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const offset = getOffset(index);

    if (offset === 0) {
      return {
        transform: `translateX(0%) scale(${isHoveredCenter ? 1.06 : 1})`,
        opacity: 1,
        zIndex: 10,
        pointerEvents: "auto",
      };
    }

    if (offset === -1) {
      const hoverScale = hoveredSide === "left" ? 0.88 : 0.82;
      const hoverOpacity = hoveredSide === "left" ? 0.55 : 0.35;
      return {
        transform: `translateX(-72%) scale(${hoverScale})`,
        opacity: hoverOpacity,
        zIndex: 5,
        pointerEvents: "auto",
      };
    }

    if (offset === 1) {
      const hoverScale = hoveredSide === "right" ? 0.88 : 0.82;
      const hoverOpacity = hoveredSide === "right" ? 0.55 : 0.35;
      return {
        transform: `translateX(72%) scale(${hoverScale})`,
        opacity: hoverOpacity,
        zIndex: 5,
        pointerEvents: "auto",
      };
    }

    const side = offset < 0 ? -1 : 1;
    return {
      transform: `translateX(${side * 120}%) scale(0.7)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  };

  const handleSlideClick = (index: number) => {
    const offset = getOffset(index);
    if (offset === 0) {
      const item = items[currentIndex];
      if (item.type === "image") {
        // Находим реальный индекс изображения (без видео)
        const imageIndex = items.slice(0, currentIndex).filter((i) => i.type === "image").length;
        onImageClick(imageIndex);
      }
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative">
      <div
        className="relative mx-auto overflow-hidden"
        style={{ maxWidth: "100%" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ aspectRatio: "16/7.2" }}
        >
          {items.map((item, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            return (
              <div
                key={index}
                className="absolute cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  width: "72%",
                  ...getSlideStyle(index),
                }}
                onClick={() => handleSlideClick(index)}
                onMouseEnter={() => {
                  if (isCenter) setIsHoveredCenter(true);
                  if (isLeft) setHoveredSide("left");
                  if (isRight) setHoveredSide("right");
                }}
                onMouseLeave={() => {
                  if (isCenter) setIsHoveredCenter(false);
                  if (isLeft || isRight) setHoveredSide(null);
                }}
              >
                <div
                  className={`aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 ${
                    isCenter ? "shadow-2xl shadow-black/60" : ""
                  }`}
                >
                  {item.type === "video" && item.youtubeId ? (
                    <div className="relative h-full w-full">
                      {isCenter ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                          className="h-full w-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                            alt="Video thumbnail"
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={`Screenshot ${index + 1}`}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "w-8 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
            } ${item.type === "video" ? "!bg-red-500/70" : ""} ${
              index === currentIndex && item.type === "video" ? "!bg-red-500" : ""
            }`}
            aria-label={`Go to ${item.type === "video" ? "video" : "slide"} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
