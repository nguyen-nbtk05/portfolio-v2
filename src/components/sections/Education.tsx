import { GraduationCap } from "lucide-react";
import { RiCalendarLine } from "@remixicon/react";
import { getEducation } from "@/lib/content";
import type { EducationItem } from "@/lib/types";

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <div className="group relative pb-8 pl-6 last:pb-0 sm:pb-12 sm:pl-8">
      <div className="absolute bottom-8 left-[9px] top-0 w-[2px] bg-gray-200 group-last:bottom-8 dark:bg-[#1F1F1F] sm:left-[11px]" />
      <div className="absolute left-0 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-[#1F1F1F] dark:bg-[#0A0A0A] sm:h-6 sm:w-6">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 sm:h-2 sm:w-2" />
      </div>

      <div className="flex min-w-0 flex-col gap-3 rounded-md border border-solid border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-[#1F1F1F] dark:bg-[#0D0D0D] sm:gap-4 sm:p-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
            <div className="shrink-0 rounded-lg bg-gray-100 p-1.5 dark:bg-[#1A1A1A] sm:p-2">
              <GraduationCap size={20} className="h-4 w-4 text-gray-600 dark:text-gray-400 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">{item.school}</h2>
              <h3 className="whitespace-normal text-sm font-semibold text-gray-700 dark:text-gray-300 sm:whitespace-pre-line">{item.degree}</h3>
            </div>
          </div>

          <div className="flex w-fit max-w-full shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-solid border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 dark:border-[#1F1F1F] dark:bg-[#151515] dark:text-gray-400 sm:text-sm">
            <RiCalendarLine size={14} />
            <span>{item.duration}</span>
          </div>
        </div>

        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {item.details.map((detail, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
              {detail}
            </li>
          ))}
        </ul>

        {item.skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="max-w-full rounded-md border border-solid border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-[#1F1F1F] dark:bg-[#1A1A1A] dark:text-gray-300">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const educationData = getEducation();

  return (
    <div className="flex w-full flex-col gap-4 bg-white px-4 py-4 transition-colors duration-300 dark:bg-[#0A0A0A] sm:gap-6 sm:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <h1 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:text-lg">Education</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="max-w-4xl">
        {educationData.map((item) => (
          <EducationCard key={`${item.school}-${item.degree}`} item={item} />
        ))}
      </div>
    </div>
  );
}
