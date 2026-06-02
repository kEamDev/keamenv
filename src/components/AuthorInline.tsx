interface AuthorInlineProps {
  name: string;
  url: string;
  avatar?: string;
  role?: string;
  compact?: boolean;
}

export default function AuthorInline({
  name,
  url,
  avatar,
  role,
  compact = false,
}: AuthorInlineProps) {
  const avatarSize = compact ? "h-4 w-4" : "h-5 w-5";
  const textSize = compact ? "text-[11px]" : "text-sm";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/name relative inline-flex items-center gap-1.5 text-neutral-300 transition-all duration-300 hover:text-white hover:scale-105 origin-left ${textSize}`}
    >
      <img
        src={avatar || "/images/avatar-placeholder.svg"}
        alt={name}
        className={`${avatarSize} rounded-full object-cover ring-1 ring-neutral-700/70`}
        loading="lazy"
      />
      <span>{name}</span>
      {role ? (
        <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-neutral-700/50 bg-neutral-800 px-2.5 py-1 text-[10px] font-medium text-neutral-300 opacity-0 shadow-lg transition-all duration-300 group-hover/name:mt-1 group-hover/name:opacity-100">
          {role}
        </span>
      ) : null}
    </a>
  );
}
