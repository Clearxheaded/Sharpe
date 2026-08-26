const { Button, DataTable, IconButton, Panel, Metric } = window.SharpeDesignSystem_989b45;

function fmtPct(v, d) { return v == null ? "—" : (v * 100).toFixed(d === undefined ? 1 : d) + "%"; }

function PortfolioList({ summary, error, onOpen, onCreate, onEdit, onRefresh }) {
  const [deletingId, setDeletingId] = React.useState(null);
  const portfolios = summary ? summary.portfolios : null;
  const loading = portfolios === null && !error;
  const totalHoldings = portfolios ? portfolios.reduce((s, p) => s + p.tickers.length, 0) : 0;

  const bySharpe = portfolios ? portfolios.filter((p) => p.sharpe_ratio != null) : [];
  const bestSharpe = bySharpe.length ? bySharpe.reduce((a, b) => (b.sharpe_ratio > a.sharpe_ratio ? b : a)) : null;
  const byVol = portfolios ? portfolios.filter((p) => p.portfolio_volatility != null) : [];
  const lowestVol = byVol.length ? byVol.reduce((a, b) => (b.portfolio_volatility < a.portfolio_volatility ? b : a)) : null;

  const handleDelete = async (p, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete "' + p.name + '"? This cannot be undone.')) return;
    setDeletingId(p.id);
    try {
      await window.SharpeApi.api.deletePortfolio(p.id);
      await onRefresh();
    } catch (err) {
      window.alert(err.detail || err.message || "Failed to delete portfolio.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <React.Fragment>
      <PageHeader
        eyebrow="workspace"
        title="Portfolios"
        meta={portfolios ? (
          <React.Fragment>
            <span>{portfolios.length} saved</span><span style={{ color: "var(--rule-strong)" }}>/</span>
            <span>{totalHoldings} holdings total</span><span style={{ color: "var(--rule-strong)" }}>/</span>
            <span>risk-free rate {fmtPct(summary.risk_free_rate, 2)}</span>
          </React.Fragment>
        ) : null}
        actions={<Button variant="primary" icon="plus" onClick={onCreate}>New portfolio</Button>} />
      <div style={{ padding: "var(--sp-8)", display: "flex", flexDirection: "column", gap: "var(--sp-6)", maxWidth: "var(--content-max)" }}>
        {error ? (
          <Panel tone="sunken"><span style={{ color: "var(--state-danger)" }}>{error}</span></Panel>
        ) : null}
        <Panel title="Saved portfolios" eyebrow="sorted by created · newest first" pad={false}
          footnote="Statistics are recomputed on open from the latest available daily closes.">
          <DataTable
            rows={loading ? [] : portfolios}
            rowKey={(p) => p.id}
            onRowClick={(p) => onOpen(p.id)}
            empty={loading ? "Loading…" : "No portfolios yet. Create one to get started."}
            columns={[
              { key: "name", header: "Name", render: (p) => <span style={{ font: "var(--type-h3)", color: "var(--text-primary)" }}>{p.name}</span> },
              { key: "tickers", header: "Holdings", render: (p) => (
                <span style={{ display: "inline-flex", gap: "var(--sp-3)", alignItems: "center" }}>
                  {p.tickers.slice(0, 4).map((t) => <span key={t} style={{ font: "var(--type-ticker)", color: "var(--text-body)" }}>{t}</span>)}
                  {p.tickers.length > 4 ? <span style={{ font: "var(--type-numeric-sm)", color: "var(--text-label)" }}>+{p.tickers.length - 4}</span> : null}
                </span>) },
              { key: "count", header: "n", align: "right", mono: true, width: 56, render: (p) => p.tickers.length },
              { key: "sharpe", header: "Sharpe", align: "right", mono: true, width: 90, render: (p) => (p.sharpe_ratio == null ? "—" : p.sharpe_ratio.toFixed(3)) },
              { key: "created", header: "Created", align: "right", mono: true, muted: true, width: 120, render: (p) => p.created_at.slice(0, 10) },
              { key: "actions", header: "", align: "right", width: 80, render: (p) => (
                <span style={{ display: "inline-flex", gap: "var(--sp-2)" }}>
                  <IconButton name="pencil" label={"Edit " + p.name} size="sm" onClick={(e) => { e.stopPropagation(); onEdit(p.id); }} />
                  <IconButton name="trash-2" label={"Delete " + p.name} size="sm" tone="danger" disabled={deletingId === p.id} onClick={(e) => handleDelete(p, e)} />
                </span>) }
            ]} />
        </Panel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--sp-6)" }}>
          <Panel><Metric label="Best Sharpe" value={bestSharpe ? bestSharpe.sharpe_ratio.toFixed(3) : "—"} size="sm" note={bestSharpe ? bestSharpe.name : "no data yet"} /></Panel>
          <Panel><Metric label="Lowest volatility" value={lowestVol ? fmtPct(lowestVol.portfolio_volatility) : "—"} size="sm" note={lowestVol ? lowestVol.name : "no data yet"} /></Panel>
          <Panel><Metric label="Risk-free rate" value={summary ? fmtPct(summary.risk_free_rate, 2) : "—"} size="sm" note="3-month T-bill" /></Panel>
          <Panel><Metric label="Return window" value="1Y" size="sm" note="daily closes" /></Panel>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PortfolioList });
