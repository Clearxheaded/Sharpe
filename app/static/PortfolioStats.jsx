const { Button, Panel, Metric, DataTable, MatrixGrid, ScaleLegend, WeightBar, Badge, Icon } = window.SharpeDesignSystem_989b45;
const { api } = window.SharpeApi;

function pct(v, d) { return v == null ? "—" : (v * 100).toFixed(d === undefined ? 1 : d) + "%"; }

function PortfolioStats({ portfolioId, onEdit }) {
  const [portfolio, setPortfolio] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [hover, setHover] = React.useState(null);

  const load = React.useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const [p, s] = await Promise.all([api.getPortfolio(portfolioId), api.getPortfolioStats(portfolioId)]);
      setPortfolio(p);
      setStats(s);
    } catch (err) {
      setError(err.detail || err.message || "Failed to load portfolio stats.");
    } finally {
      setBusy(false);
    }
  }, [portfolioId]);

  React.useEffect(() => { setPortfolio(null); setStats(null); load(); }, [load]);

  if (!stats) {
    if (error) {
      return (
        <React.Fragment>
          <PageHeader eyebrow="portfolios" title="Couldn't load this portfolio"
            actions={<Button variant="primary" onClick={load}>Try again</Button>} />
          <div style={{ padding: "var(--sp-8)", maxWidth: "var(--content-max)" }}>
            <Panel tone="sunken">
              <span style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", color: "var(--state-danger)" }}>
                <Icon name="triangle-alert" size={14} /><span>{error}</span>
              </span>
            </Panel>
          </div>
        </React.Fragment>
      );
    }
    return <PageHeader eyebrow="portfolios" title="Loading portfolio…" />;
  }

  const covMax = Math.max.apply(null, stats.tickers.map((r) => Math.max.apply(null, stats.tickers.map((c) => Math.abs(stats.covariance_matrix[r][c])))));
  const holdings = stats.tickers.map((t, i) => ({
    ticker: t,
    weight: pct(stats.weights[i]),
    ret: pct(stats.holding_return[t]),
    vol: pct(stats.holding_volatility[t]),
    contrib: pct(stats.weights[i] * stats.holding_volatility[t], 2)
  }));
  const weightedAvgVol = stats.tickers.reduce((s, t, i) => s + stats.weights[i] * stats.holding_volatility[t], 0);
  const riskReduced = weightedAvgVol - stats.portfolio_volatility;

  const exportCsv = () => {
    const lines = [["Ticker", "Weight", "Ann. return", "Ann. vol", "w x sigma"].join(",")];
    holdings.forEach((h) => lines.push([h.ticker, h.weight, h.ret, h.vol, h.contrib].join(",")));
    lines.push(["Total", "100.0%", pct(stats.portfolio_return), pct(stats.portfolio_volatility), ""].join(","));
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (portfolio ? portfolio.name : "portfolio") + "-stats.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <React.Fragment>
      <PageHeader
        eyebrow={"portfolios / " + portfolio.id}
        title={portfolio.name}
        meta={<React.Fragment>
          <span>{stats.tickers.length} holdings</span><span style={{ color: "var(--rule-strong)" }}>/</span>
          <span>1Y daily · {stats.observations} obs</span><span style={{ color: "var(--rule-strong)" }}>/</span>
          <span>created {portfolio.created_at.slice(0, 10)}</span>
        </React.Fragment>}
        actions={<React.Fragment>
          <Badge tone="positive">computed</Badge>
          <Button variant="ghost" icon="download" onClick={exportCsv}>Export CSV</Button>
          <Button variant="secondary" icon="pencil" onClick={onEdit}>Edit holdings</Button>
          <Button variant="primary" disabled={busy} onClick={load}>{busy ? "Recomputing…" : "Recompute"}</Button>
        </React.Fragment>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", borderBottom: "var(--border-hair)", background: "var(--surface-panel)" }}>
        {[
          { label: "Portfolio return", value: (stats.portfolio_return * 100).toFixed(1), unit: "%", note: "annualised, weighted" },
          { label: "Volatility", value: (stats.portfolio_volatility * 100).toFixed(1), unit: "%", note: "σₚ = √(wᵀΣw)" },
          { label: "Sharpe ratio", value: stats.sharpe_ratio.toFixed(3), note: "(" + stats.portfolio_return.toFixed(3) + " − " + stats.risk_free_rate.toFixed(3) + ") / " + stats.portfolio_volatility.toFixed(3), emphasis: true },
          { label: "Variance", value: stats.portfolio_variance.toFixed(4), note: "wᵀΣw" },
          { label: "Risk-free rate", value: (stats.risk_free_rate * 100).toFixed(2), unit: "%", note: "3-month T-bill" }
        ].map((m, i) => (
          <div key={m.label} style={{ padding: "var(--sp-7) var(--sp-8)", borderLeft: i === 0 ? "none" : "var(--border-soft)" }}>
            <Metric label={m.label} value={m.value} unit={m.unit} note={m.note} emphasis={m.emphasis} size={m.emphasis ? "lg" : "md"} />
          </div>
        ))}
      </div>

      <div style={{ padding: "var(--sp-8)", display: "flex", flexDirection: "column", gap: "var(--sp-6)", maxWidth: "var(--content-max)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)", gap: "var(--sp-6)", alignItems: "start" }}>
          <Panel title="Holdings" eyebrow="annualised from daily log returns" pad={false}
            footnote="Risk contribution is the naive weight × volatility product; it ignores cross-covariance.">
            <DataTable dense rows={holdings} rowKey={(r) => r.ticker}
              footer={{ ticker: "Total", weight: "100.0%", ret: pct(stats.portfolio_return), vol: pct(stats.portfolio_volatility), contrib: "—" }}
              columns={[
                { key: "ticker", header: "Ticker", mono: true },
                { key: "weight", header: "Weight", align: "right", mono: true },
                { key: "ret", header: "Ann. return", align: "right", mono: true },
                { key: "vol", header: "Ann. vol", align: "right", mono: true },
                { key: "contrib", header: "w × σ", align: "right", mono: true, muted: true }
              ]} />
          </Panel>

          <Panel title="Allocation" eyebrow="weights"
            footnote={"Diversification benefit: weighted-average volatility is " + pct(weightedAvgVol) + " against a portfolio volatility of " + pct(stats.portfolio_volatility) + "."}>
            <WeightBar height={10} showLegend segments={stats.tickers.map((t, i) => ({ label: t, value: stats.weights[i], display: pct(stats.weights[i]) }))} />
            <div style={{ marginTop: "var(--sp-7)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-6)", borderTop: "var(--border-soft)", paddingTop: "var(--sp-6)" }}>
              <Metric size="sm" label="Weighted-avg vol" value={pct(weightedAvgVol)} note="if all correlations were 1" />
              <Metric size="sm" label="Risk reduced" value={(riskReduced >= 0 ? "−" : "+") + pct(Math.abs(riskReduced), 1)} note="from correlations below 1" />
            </div>
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-6)", alignItems: "start" }}>
          <Panel title="Correlation" eyebrow="pearson · unitless, −1 → +1" pad={false}
            actions={<ScaleLegend caption="offsetting → co-moving" />}
            footnote={hover
              ? hover.row + " / " + hover.col + " = " + hover.value.toFixed(2)
              : "Estimated from one historical window and assumed stationary; correlations spike toward 1 in a crisis."}>
            <MatrixGrid tickers={stats.tickers} matrix={stats.correlation_matrix} onCellHover={setHover} cell={72} />
          </Panel>

          <Panel title="Covariance" eyebrow={"annualised · scale ±" + covMax.toFixed(2)} pad={false}
            actions={<ScaleLegend caption="σ² on the diagonal" min={"−" + covMax.toFixed(2)} max={"+" + covMax.toFixed(2)} />}
            footnote="Σ is the object the optimiser minimises: wᵀΣw subject to the weight constraints.">
            <MatrixGrid tickers={stats.tickers} matrix={stats.covariance_matrix} max={covMax} cell={72} format={(v) => (v == null ? "—" : v.toFixed(3))} />
          </Panel>
        </div>

        <Panel title="Method" tone="sunken" eyebrow="week 2–3 · covariance, correlation, sharpe">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--sp-8)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span className="label">returns</span>
              <span style={{ font: "var(--type-numeric)" }}>rₜ = ln(Pₜ / Pₜ₋₁)</span>
              <span>Log returns are time-additive, so multi-period aggregation and annualisation stay clean.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span className="label">portfolio variance</span>
              <span style={{ font: "var(--type-numeric)" }}>σ²ₚ = wᵀΣw</span>
              <span>Sample covariance uses n−1. Daily volatility is annualised by √252.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span className="label">limitations</span>
              <span>Standard deviation only describes risk fully if returns are symmetric. Real markets have fat tails and volatility clustering.</span>
            </div>
          </div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PortfolioStats });
