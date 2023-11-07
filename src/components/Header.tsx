import Link from "next/link";
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
  return (
    <nav className="flex items-center justify-between px-6 py-3">
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
