"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isShowNavBackground, setIsShowNavBackground] = useState(false);
  const { isMobile } = useMobile();

  useEffect(() => {
    const handleShowNavBackground = () => {
      if (
        navRef.current?.offsetHeight &&
        window.scrollY > navRef.current?.offsetHeight
      ) {
        setIsShowNavBackground(true);
      } else {
        setIsShowNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleShowNavBackground);

    return () => {
      window.removeEventListener("scroll", handleShowNavBackground);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 flex items-center justify-between px-6 py-3 ${
        isShowNavBackground
          ? "nav z-50 bg-transparent shadow-md dark:bg-black"
          : ""
      }`}
    >
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
};

export default Header;
