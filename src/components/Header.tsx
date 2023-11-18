"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  AntDesignFireFilled,
  CarbonEmail,
  CarbonRss,
  Icon,
  RiBilibiliLine,
  UilGithubAlt,
} from "~/icons";

const nav = [
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
    "url": "https://github.com/Debbl/",
    "name": "Github",
    "data-umami-event": "click-github-link",
    "icon": UilGithubAlt,
  },
  {
    "url": "https://space.bilibili.com/174865648/",
    "name": "Bilibili",
    "data-umami-event": "click-bilibili-link",
    "icon": RiBilibiliLine,
  },
  {
    "url": "mailto:me@aiwan.run",
    "name": "Email",
    "data-umami-event": "click-email-link",
    "icon": CarbonEmail,
  },
  {
    "url": "/feed.xml",
    "name": "RSS",
    "data-umami-event": "click-rss-link",
    "icon": CarbonRss,
  },
];

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isShowNavBackground, setIsShowNavBackground] = useState(false);

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
        isShowNavBackground ? "z-50 bg-gray-50 shadow-md dark:bg-black" : ""
      }`}
    >
      <div>
        <button>
          <Link href="/">
            <Icon
              className="h-6 w-6 text-[#eab308]"
              icon={AntDesignFireFilled}
            />
          </Link>
        </button>
      </div>

      <div className="flex items-center gap-x-6">
        {nav.map((n) => (
          <Link
            data-umami-event={n["data-umami-event"]}
            title={n.name}
            key={n.name}
            href={n.url}
          >
            {n.icon ? <Icon className="h-5 w-5" icon={n.icon} /> : n.name}
          </Link>
        ))}

        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
