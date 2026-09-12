import "../blocks/header.css";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ city, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const logo = `${import.meta.env.BASE_URL}logo.svg`;
  const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__button" type="button" onClick={onAddClick}>
          + Add Clothes
        </button>
        <Link to="/profile" className="header__profile">
          <p className="header__username">Username</p>
          <img src={avatar} alt="avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
