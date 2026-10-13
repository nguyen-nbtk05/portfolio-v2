import Image from "next/image";
import { getFeatured } from "@/lib/content";
import Magnetic from "../ui/Magnetic";

export default function Header() {
  const featuredItems = getFeatured();


  return (
    <div className="relative flex flex-col gap-8 p-4 text-black dark:text-white md:px-8 md:pt-16">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="whitespace-nowrap text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Lowkey Vibes
            </h1>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
          </div>
          
          <Magnetic scale={0.07}>
            <Image
              src="/_).gif"
              alt="GIF"
              width={640}
              height={360}
              unoptimized
              loading="lazy"
              className="h-44 w-full cursor-pointer rounded-md border border-gray-200 object-cover shadow-sm dark:border-[#1F1F1F]"
            />
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
