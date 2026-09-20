import { GraduationCap } from "lucide-react";
import { RiCalendarLine } from "@remixicon/react";
import { getEducation } from "@/lib/content";
import type { EducationItem } from "@/lib/types";

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <div className="group relative pb-12 pl-8 last:pb-0">
      <div className="absolute bottom-8 left-[11px] top-0 w-[2px] bg-gray-200 group-last:bottom-8 dark:bg-[#1F1F1F]" />
      <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-[#1F1F1F] dark:bg-[#0A0A0A]">
        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600" />
      </div>

      <div className="flex flex-col gap-4 rounded-md border border-solid border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2 dark:bg-[#1A1A1A]">
              <GraduationCap size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.school}</h2>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{item.degree}</h3>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-solid border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 dark:border-[#1F1F1F] dark:bg-[#151515] dark:text-gray-400">
            <RiCalendarLine size={14} />
            <span>{item.duration}</span>
          </div>
        </div>

        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {item.details.map((detail, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-1.5 text-gray-400 dark:text-gray-600">•</span>
              {detail}
            </li>
          ))}
        </ul>

        {item.skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="rounded-md border border-solid border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-[#1F1F1F] dark:bg-[#1A1A1A] dark:text-gray-300">
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
    <div className="flex w-full flex-col gap-6 bg-white px-8 py-10 transition-colors duration-300 dark:bg-[#0A0A0A]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Education</h1>
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
