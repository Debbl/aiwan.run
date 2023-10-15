import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <script
          async
          src="https://umami.aiwan.run/script.js"
          data-website-id="e44bfcdd-49ae-476b-95b7-f89bd0d69e86"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
