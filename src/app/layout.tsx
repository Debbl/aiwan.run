import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "~/components/ThemeProvider";
import Header from "~/components/Header";

export const metadata: Metadata = {
  title: "Brendan Dash",
  authors: [{ name: "Brendan Dash (Debbl)", url: "https://aiwan.run/" }],
  description: "Brendan Dash's personal website",
  icons: "/favicon.svg",
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
          src="https://umami.aiwan.run/script.js"
          data-website-id="798a0204-dd50-4b46-9366-fb9ba43d2e98"
        />
      </head>
      <body className="flex h-full flex-col">
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
