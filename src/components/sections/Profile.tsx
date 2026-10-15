import Image from "next/image";
import {
  RiFacebookCircleFill,
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { Mail } from "lucide-react";
import { getProfile } from "@/lib/content";
import Magnetic from "../ui/Magnetic";
import {
  ArrowToMeDoodle,
  ResumeHighlightDoodle,
  UnderlineDoodle,
} from "./Doodles";

const brandStyles: Record<string, string> = {
  Networking:
    "hover:bg-[#61dafb]/10 hover:text-[#61dafb] hover:border-[#61dafb]/40 dark:hover:border-[#61dafb]/60 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]",
  Cybersecurity:
    "hover:bg-[#e91e63]/10 hover:text-[#e91e63] hover:border-[#e91e63]/40 dark:hover:border-[#e91e63]/60 hover:shadow-[0_0_12px_rgba(233,30,99,0.2)]",
  "Linux systems":
    "hover:bg-[#f0d90a]/10 hover:text-[#f0d90a] hover:border-[#f0d90a]/40 dark:hover:border-[#f0d90a]/60 hover:shadow-[0_0_12px_rgba(240,217,10,0.2)]",
  Resume:
    "hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/40 dark:hover:border-orange-500/60 hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]",
};

function TechBadge({ text }: { text: string }) {
  const hoverStyle =
    brandStyles[text] ||
    "hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
  return (
    <span
      className={`mr-0.5 inline-flex cursor-pointer items-center whitespace-nowrap rounded border-2 border-dotted border-gray-200 bg-gray-100 px-1.5 py-0.5 align-baseline text-sm font-medium text-gray-800 transition-all duration-300 ease-out dark:border-solid dark:border-[#1F1F1F] dark:bg-transparent dark:text-gray-200 sm:mr-1 sm:px-2 sm:text-base ${hoverStyle}`}
    >
      {text}
    </span>
  );
}

export function ConnectSection({ className = "" }: { className?: string }) {
  const profile = getProfile();
  const s = profile.social;
  const linkCls = "flex min-h-11 min-w-11 items-center justify-center transition-all duration-300 hover:scale-105 sm:block sm:min-h-0 sm:min-w-0 [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-7 sm:[&>svg]:w-7";

  return (
    <div className={`mt-6 sm:mt-10 ${className}`}>
      <div className="-ml-2 flex flex-wrap items-center gap-1 sm:ml-0 sm:gap-4">
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className={`text-[#EA4335] ${linkCls}`}
            aria-label="Gmail"
          >
            <Mail size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={s.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-black dark:text-white ${linkCls}`}
            aria-label="GitHub"
          >
            <RiGithubLine size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={s.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#0077b5] ${linkCls}`}
            aria-label="LinkedIn"
          >
            <RiLinkedinLine size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={s.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-black dark:text-white ${linkCls}`}
            aria-label="X"
          >
            <RiTwitterXLine size={28} />
          </a>
        </Magnetic>
        {s.facebook && (
          <Magnetic>
            <a
              href={s.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#1877F2] ${linkCls}`}
              aria-label="Facebook"
            >
              <RiFacebookCircleFill size={28} />
            </a>
          </Magnetic>
        )}
      </div>
    </div>
  );
}

export default function Profile() {
  const profile = getProfile();
  const nameWords = profile.name.trim().split(/\s+/);
  const firstNameGroup = nameWords.slice(0, 3).join(" ");
  const secondNameGroup = nameWords.slice(3).join(" ");

  return (
    <div className="relative flex h-full flex-col justify-center overflow-visible px-6 pb-6 pt-0 text-gray-900 dark:text-gray-100 sm:px-8 sm:pb-8 lg:pl-16">
      <div className="flex-grow flex flex-col justify-center">
        <div className="group relative mb-6 w-fit sm:mb-2">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={160}
            height={160}
            priority
            className="pointer-events-none relative z-10 h-36 w-36 select-none rounded-full border-4 border-yellow-400 object-cover sm:h-40 sm:w-40"
          />
          <div className="pointer-events-none absolute left-[132px] top-[10px] z-20 scale-90 origin-top-left sm:left-[150px] sm:scale-100">
            <ArrowToMeDoodle />
          </div>
        </div>

        <div className="text-left">
          <div className="relative mb-4 w-fit">
            <h1 className="flex flex-wrap gap-x-[0.25em] gap-y-3 pb-1 text-[clamp(2rem,11.5vw,2.75rem)] font-bold leading-[1.2] tracking-tight sm:gap-y-5 sm:text-[2.4rem] sm:leading-normal">
              <span className="relative max-w-full whitespace-nowrap">
                {firstNameGroup}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 left-0 z-10 w-full [&>span]:py-0 [&_svg]:h-4 sm:bottom-[-18px] sm:[&>span]:py-1 sm:[&_svg]:h-5"
                >
                  <UnderlineDoodle className="stroke-blue-500 dark:stroke-blue-400" />
                </span>
              </span>{" "}
              {secondNameGroup && (
                <span className="relative max-w-full whitespace-nowrap">
                  {secondNameGroup}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-3 left-0 z-10 w-full [&>span]:py-0 [&_svg]:h-4 sm:bottom-[-18px] sm:[&>span]:py-1 sm:[&_svg]:h-5"
                  >
                    <UnderlineDoodle />
                  </span>
                </span>
              )}
            </h1>
          </div>

          <div className="mt-5 text-gray-600 dark:text-gray-300 sm:mt-4">
            <p className="whitespace-pre-line text-xl font-semibold leading-7 text-black dark:text-white">
              {profile.role}
            </p>
          </div>
          <div>
            <p className="mt-4 whitespace-pre-line text-base font-semibold text-black dark:text-white sm:text-lg">
              Who am I?
            </p>
            <p className="mt-1 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-relaxed">
              An individual with a strong technical inclination and a deep interest in{" "}
              <TechBadge text="Linux systems" />,{" "}
              <TechBadge text="Networking" />and{" "}
              <TechBadge text="Cybersecurity" />, combining academic training
              with hands-on practice to build secure, resilient systems.
            </p>
          </div>
        </div>
      </div>

      <div className="group relative mt-12 w-fit lg:mt-0">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex min-h-11 items-center sm:min-h-0"
        >
          <TechBadge text="Resume" />
        </a>
        <ResumeHighlightDoodle />
      </div>

      <ConnectSection />
    </div>
  );
}
