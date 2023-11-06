import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { AntDesignFireFilled, Icon } from "~/icons";

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
        <button>
          <Link href="/blog">blog</Link>
        </button>

        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
