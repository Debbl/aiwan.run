import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { AntDesignFireFilled, Icon } from "~/icons";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <div>
        <button>
          <Link href="/">
            <Icon className="text-[#eab308] h-6 w-6" icon={AntDesignFireFilled} />
          </Link>
        </button>
      </div>

      <div className="flex items-center gap-x-6">
        <button>
          <Link href="/blog">blog</Link>
        </button>

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
