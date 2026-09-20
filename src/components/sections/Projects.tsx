"use client";

import { useState } from "react";
import Image from "next/image";
import { RiExternalLinkLine, RiGithubLine } from "@remixicon/react";
import type { Project } from "@/lib/types";
import Cards, { normalizeTechStack } from "../ui/Cards";
import Modal from "../ui/Modal";

export default function Projects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (projects.length === 0) return <div className="px-8 py-20">No projects yet.</div>;

  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  const stack = selectedProject ? normalizeTechStack(selectedProject.techStack) : [];
  const featuresList = selectedProject?.features ?? [];

  return (
    <div className="flex w-full flex-col gap-2 px-8 py-16 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 text-lg">Recent Projects</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
        {displayedProjects.map((project) => (
          <Cards
            key={project.slug}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            image={project.image}
            onClick={() => setSelectedProject(project)}
            ariaLabel={`Open details for ${project.title}`}
          />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md dark:border-[#2A2A2A] dark:bg-[#0A0A0A] dark:text-gray-200 dark:hover:border-[#444444] dark:hover:bg-[#141414]"
          >
            <span>{showAll ? "Show Less" : `Show More (${projects.length - 4} more)`}</span>
            <svg className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {selectedProject && (
        <Modal label={`${selectedProject.title} details`} onClose={() => setSelectedProject(null)}>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
            {selectedProject.image ? (
              <div className="flex min-h-[260px] items-center justify-center bg-gray-50 p-4 dark:bg-[#050505] md:min-h-0 md:w-1/2">
                <div className="relative max-h-[60vh] min-h-[240px] w-full md:max-h-[70vh]">
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="rounded-xl border border-gray-200 object-cover dark:border-[#1F1F1F]"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            <div className={`relative flex min-h-0 flex-col p-6 md:overflow-y-auto md:p-8 ${selectedProject.image ? "md:w-1/2" : ""}`}>
              <h3 className="pr-16 text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
              <p className="mt-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{selectedProject.description}</p>

              {(selectedProject.githubUrl || selectedProject.liveDemoUrl) && (
                <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-400 hover:bg-gray-100 dark:border-[#2A2A2A] dark:text-gray-100 dark:hover:border-[#3A3A3A] dark:hover:bg-[#141414]"
                    >
                      <RiGithubLine size={18} />
                      GitHub Repo
                    </a>
                  )}
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                    >
                      <RiExternalLinkLine size={18} />
                      Open Live Demo
                    </a>
                  )}
                </div>
              )}

              {stack.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((t) => (
                      <span key={t} className="rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm dark:border-white/5 dark:bg-[#151515] dark:text-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {featuresList.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Key Features</h4>
                  <ul className="space-y-2.5">
                    {featuresList.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                        <span className="mt-1 flex-shrink-0 text-[10px] text-blue-500">✦</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
