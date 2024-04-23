
function Header({ title, avatarUrl }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{title}</h1>
        {avatarUrl && <img src={avatarUrl} alt="avatar" className="avatar-img" />}
      </div>
    </header>
  );
};

export default Header;