"use client";
import { LucideRss } from "@repo/icons";
import { useRef } from "react";
import Link from "~/components/Link";
import { useMobile } from "~/hooks/useMobile";
import ThemeSwitcher from "./ThemeSwitcher";

const nav: {
  "url": string;
  "name": string;
  "data-umami-event": string;
  "icon"?: React.ReactNode;
}[] = [
  {
    "url": "/posts",
    "name": "Blog",
    "data-umami-event": "click-blog-link",
  },
  {
    "url": "/tools",
    "name": "Tools",
    "data-umami-event": "click-blog-tools",
  },
  {
    "url": "/slides",
    "name": "Slides",
    "data-umami-event": "click-slides-link",
  },
  {
    "url": "/feed.xml",
    "name": "RSS",
    "data-umami-event": "click-rss-link",
    "icon": <LucideRss className="size-5" />,
  },
];

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { isMobile } = useMobile();

  return (
    <nav ref={navRef} className={"flex items-center justify-between px-6 py-3"}>
      <div>
        <Link href="/" aria-label="home page link">
          <button type="button" aria-label="home">
            ~
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-x-3 sm:gap-x-6">
        {nav
          .filter((n) => !(isMobile && n.name === "Home"))
          .map((n) => (
            <Link
              data-umami-event={n["data-umami-event"]}
              title={n.name}
              key={n.name}
              href={n.url}
              prefetch={["/posts"].includes(n.url)}
            >
              {n.icon || n.name}

              {n.icon && <span className="sr-only">{n.name}</span>}
            </Link>
          ))}

        <ThemeSwitcher />
      </div>
    </nav>
  );
}
