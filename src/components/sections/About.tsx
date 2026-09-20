export default function About() {
  return (
    <div className="flex w-full flex-col gap-5 bg-white px-8 pb-6 pt-16 transition-colors duration-300 dark:bg-[#0A0A0A]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          About Me
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="max-w-4xl">
        <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Who am I?</h2>
        <p className="text-justify text-base leading-relaxed text-gray-600 dark:text-gray-300">
          A technology-oriented individual with a substantial interest in cybersecurity, Linux systems, networking, and contemporary IT infrastructure. This foundation is strengthened through rigorous academic training and practical experience encompassing Linux administration, network security, infrastructure automation, and system hardening. Particular emphasis is placed on understanding how modern systems are designed, configured, and integrated to maintain secure and resilient environments.
        </p>
        <br />
        <p className="text-justify text-base leading-relaxed text-gray-600 dark:text-gray-300">
          The principal objective is to address complex technical challenges through systematic analysis and practical implementation, while continuously transforming theoretical knowledge into applicable expertise. This approach supports a deeper understanding of secure infrastructure, system behavior, and the technologies shaping modern IT environments.
        </p>
      </div>
    </div>
  );
}
