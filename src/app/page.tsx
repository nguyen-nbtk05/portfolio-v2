import { getProjects } from "@/lib/content";
import Profile from "@/components/sections/Profile";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import GithubGraphLazy from "@/components/sections/GithubGraphLazy";

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <div className="block pt-28 lg:hidden lg:pt-0">
        <Profile />
      </div>
      <About />
      <Skills projects={projects} />
      <Projects projects={projects} />
      <GithubGraphLazy />
      <Education />
      <Contact />
    </>
  );
}
