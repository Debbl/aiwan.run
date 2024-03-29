import type { Metadata } from "next";
import "~/style/globals.css";
import ThemeProvider from "~/components/ThemeProvider";
import Header from "~/components/Header";
import { WEBSITE } from "~/constants";

export const metadata: Metadata = {
  title: WEBSITE.title,
  authors: WEBSITE.authors,
  description: WEBSITE.description,
  icons: "/favicon.svg",
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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="6ed314b0-fc17-4333-870a-d9e5af82626e"
          data-domains="aiwan.run"
        />
      </head>
      <body className="flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
