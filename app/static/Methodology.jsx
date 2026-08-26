const { Panel } = window.SharpeDesignSystem_989b45;

function Methodology() {
  return (
    <React.Fragment>
      <PageHeader eyebrow="reference" title="Methodology"
        meta={<span>Every formula this app computes, and what it assumes.</span>} />
      <div style={{ padding: "var(--sp-8)", display: "flex", flexDirection: "column", gap: "var(--sp-6)", maxWidth: "var(--content-max)" }}>
        <Panel title="Returns" eyebrow="log returns, not simple returns">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <span style={{ font: "var(--type-numeric)" }}>rₜ = ln(Pₜ / Pₜ₋₁)</span>
            <span>Log returns are time-additive, so multi-period aggregation and annualization stay clean — summing daily log returns over a year gives the annual log return directly, which isn't true of simple percentage returns.</span>
          </div>
        </Panel>

        <Panel title="Volatility" eyebrow="annualized standard deviation of daily log returns">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <span style={{ font: "var(--type-numeric)" }}>σ = stdev(r) × √252</span>
            <span>Sample standard deviation (n−1, Bessel's correction), since it's estimated from a finite historical window rather than the true population of returns. √252 rather than 252 because variance scales linearly with time but volatility — a standard deviation — scales with its square root.</span>
          </div>
        </Panel>

        <Panel title="Covariance &amp; correlation" eyebrow="how holdings move together">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "var(--sp-8)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span style={{ font: "var(--type-numeric)" }}>Cov(X,Y) = Σ(Xᵢ − X̄)(Yᵢ − Ȳ) / (n − 1)</span>
              <span>The two-asset generalization of variance — Cov(X,X) = Var(X). A portfolio's covariance matrix Σ has each holding's own variance on the diagonal and pairwise covariances off it.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <span style={{ font: "var(--type-numeric)" }}>Corr(X,Y) = Cov(X,Y) / (σₓ · σᵧ)</span>
              <span>Covariance normalized to [−1, +1], so it's comparable across assets regardless of their individual scale. That's what the correlation matrix on a portfolio's stats page shows.</span>
            </div>
          </div>
        </Panel>

        <Panel title="Portfolio variance" eyebrow="the quantity a mean-variance optimizer would minimize">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <span style={{ font: "var(--type-numeric)" }}>σ²ₚ = wᵀΣw</span>
            <span>For two assets this expands to w₁²σ₁² + w₂²σ₂² + 2w₁w₂·Cov(1,2). Because that cross term shrinks as correlation drops below 1, a portfolio's volatility ends up below the weighted average of its holdings' individual volatilities — diversification, mechanically rather than as a slogan.</span>
          </div>
        </Panel>

        <Panel title="Sharpe ratio" eyebrow="excess return per unit of risk" tone="sunken">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", font: "var(--type-body)", color: "var(--text-body)" }}>
            <span style={{ font: "var(--type-numeric)" }}>Sharpe = (Rₚ − Rf) / σₚ</span>
            <span>Return in excess of a risk-free baseline — this app uses the 13-week Treasury bill (^IRX) — divided by the portfolio's volatility. It's what makes two portfolios with different returns and different risk levels comparable on a single number.</span>
          </div>
        </Panel>

        <Panel title="Limitations" tone="sunken">
          <ul style={{ margin: 0, paddingLeft: "var(--sp-6)", font: "var(--type-body)", color: "var(--text-body)", display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
            <li>Standard deviation is only a complete risk measure if returns are roughly symmetric and normal. Real markets have fat tails and volatility clustering — two assets can share a volatility number while one has occasional severe crashes the other doesn't.</li>
            <li>Covariance and correlation are estimated from one historical window and implicitly assumed stationary. In reality correlations shift with market regime, and tend to spike toward 1 during crises — exactly when diversification is needed most and least available.</li>
            <li>Prices are fetched over a one-year window. A longer window gives a more stable estimate but weights stale, less-relevant history the same as recent data.</li>
          </ul>
        </Panel>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Methodology });
