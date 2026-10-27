import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar-placeholder">
            {currentUser?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button type="button" className="sidebar__button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button type="button" className="sidebar__button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
