"use client";
import Link from "next/link";
import { useRef } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import type { IconType } from "~/icons";
import { Icon } from "~/icons";
import { useMobile } from "~/hooks/useMobile";

const nav: {
  "url": string;
  "name": string;
  "data-umami-event": string;
  "icon"?: IconType;
}[] = [
  {
    "url": "/",
    "name": "Home",
    "data-umami-event": "click-home-link",
  },
  {
    "url": "/blog",
    "name": "Blog",
    "data-umami-event": "click-blog-link",
  },
  {
    "url": "/til",
    "name": "TIL",
    "data-umami-event": "click-blog-til",
  },
  {
    "url": "/feed.xml",
    "name": "RSS",
    "data-umami-event": "click-rss-link",
    "icon": "Rss",
  },
];

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { isMobile } = useMobile();

  return (
    <nav ref={navRef} className={"flex items-center justify-between px-6 py-3"}>
      <div>
        <button>
          <Link href="/">
            <Icon className="size-6 text-primary" icon="FireFilled" />
          </Link>
        </button>
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
            >
              {n.icon ? <Icon className="size-5" icon={n.icon} /> : n.name}
            </Link>
          ))}

        <ThemeSwitcher />
      </div>
    </nav>
  );
}
