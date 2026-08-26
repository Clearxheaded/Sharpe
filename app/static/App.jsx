function App() {
  const { api } = window.SharpeApi;
  const [booting, setBooting] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [route, setRoute] = React.useState("list");
  const [portfolioId, setPortfolioId] = React.useState(null);
  const [summary, setSummary] = React.useState(null);
  const [summaryError, setSummaryError] = React.useState(null);

  const loadSummary = React.useCallback(async () => {
    try {
      const data = await api.listPortfoliosSummary();
      setSummary(data);
      setSummaryError(null);
    } catch (err) {
      setSummaryError(err.detail || err.message || "Failed to load portfolios.");
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      if (api.hasStoredSession()) {
        try {
          await api.restoreSession();
          const user = await api.getCurrentUser();
          setEmail(user.email);
          setAuthed(true);
          await loadSummary();
        } catch (err) {}
      }
      setBooting(false);
    })();
  }, [loadSummary]);

  const handleAuthed = (userEmail) => {
    setEmail(userEmail);
    setAuthed(true);
    setRoute("list");
    setPortfolioId(null);
    loadSummary();
  };

  const handleSignOut = async () => {
    await api.logout();
    setAuthed(false);
    setEmail("");
    setSummary(null);
    setRoute("list");
    setPortfolioId(null);
  };

  const navigate = (r, id) => {
    if (id !== undefined) setPortfolioId(id);
    setRoute(r);
  };

  if (booting) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100%", font: "var(--type-body)", color: "var(--text-secondary)" }}>
        Loading…
      </div>
    );
  }

  if (!authed) {
    return <AuthScreen onAuthed={handleAuthed} />;
  }

  const portfolios = summary ? summary.portfolios : [];

  return (
    <AppShell email={email} portfolios={portfolios} route={route} portfolioId={portfolioId}
      onNavigate={navigate} onSignOut={handleSignOut}>
      {route === "list" ? (
        <PortfolioList summary={summary} error={summaryError} onOpen={(id) => navigate("stats", id)}
          onCreate={() => navigate("create", null)} onEdit={(id) => navigate("create", id)} onRefresh={loadSummary} />
      ) : null}
      {route === "create" ? (
        <CreatePortfolio portfolioId={portfolioId} onCancel={() => navigate("list", null)}
          onSave={async (id) => { await loadSummary(); navigate("stats", id); }} />
      ) : null}
      {route === "stats" ? (
        <PortfolioStats portfolioId={portfolioId} onEdit={() => navigate("create", portfolioId)} />
      ) : null}
      {route === "methodology" ? <Methodology /> : null}
    </AppShell>
  );
}

Object.assign(window, { App });
