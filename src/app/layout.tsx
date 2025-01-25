import { ViewTransitions } from "next-view-transitions";
import Header from "~/app/_components/Header";
import { WEBSITE } from "~/constants";
import Providers from "~/providers";
import "~/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: WEBSITE.title,
  authors: WEBSITE.authors,
  description: WEBSITE.description,
  appleWebApp: {
    title: WEBSITE.title,
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
    },
    {
      rel: "app-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  openGraph: {
    url: WEBSITE.domain,
    title: WEBSITE.title,
    description: WEBSITE.description,
    images: ["/og.png"],
    emails: [WEBSITE.email],
  },
  alternates: {
    canonical: "https://aiwan.run/",
    types: {
      "application/rss+xml": [
        {
          title: "Brendan Dash's RSS Feed",
          url: "/feed.xml",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          <script
            async
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="6ed314b0-fc17-4333-870a-d9e5af82626e"
            data-domains="aiwan.run"
          />
        </head>
        <body className="relative flex h-full flex-col">
          <Providers>
            <Header />
            {children}
            <div className="pointer-events-none fixed bottom-0 left-0 h-20 w-full bg-white [mask-image:linear-gradient(transparent,#000000)] dark:bg-black" />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
