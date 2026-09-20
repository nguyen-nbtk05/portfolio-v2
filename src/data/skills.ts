export type Skill = {
  name: string;
  icon: string;
  iconDark?: string;
  description: string;
};

export const skillsData: Record<string, Skill[]> = {
  Programming: [
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      description: "Python is a high-level, general-purpose programming language known for readable syntax and a broad ecosystem spanning automation, data, web development, and cybersecurity.",
    },
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      description: "SQL is a declarative language for storing, querying, and managing data in relational databases such as PostgreSQL, MySQL, and SQLite.",
    },
    {
      name: "Rust",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
      iconDark: "https://cdn.simpleicons.org/rust/white",
      description: "Rust is a systems programming language focused on performance, memory safety, and concurrency through its ownership model without requiring a garbage collector.",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      description: "JavaScript is the core scripting language of the web for dynamic browser interfaces and server-side runtimes such as Node.js.",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      description: "TypeScript extends JavaScript with static types for improved tooling, clarity, and reliability.",
    },
  ],
  Linux: [
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      description: "Linux is an open-source, Unix-like operating-system kernel that powers a wide range of servers, cloud platforms, embedded devices, and desktop distributions.",
    },
    {
      name: "Bash",
      icon: "https://cdn.simpleicons.org/gnubash",
      description: "Bash is a command-line shell and scripting language widely used on Unix-like systems to combine commands, automate workflows, and manage environments.",
    },
    {
      name: "Virtualization",
      icon: "https://cdn.simpleicons.org/proxmox",
      description: "Virtualization runs multiple isolated virtual machines on a single physical host through hypervisors such as VMware, VirtualBox, and Proxmox.",
    },
  ],
  "Networking & Analysis": [
    {
      name: "Wireshark",
      icon: "https://cdn.simpleicons.org/wireshark",
      description: "Wireshark is a widely used network packet analyzer that captures and dissects traffic in real time for troubleshooting, protocol analysis, and security investigation",
    },
    {
      name: "YARA",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e11d48' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1'/%3E%3Cpath d='M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1'/%3E%3C/svg%3E",
      description: "YARA is a pattern-matching tool for identifying and classifying malware through rule-based signatures, commonly combined with hash matching for layered detection.",
    },
    {
      name: "Packet Tracer",
      icon: "https://cdn.simpleicons.org/cisco",
      description: "Cisco Packet Tracer is a visual network-simulation tool for building virtual topologies and practicing device configuration without dedicated physical hardware.",
    },
    {
      name: "Mininet",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Ccircle cx='18' cy='5' r='2.4'/%3E%3Ccircle cx='6' cy='12' r='2.4'/%3E%3Ccircle cx='18' cy='19' r='2.4'/%3E%3Cpath d='M8 10.5 16 6.5M8 13.5l8 4' stroke='%232563eb' stroke-width='1.8'/%3E%3C/svg%3E",
      description: "Mininet is a network emulation platform that creates virtual hosts, switches, and controllers on a single machine for software-defined networking experiments with protocols such as OpenFlow.",
    },
  ],
  "Dev Tools": [
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      description: "Docker is a containerization platform that packages applications with dependencies into isolated, portable containers for consistent deployment across environments.",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      description: "Postman is a collaboration platform for designing, testing, and documenting APIs through requests, collections, and automated test scripts.",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      description: "Git is a distributed version-control system that records source-code history and supports parallel development through branches, merges, and local repositories.",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      iconDark: "https://cdn.simpleicons.org/github/white",
      description: "GitHub is a cloud platform built around Git for hosting repositories, reviewing code, tracking work, publishing documentation, and collaborating on software.",
    },
    {
      name: "Selenium",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
      description: "Selenium is a browser-automation framework for controlling web browsers programmatically, widely used for testing and dynamic web crawling.",
    },
  ],
};
