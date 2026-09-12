import "../blocks/header.css";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ city, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
