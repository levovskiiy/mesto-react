import headerLogo from "../icons/mesto_logo-white.svg";

const Header = () => {
  return (
    <header className="header page__header">
      <img
        src={headerLogo}
        alt="Логотип приложения mesto"
        className="header__logo"
      />
    </header>
  );
};

export default Header;
