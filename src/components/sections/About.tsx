export default function About() {
  return (
    <div className="flex w-full flex-col gap-6 bg-white px-8 pb-6 pt-20 transition-colors duration-300 dark:bg-[#0A0A0A]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          About Me
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="max-w-4xl">
        <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Who am I?</h2>
        <p className="text-justify text-base leading-relaxed text-gray-600 dark:text-gray-300">
          A technology-oriented individual with a substantial interest in cybersecurity, Linux
          systems, networking, and contemporary IT infrastructure. This foundation is consolidated
          through rigorous academic training and practical implementation encompassing Linux
          administration, network security, infrastructure automation, and system hardening,
          alongside a comprehensive understanding of configuring, monitoring, and sustaining
          secure and resilient systems. The principal objective remains addressing complex
          technical challenges and systematically transforming theoretical knowledge into
          applicable expertise.
        </p>
      </div>
    </div>
  );
}
