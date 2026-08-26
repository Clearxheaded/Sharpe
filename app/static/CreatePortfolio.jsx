const { Button, Input, Field, Panel, IconButton, Badge, WeightBar, Icon } = window.SharpeDesignSystem_989b45;
const { api } = window.SharpeApi;

function CreatePortfolio({ portfolioId, onCancel, onSave }) {
  const isEditing = portfolioId != null;
  const [loading, setLoading] = React.useState(isEditing);
  const [loadError, setLoadError] = React.useState(null);
  const [name, setName] = React.useState("");
  const [rows, setRows] = React.useState([{ ticker: "", weight: "" }]);
  const [saving, setSaving] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  React.useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    api.getPortfolio(portfolioId).then((p) => {
      if (cancelled) return;
      setName(p.name);
      setRows(p.holdings.map((h) => ({ ticker: h.ticker, weight: (h.weight * 100).toFixed(1) })));
    }).catch((err) => {
      if (!cancelled) setLoadError(err.detail || err.message || "Failed to load portfolio.");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [portfolioId]);

  const total = rows.reduce((s, r) => s + (parseFloat(r.weight) || 0), 0);
  const balanced = Math.abs(total - 100) < 0.05 && rows.some((r) => r.ticker.trim());
  const set = (i, key, v) => setRows(rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const add = () => setRows(rows.concat([{ ticker: "", weight: "" }]));
  const remove = (i) => setRows(rows.filter((_, j) => j !== i));
  const equalise = () => { const w = (100 / rows.length).toFixed(1); setRows(rows.map((r) => ({ ...r, weight: w }))); };

  const submit = async () => {
    setSubmitError(null);
    setSaving(true);
    try {
      const holdings = rows
        .filter((r) => r.ticker.trim())
        .map((r) => ({ ticker: r.ticker.trim().toUpperCase(), weight: (parseFloat(r.weight) || 0) / 100 }));
      const result = isEditing
        ? await api.updatePortfolio(portfolioId, name, holdings)
        : await api.createPortfolio(name, holdings);
      onSave(result.id);
    } catch (err) {
      setSubmitError(err.detail || err.message || "Failed to save portfolio.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <React.Fragment>
        <PageHeader eyebrow="portfolios / edit" title="Loading portfolio…" />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PageHeader eyebrow={isEditing ? "portfolios / edit" : "portfolios / new"} title={isEditing ? "Edit holdings" : "Create portfolio"}
        meta={<React.Fragment><span>{rows.length} rows</span><span style={{ color: "var(--rule-strong)" }}>/</span><span>weights must sum to 100%</span></React.Fragment>}
        actions={<React.Fragment>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" disabled={!balanced || saving} onClick={submit}>{saving ? "Saving…" : "Save & compute"}</Button>
        </React.Fragment>} />
      <div style={{ padding: "var(--sp-8)", display: "flex", flexDirection: "column", gap: "var(--sp-6)", maxWidth: "var(--content-max)" }}>
        {loadError ? (
          <Panel tone="sunken"><span style={{ color: "var(--state-danger)" }}>{loadError}</span></Panel>
        ) : null}
        {submitError ? (
          <Panel tone="sunken">
            <span style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", color: "var(--state-danger)" }}>
              <Icon name="triangle-alert" size={14} /><span>{submitError}</span>
            </span>
          </Panel>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: "var(--sp-6)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-6)" }}>
            <Panel title="Definition">
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,360px) 140px", gap: "var(--sp-6)" }}>
                <Field label="Portfolio name" required htmlFor="pname" hint="Shown in your portfolio list.">
                  <Input id="pname" value={name} placeholder="e.g. Core equity + gold" onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Return window" hint="Daily closes.">
                  <Input mono align="right" value="1Y" disabled />
                </Field>
              </div>
            </Panel>

            <Panel title="Holdings" eyebrow={rows.length + " rows"} pad={false}
              actions={<React.Fragment>
                <Button size="sm" variant="ghost" onClick={equalise}>Equal weight</Button>
                <Button size="sm" variant="secondary" icon="plus" onClick={add}>Add row</Button>
              </React.Fragment>}
              footnote={balanced
                ? "Weights sum to 100.0%. Ready to compute."
                : "Weights sum to " + total.toFixed(1) + "%. The API rejects anything more than 0.0001 away from 1.0."}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                  {[["#", "right", 44], ["Ticker", "left", null], ["Weight", "right", 180], ["", "right", 56]].map(([h, a, w], i) => (
                    <th key={i} style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-label)", textAlign: a, padding: "var(--sp-3) var(--cell-pad-x)", background: "var(--surface-header)", borderBottom: "var(--border-hair)", width: w || undefined }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "var(--border-soft)" }}>
                      <td style={{ padding: "var(--sp-3) var(--cell-pad-x)", textAlign: "right", font: "var(--type-numeric-sm)", color: "var(--text-label)" }}>{i + 1}</td>
                      <td style={{ padding: "var(--sp-3) var(--cell-pad-x)" }}>
                        <Input mono value={r.ticker} placeholder="e.g. VTI" onChange={(e) => set(i, "ticker", e.target.value.toUpperCase())} style={{ maxWidth: 200 }} />
                      </td>
                      <td style={{ padding: "var(--sp-3) var(--cell-pad-x)" }}>
                        <Input mono align="right" suffix="%" value={r.weight} onChange={(e) => set(i, "weight", e.target.value)} />
                      </td>
                      <td style={{ padding: "var(--sp-3) var(--cell-pad-x)", textAlign: "right" }}>
                        <IconButton name="trash-2" label={"Remove row " + (i + 1)} size="sm" tone="danger" disabled={rows.length <= 1} onClick={() => remove(i)} />
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: "var(--surface-header)", borderTop: "var(--border-hair)" }}>
                    <td />
                    <td style={{ padding: "var(--sp-4) var(--cell-pad-x)", font: "var(--type-h3)", color: "var(--text-primary)" }}>Total</td>
                    <td style={{ padding: "var(--sp-4) var(--cell-pad-x)", textAlign: "right" }}>
                      <span style={{ font: "var(--type-numeric)", color: balanced ? "var(--value-positive)" : "var(--state-danger)", paddingRight: 22 }}>{total.toFixed(1)}%</span>
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </Panel>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-6)" }}>
            <Panel title="Allocation" eyebrow={balanced ? "balanced" : "unbalanced"}>
              <WeightBar showLegend segments={rows.filter((r) => r.ticker).map((r) => ({ label: r.ticker, value: parseFloat(r.weight) || 0, display: (parseFloat(r.weight) || 0).toFixed(1) + "%" }))} />
              <div style={{ marginTop: "var(--sp-6)", display: "flex", alignItems: "center", gap: "var(--sp-4)" }}>
                <Badge tone={balanced ? "positive" : "negative"}>{balanced ? "sums to 100%" : "≠ 100%"}</Badge>
                <span style={{ font: "var(--type-numeric-sm)", color: "var(--text-secondary)" }}>{rows.filter((r) => r.ticker).length} tickers</span>
              </div>
            </Panel>
            <Panel title="Rules" tone="sunken">
              <ul style={{ margin: 0, paddingLeft: "var(--sp-6)", font: "var(--type-body)", color: "var(--text-body)", display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
                <li>Weights must sum to exactly 100%. No short positions.</li>
                <li>Tickers are validated against available price history; unknown symbols are rejected with a 404.</li>
                <li>Holdings need overlapping trading history — the returns matrix drops any date either side is missing.</li>
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { CreatePortfolio });
