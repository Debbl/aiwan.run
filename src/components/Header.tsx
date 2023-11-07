import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  AntDesignFireFilled,
  CarbonRss,
  Icon,
  SimpleIconsBilibili,
  UilGithubAlt,
} from "~/icons";

const Header = () => {
  const nav = [
    {
      url: "/blog",
      name: "Blog",
    },
    {
      url: "https://github.com/Debbl/",
      name: "Github",
      icon: UilGithubAlt,
    },
    {
      url: "https://space.bilibili.com/174865648/",
      name: "Bilibili",
      icon: SimpleIconsBilibili,
    },
    {
      url: "/feed.xml",
      name: "RSS",
      icon: CarbonRss,
    },
  ];

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
          <Link title={n.name} key={n.name} href={n.url}>
            {n.icon ? <Icon className="h-5 w-5" icon={n.icon} /> : n.name}
          </Link>
        ))}

        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
