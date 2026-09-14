function SideBar() {
  const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={avatar} alt="avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Username</p>
      </div>
    </div>
  );
}

export default SideBar;
