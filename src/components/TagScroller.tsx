import { useEffect, useRef, useState } from "react";

interface TagScrollerProps {
  tags: string[];
}

export default function TagScroller({ tags }: TagScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [tags]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    const hasHorizontalOverflow = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalOverflow) return;

    const delta =
      Math.abs(event.deltaY) > Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

    if (delta === 0) return;

    event.preventDefault();
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const el = scrollRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-[42vw] min-w-0 sm:ml-auto">
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="hide-scrollbar flex w-full flex-nowrap justify-start gap-2 overflow-x-auto pb-1 sm:justify-end select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="whitespace-nowrap rounded-full border border-neutral-700 bg-neutral-800/50 px-3 py-1 text-xs font-medium text-neutral-300 pointer-events-none"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black via-black/80 to-transparent transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black via-black/80 to-transparent transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
