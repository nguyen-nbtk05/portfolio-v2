"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  RiBriefcaseLine,
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiSparklingLine,
} from "@remixicon/react";
import type { Project } from "@/lib/types";
import { normalizeTechStack } from "../ui/Cards";
import Magnetic from "../ui/Magnetic";
import Modal from "../ui/Modal";
import { skillsData, type Skill } from "@/data/skills";

const categoryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function SkillCard({ name, icon, iconDark, onClick }: { name: string; icon: string; iconDark?: string; onClick: () => void }) {
  return (
    <motion.div
      variants={skillVariants}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      viewport={{ once: true }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${name}`}
      className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-md border border-solid border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
    >
      <motion.img
        src={icon}
        alt={`${name} logo`}
        className={`h-6 w-6 object-contain ${iconDark ? "dark:hidden" : ""}`}
        whileHover={{ rotate: 6, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />
      {iconDark ? (
        <motion.img
          src={iconDark}
          alt={`${name} logo`}
          className="hidden h-6 w-6 object-contain dark:block"
          whileHover={{ rotate: 6, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
      ) : null}
      <span className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
        {name}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/5" />
    </motion.div>
  );
}

function getRelatedProjects(projects: Project[], skillName: string): Project[] {
  const skillLower = skillName.toLowerCase().trim();
  return projects.filter((project) => {
    const stackList = normalizeTechStack(project.techStack).map((s) => s.toLowerCase().trim());
    if (stackList.length === 0) return false;
    return stackList.some((tech) => {
      if (tech === skillLower) return true;
      if (skillLower === "javascript" && (tech === "js" || tech.includes("javascript"))) return true;
      if (skillLower === "react.js" && tech.includes("react")) return true;
      if (skillLower === "spring boot" && tech.includes("spring")) return true;
      if (skillLower === "postgresql" && tech.includes("postgres")) return true;
      if (skillLower === "html5" && tech.includes("html")) return true;
      if (skillLower === "css3" && tech.includes("css")) return true;
      if (tech.includes(skillLower)) {
        if (skillLower === "java" && tech.includes("javascript")) return false;
        return true;
      }
      if (skillLower.includes(tech)) {
        if (tech === "java" && skillLower.includes("javascript")) return false;
        return true;
      }
      return false;
    });
  });
}

export default function Skills({ projects }: { projects: Project[] }) {
  const [selectedSkill, setSelectedSkill] = useState<(Skill & { category: string }) | null>(null);
  const activeRelatedProjects = selectedSkill ? getRelatedProjects(projects, selectedSkill.name) : [];

  return (
    <div className="flex w-full flex-col gap-8 bg-white px-8 pb-10 pt-6 transition-colors duration-300 dark:bg-[#0A0A0A]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Technical Skills</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Object.entries(skillsData).map(([category, skills], catIndex) => (
          <motion.div
            key={category}
            variants={categoryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="flex flex-col gap-4"
          >
            <h2 className="pl-1 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{category}</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Magnetic key={skill.name} scale={0.25}>
                  <SkillCard
                    name={skill.name}
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    onClick={() => setSelectedSkill({ ...skill, category })}
                  />
                </Magnetic>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedSkill && (
        <Modal label={`${selectedSkill.name} Details`} onClose={() => setSelectedSkill(null)} maxWidth="max-w-4xl">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
            <div className="flex flex-col border-b border-gray-100 bg-gray-50/50 p-6 dark:border-[#1F1F1F] dark:bg-[#050505]/45 md:w-1/2 md:overflow-y-auto md:border-b-0 md:border-r md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/5 dark:bg-[#111111]">
                  <Image src={selectedSkill.icon} alt={`${selectedSkill.name} logo`} width={40} height={40} className="h-10 w-10 object-contain" loading="lazy" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                  <span className="mt-1 inline-block rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    {selectedSkill.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-grow flex-col gap-4">
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <RiSparklingLine size={14} className="text-blue-500" /> Usage &amp; Experience
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{selectedSkill.description}</p>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col bg-white p-6 dark:bg-[#0A0A0A] md:w-1/2 md:overflow-y-auto md:p-8">
              <h4 className="mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:border-[#1F1F1F] dark:text-gray-500">
                <RiBriefcaseLine size={14} className="text-blue-500" /> Related Projects ({activeRelatedProjects.length})
              </h4>

              {activeRelatedProjects.length > 0 ? (
                <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                  {activeRelatedProjects.map((project) => (
                    <div key={project.slug} className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/30 p-4 transition-all duration-300 hover:border-blue-500/20 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]/50 dark:hover:border-blue-500/20">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-base font-bold text-gray-900 dark:text-white">{project.title}</h5>
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded border border-gray-200 bg-white p-1 text-gray-500 transition-colors hover:text-blue-500 dark:border-white/5 dark:bg-[#1A1A1A] dark:text-gray-400" title="View Repository">
                              <RiGithubLine size={16} />
                            </a>
                          )}
                          {project.liveDemoUrl && (
                            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="rounded border border-gray-200 bg-white p-1 text-gray-500 transition-colors hover:text-blue-500 dark:border-white/5 dark:bg-[#1A1A1A] dark:text-gray-400" title="Open Live Demo">
                              <RiExternalLinkLine size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="line-clamp-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {normalizeTechStack(project.techStack)
                          .slice(0, 4)
                          .map((tech) => (
                            <span
                              key={tech}
                              className={`rounded px-2 py-0.5 text-[9px] font-semibold ${
                                tech.toLowerCase().includes(selectedSkill.name.toLowerCase())
                                  ? "border border-blue-500/20 bg-blue-500/10 text-blue-500"
                                  : "border border-gray-200 bg-gray-100 text-gray-500 dark:border-white/5 dark:bg-[#1A1A1A]"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-grow flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 px-4 py-12 text-center dark:border-[#1F1F1F]">
                  <RiCodeSSlashLine size={36} className="mb-3 text-gray-300 dark:text-gray-700" />
                  <p className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">No projects linked yet</p>
                  <p className="max-w-xs text-xs leading-normal text-gray-400 dark:text-gray-500">
                    I haven&apos;t added projects containing this exact technology tag yet. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
