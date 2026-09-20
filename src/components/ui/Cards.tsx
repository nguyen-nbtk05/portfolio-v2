import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function normalizeTechStack(stack: string[] | string | undefined): string[] {
  if (Array.isArray(stack)) return stack.filter(Boolean);
  if (typeof stack === "string")
    return stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

type CardsProps = {
  title: string;
  description: string;
  techStack?: string[] | string;
  image?: string;
  to?: string;
  liveDemoUrl?: string;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
};

function CardContent({ title, description, techStack, image }: Required<Pick<CardsProps, "title" | "description">> & { techStack: string[]; image?: string }) {
  const visible = techStack.slice(0, 3);
  const rest = techStack.length - visible.length;
  return (
    <>
      {image ? (
        <div className="relative h-48 w-full overflow-hidden rounded-t-md bg-gray-100 dark:bg-gray-800">
          <Image
            src={image}
            alt={`${title} project screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="flex flex-grow flex-col p-4 text-left">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-1 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 p-4 pt-0">
        {visible.map((tech) => (
          <span
            key={tech}
            className="whitespace-nowrap rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
        {rest > 0 && (
          <span className="whitespace-nowrap rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            +{rest}
          </span>
        )}
      </div>
    </>
  );
}

export default function Cards({
  title,
  description,
  techStack,
  image,
  to,
  liveDemoUrl,
  onClick,
  ariaLabel,
  className = "",
}: CardsProps) {
  const stack = normalizeTechStack(techStack);
  const commonClasses = `flex w-full flex-col rounded-md border border-solid border-gray-200 bg-white text-black shadow-sm transition-all hover:border-gray-300 dark:border-[#1F1F1F] dark:bg-[#0A0A0A] dark:text-gray-100 dark:hover:border-gray-600 ${className}`;
  const content: ReactNode = (
    <CardContent title={title} description={description} techStack={stack} image={image} />
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel || `Open details for ${title}`} className={`${commonClasses} text-left`}>
        {content}
      </button>
    );
  }

  if (to) {
    return (
      <Link href={to} aria-label={ariaLabel || title} className={commonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <a href={liveDemoUrl || "#"} target="_blank" rel="noopener noreferrer" className={commonClasses}>
      {content}
    </a>
  );
}
