import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveDemoUrl: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  order: z.number().default(0),
  category: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema> & { slug: string };

export const BlogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  thumbnail: z.string().optional(),
  date: z.string().min(1), // ISO date
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveDemoUrl: z.string().url().optional().or(z.literal("")),
  role: z.string().optional(),
  timeline: z.string().optional(),
  techStack: z.array(z.string()).default([]),
});

export type Blog = z.infer<typeof BlogSchema> & { slug: string };

export const EducationItemSchema = z.object({
  school: z.string(),
  degree: z.string(),
  duration: z.string(),
  details: z.array(z.string()),
  skills: z.array(z.string()),
});

export type EducationItem = z.infer<typeof EducationItemSchema>;

export const ProfileSchema = z.object({
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  email: z.string().email(),
  resumeUrl: z.string().url().optional(),
  social: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    leetcode: z.string().url().optional(),
    gfg: z.string().url().optional(),
    hackerrank: z.string().url().optional(),
  }),
});

export type Profile = z.infer<typeof ProfileSchema>;
