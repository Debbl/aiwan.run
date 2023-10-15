import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <div className="flex justify-end px-6 py-3">
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
