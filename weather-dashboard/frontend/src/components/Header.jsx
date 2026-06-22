function Header({ activeSection, city, navItems, onNavigate, themeLabel }) {
  return (
    <header className="header">
      <div className="header__brand">
        <p className="header__kicker">Intelligent Weather Analytics Dashboard</p>
        <h1 className="header__title">Weather Dashboard</h1>
        <p className="header__subtitle">A responsive weather workspace with reusable cards, analytics, and dynamic themes.</p>
      </div>

      <div className="header__meta">
        <div className="header__pill-group">
          <span className="header__pill">{themeLabel}</span>
          <span className="header__pill">{city || 'No city selected'}</span>
        </div>

        <nav className="header__nav" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`header__nav-button${activeSection === item.id ? ' header__nav-button--active' : ''}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
