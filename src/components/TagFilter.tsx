import { useState, useRef, useEffect } from "react";
import { useLang } from "../i18n/LangContext";
import { t } from "../i18n/translations";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({
  allTags,
  selectedTags,
  onTagsChange,
}: TagFilterProps) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
          selectedTags.length > 0
            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
            : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white"
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
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        {t("filter.tags", lang)}
        {selectedTags.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
            {selectedTags.length}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-neutral-800 bg-neutral-900 p-2 shadow-xl">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {t("filter.tags", lang)}
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                {t("filter.clear", lang)}
              </button>
            )}
          </div>

          {/* Tags list */}
          <div className="max-h-64 overflow-y-auto">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-neutral-600"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
