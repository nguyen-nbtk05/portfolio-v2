import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  BlogSchema,
  EducationItemSchema,
  ProfileSchema,
  ProjectSchema,
  type Blog,
  type EducationItem,
  type Profile,
  type Project,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function readMdxDir(dir: string): { slug: string; raw: string }[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      raw: fs.readFileSync(path.join(full, file), "utf-8"),
    }));
}

function parseMdx<T>(
  raw: string,
  schema: { safeParse: (d: unknown) => { success: boolean; data?: T } },
  slug: string,
): (T & { slug: string; body: string }) | null {
  const { data, content: body } = matter(raw);
  const parsed = schema.safeParse(data);
  if (!parsed.success || !parsed.data) {
    console.warn(`[content] invalid frontmatter: ${slug}`);
    return null;
  }
  return { ...(parsed.data as T), slug, body };
}

export function getProjects(): Project[] {
  const items = readMdxDir("projects")
    .map(({ slug, raw }) => parseMdx(raw, ProjectSchema, slug))
    .filter((x): x is Project & { body: string } => x !== null)
    .map(({ body: _body, ...rest }) => rest)
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
  return items;
}

export function getProject(slug: string): (Project & { body: string }) | null {
  const file = ["mdx", "md"]
    .map((ext) => path.join(CONTENT_DIR, "projects", `${slug}.${ext}`))
    .find((p) => fs.existsSync(p));
  if (!file) return null;
  return parseMdx(fs.readFileSync(file, "utf-8"), ProjectSchema, slug);
}

export function getBlogs(): Blog[] {
  return readMdxDir("blogs")
    .map(({ slug, raw }) => parseMdx(raw, BlogSchema, slug))
    .filter((x): x is Blog & { body: string } => x !== null)
    .map(({ body: _body, ...rest }) => rest)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlog(slug: string): (Blog & { body: string }) | null {
  const file = ["mdx", "md"]
    .map((ext) => path.join(CONTENT_DIR, "blogs", `${slug}.${ext}`))
    .find((p) => fs.existsSync(p));
  if (!file) return null;
  return parseMdx(fs.readFileSync(file, "utf-8"), BlogSchema, slug);
}

export function getBlogSlugs(): string[] {
  return readMdxDir("blogs").map((x) => x.slug);
}

export function getEducation(): EducationItem[] {
  const arr = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "education.json"), "utf-8"),
  ) as unknown[];
  return arr.map((x) => EducationItemSchema.parse(x));
}

function readJson<T>(file: string, schema: { parse: (d: unknown) => T }): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  return schema.parse(JSON.parse(raw));
}

export function getProfile(): Profile {
  return readJson("profile.json", ProfileSchema);
}
