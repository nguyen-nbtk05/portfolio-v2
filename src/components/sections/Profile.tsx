import Image from "next/image";
import {
  RiFacebookCircleFill,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { Mail } from "lucide-react";
import { getProfile } from "@/lib/content";
import Magnetic from "../ui/Magnetic";
import { ArrowToMeDoodle, ResumeHighlightDoodle, UnderlineDoodle } from "./Doodles";

const brandStyles: Record<string, string> = {
  "Networking": "hover:bg-[#61dafb]/10 hover:text-[#61dafb] hover:border-[#61dafb]/40 dark:hover:border-[#61dafb]/60 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]",
  Cybersecurity: "hover:bg-[#e91e63]/10 hover:text-[#e91e63] hover:border-[#e91e63]/40 dark:hover:border-[#e91e63]/60 hover:shadow-[0_0_12px_rgba(233,30,99,0.2)]",
  "Linux systems": "hover:bg-[#6db33f]/10 hover:text-[#6db33f] hover:border-[#6db33f]/40 dark:hover:border-[#6db33f]/60 hover:shadow-[0_0_12px_rgba(109,179,63,0.2)]",
  Python: "hover:bg-[#3776ab]/10 hover:text-[#3776ab] hover:border-[#3776ab]/40 dark:hover:border-[#3776ab]/60 hover:shadow-[0_0_12px_rgba(55,118,171,0.2)]",
  Linux: "hover:bg-[#dd4814]/10 hover:text-[#dd4814] hover:border-[#dd4814]/40 dark:hover:border-[#dd4814]/60 hover:shadow-[0_0_12px_rgba(221,72,20,0.2)]",
  Rust: "hover:bg-[#f89820]/10 hover:text-[#f89820] hover:border-[#f89820]/40 dark:hover:border-[#f89820]/60 hover:shadow-[0_0_12px_rgba(248,152,32,0.2)]",
  "Network Programming": "hover:bg-[#10b981]/10 hover:text-[#10b981] hover:border-[#10b981]/40 dark:hover:border-[#10b981]/60 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  Resume: "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/40 dark:hover:border-pink-500/60 hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]",
};

function TechBadge({ text }: { text: string }) {
  const hoverStyle =
    brandStyles[text] ||
    "hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
  return (
    <span
      className={`mx-1 inline-flex cursor-pointer items-center rounded border-2 border-dotted border-gray-200 bg-gray-100 px-2 py-0.5 align-baseline text-base font-medium text-gray-800 transition-all duration-300 ease-out dark:border-solid dark:border-[#1F1F1F] dark:bg-transparent dark:text-gray-200 ${hoverStyle}`}
    >
      {text}
    </span>
  );
}

export function ConnectSection({ className = "" }: { className?: string }) {
  const profile = getProfile();
  const s = profile.social;
  const linkCls = "block transition-all duration-300 hover:scale-105";

  return (
    <div className={`mt-10 ${className}`}>
      <div className="flex flex-wrap items-center gap-4">
        <Magnetic>
          <a href={`mailto:${profile.email}`} className={`text-[#EA4335] ${linkCls}`} aria-label="Gmail">
            <Mail size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a href={s.github} target="_blank" rel="noopener noreferrer" className={`text-black dark:text-white ${linkCls}`} aria-label="GitHub">
            <RiGithubLine size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className={`text-[#0077b5] ${linkCls}`} aria-label="LinkedIn">
            <RiLinkedinLine size={28} />
          </a>
        </Magnetic>
        <Magnetic>
          <a href={s.twitter} target="_blank" rel="noopener noreferrer" className={`text-black dark:text-white ${linkCls}`} aria-label="X">
            <RiTwitterXLine size={28} />
          </a>
        </Magnetic>
        {s.facebook && (
          <Magnetic>
            <a href={s.facebook} target="_blank" rel="noopener noreferrer" className={`text-[#1877F2] ${linkCls}`} aria-label="Facebook">
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

  return (
    <div className="relative flex h-full flex-col justify-center overflow-visible p-8 text-gray-900 dark:text-gray-100 md:pt-0 lg:pl-16">
      <div className="flex-grow flex flex-col justify-center">
        <div className="group relative mb-6 w-fit">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={160}
            height={160}
            priority
            className="pointer-events-none relative z-10 h-40 w-40 select-none rounded-full border-4 border-pink-400 object-cover"
          />
          <div className="pointer-events-none absolute left-[150px] top-[10px] z-20">
            <ArrowToMeDoodle />
          </div>
        </div>

        <div className="text-left">
          <div className="relative mb-6 w-fit">
            <h1 className="pb-1 text-4xl font-bold tracking-tight">{profile.name}</h1>
            <div className="pointer-events-none absolute bottom-[-16px] left-0 z-10 w-full">
              <UnderlineDoodle />
            </div>
          </div>

          <div className="mt-4 max-w-lg text-lg leading-loose text-gray-600 dark:text-gray-300">
            <p className="mb-2 whitespace-pre-line text-lg font-semibold text-black dark:text-white">{profile.role}</p>
            <p>
              Exploring 
              <TechBadge text="Networking" />
              &amp;
              <TechBadge text="Cybersecurity" />
              <br />
              Developing with 
              <TechBadge text="Python" />
              &amp; 
              <TechBadge text="Linux" />
              <br />
              Diving into 
              <TechBadge text="Rust" />
              &amp;
              <TechBadge text="Network Programming" />
            </p>
          </div>
        </div>
      </div>

      <div className="group relative mt-16 w-fit sm:mt-0">
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="relative z-10">
          <TechBadge text="Resume" />
        </a>
        <ResumeHighlightDoodle />
      </div>

      <ConnectSection />
    </div>
  );
}
