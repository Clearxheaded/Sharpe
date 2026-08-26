const { Button, Input, Field, Checkbox, Icon } = window.SharpeDesignSystem_989b45;
const { api } = window.SharpeApi;

const AUTH_MATRIX = [
  ["p4","p2","p2","0","n2"],
  ["p2","p4","p1","p1","n1"],
  ["p2","p1","p4","0","n2"],
  ["0","p1","0","p4","p2"],
  ["n2","n1","n2","p2","p4"]
];

function AuthScreen({ onAuthed }) {
  const [mode, setMode] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);

  const switchMode = (id) => { setMode(id); setError(null); };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "register") {
        await api.register(email, pw);
      }
      await api.login(email, pw, remember);
      onAuthed(email);
    } catch (err) {
      setError(err.detail || err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", minHeight: "100%", background: "var(--bg-page)" }}>
      <section style={{ background: "var(--ink-0)", padding: "var(--sp-10) var(--sp-11)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "var(--sp-10)" }}>
        <span style={{ font: "600 20px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--paper-0)" }}>Sharpe<span style={{ color: "var(--sodium-400)" }}>.</span></span>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-8)" }}>
          <h1 style={{ font: "600 30px/1.15 var(--font-display)", letterSpacing: "-0.025em", color: "var(--paper-0)", maxWidth: "22ch" }}>
            Risk and return statistics computed on your actual holdings.
          </h1>
          <p style={{ font: "var(--type-body)", color: "var(--ink-4)", maxWidth: "48ch" }}>
            Covariance, correlation, portfolio volatility and the Sharpe ratio, from daily log returns over a one-year window. Every formula and its assumptions are written down.
          </p>
          <div>
            <div style={{ display: "inline-flex", flexDirection: "column", border: "1px solid var(--rule-inverse)" }}>
              {AUTH_MATRIX.map((row, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {row.map((b, j) => <div key={j} style={{ width: 34, height: 22, background: "var(--div-" + b + ")", borderRight: "1px solid rgba(18,20,21,.5)", borderBottom: "1px solid rgba(18,20,21,.5)" }} />)}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "var(--sp-4)", font: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--ink-3)" }}>
              correlation matrix · offsetting → co-moving
            </div>
          </div>
        </div>
        <div style={{ font: "var(--type-numeric-sm)", color: "var(--ink-3)" }}>σ²ₚ = wᵀΣw</div>
      </section>

      <section style={{ display: "flex", alignItems: "center", padding: "var(--sp-10)" }}>
        <form onSubmit={submit} style={{ width: 340, display: "flex", flexDirection: "column", gap: "var(--sp-6)" }}>
          <div style={{ display: "flex", gap: "var(--sp-6)", borderBottom: "var(--border-hair)" }}>
            {[["login","Sign in"],["register","Create account"]].map(([id, label]) => (
              <button key={id} type="button" onClick={() => switchMode(id)}
                style={{ background: "none", border: "none", borderBottom: "2px solid " + (mode === id ? "var(--accent)" : "transparent"),
                  marginBottom: -1, padding: "var(--sp-3) 0 var(--sp-4)", font: "var(--type-h3)",
                  color: mode === id ? "var(--text-primary)" : "var(--text-secondary)", cursor: "pointer" }}>{label}</button>
            ))}
          </div>
          <Field label="Email" htmlFor="email" required>
            <Input id="email" size="lg" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Password" htmlFor="pw" required hint={mode === "register" ? "Minimum 8 characters." : null}>
            <Input id="pw" size="lg" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
          </Field>
          {mode === "login" ? <Checkbox checked={remember} onChange={setRemember} label="Keep me signed in on this device" /> : null}
          {error ? (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", font: "var(--type-body-sm)", color: "var(--state-danger)" }}>
              <Icon name="triangle-alert" size={14} />
              <span>{error}</span>
            </div>
          ) : null}
          <Button type="submit" variant="primary" size="lg" block disabled={busy || !email || !pw}>
            {busy ? (mode === "login" ? "Signing in…" : "Creating account…") : (mode === "login" ? "Sign in" : "Create account")}
          </Button>
          <p style={{ font: "var(--type-body-sm)", color: "var(--text-label)" }}>
            {mode === "login" ? "No account yet? " : "Already registered? "}
            <a href="#" onClick={(e) => { e.preventDefault(); switchMode(mode === "login" ? "register" : "login"); }}>
              {mode === "login" ? "Create one" : "Sign in"}
            </a>.
          </p>
        </form>
      </section>
    </div>
  );
}

Object.assign(window, { AuthScreen });
