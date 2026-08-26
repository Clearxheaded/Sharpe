const { Icon, IconButton } = window.SharpeDesignSystem_989b45;

function Wordmark({ dark }) {
  return (
    <span style={{ font: "600 17px/1 var(--font-display)", letterSpacing: "-0.03em", color: dark ? "var(--paper-0)" : "var(--ink-0)" }}>
      Sharpe<span style={{ color: dark ? "var(--sodium-400)" : "var(--accent)" }}>.</span>
    </span>
  );
}

function NavItem({ icon, label, active, onClick, meta }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)", width: "100%", height: 28, padding: "0 var(--sp-5)",
        background: active ? "var(--paper-2)" : h ? "var(--surface-row-alt)" : "transparent",
        border: "none", borderLeft: "2px solid " + (active ? "var(--accent)" : "transparent"),
        color: active ? "var(--text-primary)" : "var(--text-secondary)", font: active ? "var(--type-h3)" : "var(--type-body)",
        cursor: "pointer", textAlign: "left", transition: "var(--transition-control)" }}>
      {icon ? <Icon name={icon} size={13} /> : null}
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      {meta != null ? <span style={{ font: "var(--type-numeric-sm)", color: "var(--text-label)" }}>{meta}</span> : null}
    </button>
  );
}

function AppShell({ email, portfolios, route, portfolioId, onNavigate, onSignOut, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "var(--sidebar-w) 1fr", minHeight: "100%", background: "var(--bg-page)" }}>
      <aside style={{ borderRight: "var(--border-hair)", background: "var(--paper-1)", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "var(--topbar-h)", display: "flex", alignItems: "center", padding: "0 var(--sp-5)", borderBottom: "var(--border-hair)" }}>
          <Wordmark />
        </div>
        <div style={{ padding: "var(--sp-5) 0 var(--sp-3)" }}>
          <div style={{ padding: "0 var(--sp-5) var(--sp-3)" }} className="label">workspace</div>
          <NavItem icon="layers" label="Portfolios" active={route === "list"} meta={portfolios.length} onClick={() => onNavigate("list")} />
          <NavItem icon="sigma" label="Methodology" active={route === "methodology"} onClick={() => onNavigate("methodology")} />
          <NavItem icon="settings" label="Settings" onClick={() => {}} />
        </div>
        <div style={{ padding: "var(--sp-4) 0", borderTop: "var(--border-soft)", overflow: "auto", flex: 1 }}>
          <div style={{ padding: "0 var(--sp-5) var(--sp-3)" }} className="label">saved</div>
          {portfolios.map((p) => (
            <NavItem key={p.id} label={p.name} active={route === "stats" && portfolioId === p.id}
              meta={p.tickers.length} onClick={() => onNavigate("stats", p.id)} />
          ))}
        </div>
        <div style={{ borderTop: "var(--border-hair)", padding: "var(--sp-4) var(--sp-5)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sp-3)" }}>
          <span style={{ font: "var(--type-body-sm)", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</span>
          <IconButton name="log-out" label="Sign out" size="sm" onClick={onSignOut} />
        </div>
      </aside>
      <main style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  );
}

function PageHeader({ title, eyebrow, meta, actions }) {
  return (
    <header style={{ borderBottom: "var(--border-hair)", background: "var(--paper-1)", padding: "var(--sp-6) var(--sp-8)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--sp-6)", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", minWidth: 0 }}>
        {eyebrow ? <span className="label">{eyebrow}</span> : null}
        <h1 style={{ font: "var(--type-h1)", color: "var(--text-primary)", letterSpacing: "var(--tracking-tight)" }}>{title}</h1>
        {meta ? <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-5)", font: "var(--type-numeric-sm)", color: "var(--text-secondary)" }}>{meta}</div> : null}
      </div>
      {actions ? <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)" }}>{actions}</div> : null}
    </header>
  );
}

Object.assign(window, { AppShell, PageHeader, Wordmark, NavItem });
