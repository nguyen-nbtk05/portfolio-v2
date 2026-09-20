import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/layout/Providers";
import SplashScreen from "@/components/layout/SplashScreen";
import Profile from "@/components/sections/Profile";
import Navbar from "@/components/layout/Navbar";
import { getProfile } from "@/lib/content";
import {
  GTAG_ID,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  TWITTER_CREATOR,
  UMAMI_SRC,
  UMAMI_WEBSITE_ID,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Nora",
  },
  description: SITE_DESCRIPTION,
  keywords: ["Nora", "Computer Networks", "Data Communications", "Linux", "Python", "Portfolio"],
  authors: [{ name: "Nora" }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description:
      "Portfolio of Nora, a Bachelor of Engineering in Computer Networks and Data Communications.",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: TWITTER_CREATOR,
  },
  icons: { icon: OG_IMAGE },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    image: profile.avatar,
    sameAs: Object.values(profile.social),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SplashScreen />
          <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0A0A0A] dark:text-gray-100">
            <div className="flex-1 sm:px-24">
              <div className="flex min-h-full flex-col border-x border-solid border-gray-200 bg-white transition-colors duration-300 dark:border-[#1F1F1F] dark:bg-[#0A0A0A] lg:flex-row">
                <aside className="hidden lg:block lg:h-screen lg:w-[45%] lg:sticky lg:top-0">
                  <Profile />
                </aside>

                <main className="pb-20 lg:w-[55%] lg:pb-0">
                  <Navbar />
                  {children}
                </main>
              </div>
            </div>
          </div>
        </Providers>

        <Analytics />

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GTAG_ID}');`}
        </Script>
        <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
        <Script id="jsonld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}
