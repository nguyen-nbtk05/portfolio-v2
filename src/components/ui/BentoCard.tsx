import Image from "next/image";
import type { ReactNode } from "react";

type BentoCardProps = {
  children?: ReactNode;
  className?: string;
  title: string;
  description: string;
  header?: ReactNode;
  image?: string;
  imageAlt?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function BentoCard({ children, className = "", title, description, header, image, imageAlt, href, onClick, ariaLabel }: BentoCardProps) {
  const CardContent = (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {children || header || image ? (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-[#151515] sm:h-52">
          {children ||
            header ||
            (image ? (
              <Image
                src={image}
                alt={imageAlt || `${title} cover`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : null)}
        </div>
      ) : null}

      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-500 dark:text-white">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );

  const baseStyles =
    "group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-[#1F1F1F] dark:bg-[#0A0A0A] dark:hover:border-gray-800";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${className}`}>
        {CardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel || title} className={`${baseStyles} ${className}`}>
        {CardContent}
      </button>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{CardContent}</div>;
}
