import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brendan Dash",
    short_name: "Brendan Dash",
    description: "Brendan Dash's personal website",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
