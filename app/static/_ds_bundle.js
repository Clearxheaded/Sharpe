/* @ds-bundle: {"format":4,"namespace":"SharpeDesignSystem_989b45","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Metric","sourcePath":"components/core/Metric.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DIVERGING","sourcePath":"components/data/MatrixGrid.jsx"},{"name":"MatrixGrid","sourcePath":"components/data/MatrixGrid.jsx"},{"name":"ScaleLegend","sourcePath":"components/data/ScaleLegend.jsx"},{"name":"WeightBar","sourcePath":"components/data/WeightBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"1487671748ba","components/core/Button.jsx":"cabd720d15c3","components/core/Icon.jsx":"ed9d389cec22","components/core/IconButton.jsx":"b684e0a701ca","components/core/Metric.jsx":"a7dfa61a0771","components/core/Panel.jsx":"049db2dddf37","components/core/Tabs.jsx":"65c051e1254b","components/data/DataTable.jsx":"882bca99a5c7","components/data/MatrixGrid.jsx":"9d703154f00f","components/data/ScaleLegend.jsx":"fae0b31d603b","components/data/WeightBar.jsx":"0c57e12b4b2b","components/forms/Checkbox.jsx":"a8f977c410e7","components/forms/Field.jsx":"18f35908a5ba","components/forms/Input.jsx":"47f3ce0503d3","components/forms/Select.jsx":"fe1ef441631a","ui_kits/sharpe-app/App.jsx":"8aef155dd2a2","ui_kits/sharpe-app/AppShell.jsx":"66d9bbcc66e7","ui_kits/sharpe-app/AuthScreen.jsx":"382f5844e793","ui_kits/sharpe-app/CreatePortfolio.jsx":"848942602d9e","ui_kits/sharpe-app/PortfolioList.jsx":"67df5373fa0d","ui_kits/sharpe-app/PortfolioStats.jsx":"a403508f5106","ui_kits/sharpe-app/data.js":"7fa97ea79079"},"inlinedExternals":[],"unexposedExports":[{"name":"divergingColor","sourcePath":"components/data/MatrixGrid.jsx"}]} */

(() => {

const __ds_ns = (window.SharpeDesignSystem_989b45 = window.SharpeDesignSystem_989b45 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  neutral: {
    background: "var(--paper-2)",
    color: "var(--text-secondary)",
    borderColor: "var(--rule)"
  },
  accent: {
    background: "var(--accent-wash)",
    color: "var(--sodium-700)",
    borderColor: "var(--sodium-200)"
  },
  positive: {
    background: "var(--state-ok-wash)",
    color: "var(--teal-700)",
    borderColor: "var(--teal-200)"
  },
  negative: {
    background: "var(--state-danger-wash)",
    color: "var(--crimson-600)",
    borderColor: "var(--crimson-100)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-label)",
    borderColor: "var(--rule)"
  }
};
function Badge({
  children,
  tone = "neutral",
  mono = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: "18px",
      padding: "0 var(--sp-3)",
      border: "1px solid",
      borderRadius: "var(--radius-1)",
      font: mono ? "var(--type-label)" : "var(--fw-semibold) var(--fs-200)/1.2 var(--font-ui)",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...TONE[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 14,
  color = "currentColor",
  base,
  style,
  ...rest
}) {
  const root = base || typeof window !== "undefined" && window.SHARPE_ICON_BASE || "assets/icons";
  const url = root.replace(/\/$/, "") + "/" + name + ".svg";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      backgroundColor: color,
      WebkitMaskImage: "url(" + url + ")",
      maskImage: "url(" + url + ")",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  primary: {
    background: "var(--accent)",
    color: "var(--text-inverse)",
    borderColor: "var(--accent)"
  },
  secondary: {
    background: "var(--paper-0)",
    color: "var(--text-primary)",
    borderColor: "var(--rule-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    borderColor: "transparent"
  },
  danger: {
    background: "var(--paper-0)",
    color: "var(--state-danger)",
    borderColor: "var(--crimson-100)"
  }
};
const HOVER = {
  primary: {
    background: "var(--accent-hover)",
    borderColor: "var(--accent-hover)"
  },
  secondary: {
    background: "var(--paper-1)",
    borderColor: "var(--ink-3)"
  },
  ghost: {
    background: "var(--paper-2)",
    color: "var(--text-primary)"
  },
  danger: {
    background: "var(--state-danger-wash)",
    borderColor: "var(--crimson-500)"
  }
};
const SIZE = {
  sm: {
    height: "var(--control-h-sm)",
    padding: "0 var(--sp-4)",
    fontSize: "var(--fs-300)"
  },
  md: {
    height: "var(--control-h)",
    padding: "0 var(--sp-5)",
    fontSize: "var(--fs-400)"
  },
  lg: {
    height: "var(--control-h-lg)",
    padding: "0 var(--sp-6)",
    fontSize: "var(--fs-500)"
  }
};
function Button({
  children,
  variant = "secondary",
  size = "md",
  icon,
  iconAfter,
  disabled,
  block,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tone = TONE[variant] || TONE.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--sp-3)",
      border: "1px solid",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-ui)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--tracking-tight)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "var(--transition-control)",
      whiteSpace: "nowrap",
      ...SIZE[size],
      ...tone,
      ...(hover && !disabled ? HOVER[variant] : null),
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? 16 : 14
  }) : null, children, iconAfter ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: size === "lg" ? 16 : 14
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  name,
  label,
  size = "md",
  tone = "default",
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const edge = size === "sm" ? "var(--control-h-sm)" : "var(--control-h)";
  const color = tone === "danger" ? "var(--state-danger)" : "var(--text-secondary)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      width: edge,
      height: edge,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid " + (hover && !disabled ? "var(--rule-strong)" : "transparent"),
      borderRadius: "var(--radius-1)",
      background: hover && !disabled ? tone === "danger" ? "var(--state-danger-wash)" : "var(--paper-2)" : "transparent",
      color: color,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.35 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === "sm" ? 13 : 15
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Metric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Metric({
  label,
  value,
  unit,
  delta,
  deltaTone,
  note,
  size = "md",
  emphasis = false,
  style,
  ...rest
}) {
  const font = size === "lg" ? "var(--type-display)" : size === "sm" ? "var(--type-numeric)" : "var(--type-metric)";
  const tone = deltaTone === "positive" ? "var(--value-positive)" : deltaTone === "negative" ? "var(--value-negative)" : "var(--value-neutral)";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)",
      minWidth: 0,
      paddingLeft: emphasis ? "var(--sp-5)" : 0,
      borderLeft: emphasis ? "2px solid var(--accent)" : "none",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-2)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: font,
      letterSpacing: "var(--tracking-display)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric)",
      color: "var(--text-label)"
    }
  }, unit) : null, delta ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric-sm)",
      color: tone,
      marginLeft: "var(--sp-3)"
    }
  }, delta) : null), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-secondary)"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Metric.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Panel({
  title,
  eyebrow,
  actions,
  footnote,
  children,
  pad = true,
  tone = "default",
  style,
  bodyStyle,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      background: tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-panel)",
      border: "var(--border-hair)",
      borderRadius: "var(--radius-1)",
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      ...style
    }
  }), (title || actions || eyebrow) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-5)",
      minHeight: "36px",
      padding: "var(--sp-3) var(--sp-5)",
      borderBottom: "var(--border-hair)",
      background: "var(--surface-header)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-4)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-tight)",
      whiteSpace: "nowrap"
    }
  }, title), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, eyebrow) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, actions) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad ? "var(--panel-pad-tight)" : 0,
      flex: 1,
      minWidth: 0,
      ...bodyStyle
    }
  }, children), footnote ? /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "var(--border-soft)",
      padding: "var(--sp-3) var(--sp-5)",
      font: "var(--type-body-sm)",
      color: "var(--text-label)"
    }
  }, footnote) : null);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: "var(--sp-6)",
      borderBottom: "var(--border-hair)",
      ...style
    }
  }), items.map(it => {
    const key = it.id || it;
    const active = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(key),
      style: {
        appearance: "none",
        background: "none",
        border: "none",
        borderBottom: "2px solid " + (active ? "var(--accent)" : "transparent"),
        padding: "var(--sp-3) 0 var(--sp-4)",
        marginBottom: "-1px",
        font: "var(--type-h3)",
        color: active ? "var(--text-primary)" : "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "var(--sp-3)",
        transition: "var(--transition-control)"
      }
    }, it.label || it, it.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-label)",
        letterSpacing: "var(--tracking-caps)",
        color: "var(--text-label)"
      }
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  rowKey,
  onRowClick,
  dense = false,
  zebra = true,
  footer,
  empty = "No rows.",
  style,
  ...rest
}) {
  const padY = dense ? "var(--sp-2)" : "var(--cell-pad-y)";
  return /*#__PURE__*/React.createElement("table", _extends({}, rest, {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      ...style
    }
  }), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)",
      textAlign: c.align || "left",
      padding: padY + " var(--cell-pad-x)",
      background: "var(--surface-header)",
      borderBottom: "var(--border-hair)",
      whiteSpace: "nowrap",
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: "var(--sp-8) var(--cell-pad-x)",
      color: "var(--text-label)",
      font: "var(--type-body)",
      textAlign: "center"
    }
  }, empty)) : rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey ? rowKey(r, i) : i,
    onClick: onRowClick ? () => onRowClick(r, i) : undefined,
    style: {
      background: zebra && i % 2 === 1 ? "var(--surface-row-alt)" : "transparent",
      borderBottom: "var(--border-soft)",
      cursor: onRowClick ? "pointer" : "default",
      height: dense ? "var(--row-h)" : "var(--row-h-lg)"
    },
    onMouseEnter: e => {
      if (onRowClick) e.currentTarget.style.background = "var(--paper-2)";
    },
    onMouseLeave: e => {
      if (onRowClick) e.currentTarget.style.background = zebra && i % 2 === 1 ? "var(--surface-row-alt)" : "transparent";
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: padY + " var(--cell-pad-x)",
      textAlign: c.align || "left",
      font: c.mono ? "var(--type-numeric)" : "var(--type-body)",
      fontVariantNumeric: "tabular-nums",
      color: c.muted ? "var(--text-secondary)" : "var(--text-primary)",
      whiteSpace: c.wrap ? "normal" : "nowrap"
    }
  }, c.render ? c.render(r, i) : r[c.key]))))), footer ? /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--surface-header)",
      borderTop: "var(--border-hair)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: padY + " var(--cell-pad-x)",
      textAlign: c.align || "left",
      font: c.mono ? "var(--type-numeric)" : "var(--fw-semibold) var(--fs-400)/var(--lh-snug) var(--font-ui)",
      color: "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, footer[c.key])))) : null);
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/MatrixGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DIVERGING = ["var(--div-n4)", "var(--div-n3)", "var(--div-n2)", "var(--div-n1)", "var(--div-0)", "var(--div-p1)", "var(--div-p2)", "var(--div-p3)", "var(--div-p4)"];
function divergingColor(v, max) {
  const m = max || 1;
  const t = Math.max(-1, Math.min(1, (v || 0) / m));
  const bin = Math.max(0, Math.min(8, Math.round(t * 4) + 4));
  return {
    background: DIVERGING[bin],
    color: bin <= 1 || bin >= 7 ? "var(--div-on-dark)" : "var(--div-on-light)"
  };
}
function MatrixGrid({
  tickers = [],
  matrix = {},
  format,
  max = 1,
  cell = 56,
  diagonal = "value",
  onCellHover,
  style,
  ...rest
}) {
  const fmt = format || (v => v == null ? "—" : v.toFixed(2));
  const head = {
    font: "var(--type-label)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--text-secondary)",
    background: "var(--surface-header)",
    padding: "var(--sp-3) var(--sp-4)",
    borderBottom: "var(--border-hair)",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      overflow: "auto",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "separate",
      borderSpacing: 0,
      width: "auto",
      minWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...head,
      textAlign: "left",
      left: 0,
      zIndex: 2,
      borderRight: "var(--border-hair)"
    }
  }), tickers.map(t => /*#__PURE__*/React.createElement("th", {
    key: t,
    style: {
      ...head,
      minWidth: cell
    }
  }, t)))), /*#__PURE__*/React.createElement("tbody", null, tickers.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row",
    style: {
      font: "var(--type-ticker)",
      color: "var(--text-primary)",
      background: "var(--surface-header)",
      padding: "0 var(--sp-4)",
      textAlign: "left",
      borderRight: "var(--border-hair)",
      borderBottom: "1px solid var(--paper-0)",
      position: "sticky",
      left: 0,
      whiteSpace: "nowrap"
    }
  }, r), tickers.map(c => {
    const v = matrix[r] ? matrix[r][c] : null;
    const isDiag = r === c;
    const paint = divergingColor(v, max);
    const muted = isDiag && diagonal === "muted";
    return /*#__PURE__*/React.createElement("td", {
      key: c,
      onMouseEnter: onCellHover ? () => onCellHover({
        row: r,
        col: c,
        value: v
      }) : undefined,
      onMouseLeave: onCellHover ? () => onCellHover(null) : undefined,
      style: {
        font: "var(--type-numeric)",
        fontVariantNumeric: "tabular-nums",
        textAlign: "right",
        padding: "var(--sp-3) var(--sp-4)",
        minWidth: cell,
        height: "var(--row-h)",
        background: muted ? "var(--paper-2)" : paint.background,
        color: muted ? "var(--text-label)" : paint.color,
        borderRight: "1px solid rgba(251,250,247,.55)",
        borderBottom: "1px solid rgba(251,250,247,.55)",
        outline: isDiag ? "1px solid var(--ink-0)" : "none",
        outlineOffset: "-1px",
        cursor: onCellHover ? "crosshair" : "default"
      }
    }, fmt(v));
  }))))));
}
Object.assign(__ds_scope, { DIVERGING, divergingColor, MatrixGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MatrixGrid.jsx", error: String((e && e.message) || e) }); }

// components/data/ScaleLegend.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ScaleLegend({
  min = "−1.0",
  mid = "0",
  max = "+1.0",
  caption,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)",
      ...style
    }
  }), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, caption) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric-sm)",
      color: "var(--text-secondary)"
    }
  }, min), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      border: "var(--border-hair)"
    }
  }, __ds_scope.DIVERGING.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 16,
      height: 10,
      background: c
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric-sm)",
      color: "var(--text-secondary)"
    }
  }, max));
}
Object.assign(__ds_scope, { ScaleLegend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScaleLegend.jsx", error: String((e && e.message) || e) }); }

// components/data/WeightBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SERIES = ["var(--sodium-500)", "var(--teal-600)", "var(--sodium-700)", "var(--teal-500)", "var(--sodium-400)", "var(--teal-700)", "var(--sodium-200)", "var(--teal-200)"];
function WeightBar({
  segments = [],
  height = 8,
  showLegend = false,
  style,
  ...rest
}) {
  const total = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-4)",
      minWidth: 0,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: height,
      width: "100%",
      border: "var(--border-hair)",
      background: "var(--paper-2)",
      overflow: "hidden"
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label || i,
    title: s.label,
    style: {
      width: 100 * (s.value || 0) / total + "%",
      background: s.color || SERIES[i % SERIES.length]
    }
  }))), showLegend ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--sp-3) var(--sp-6)"
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: s.label || i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      font: "var(--type-numeric-sm)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: s.color || SERIES[i % SERIES.length]
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      fontWeight: "var(--fw-bold)"
    }
  }, s.label), s.display != null ? s.display : Math.round(1000 * (s.value || 0) / total) / 10 + "%"))) : null);
}
Object.assign(__ds_scope, { WeightBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/WeightBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled,
  iconBase,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-4)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      font: "var(--type-body)",
      color: "var(--text-body)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 15,
      height: 15,
      flex: "0 0 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: checked ? "var(--accent)" : "var(--paper-0)",
      border: "1px solid " + (checked ? "var(--accent)" : "var(--rule-strong)"),
      borderRadius: "var(--radius-1)",
      transition: "var(--transition-control)"
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 11,
    color: "var(--text-inverse)",
    base: iconBase || "assets/icons"
  }) : null), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  inline,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: inline ? "row" : "column",
      alignItems: inline ? "center" : "stretch",
      gap: inline ? "var(--sp-4)" : "var(--sp-3)",
      minWidth: 0,
      ...style
    }
  }), label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)",
      display: "flex",
      gap: "var(--sp-2)",
      whiteSpace: "nowrap"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "*") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--state-danger)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-label)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  mono = false,
  invalid = false,
  align = "left",
  suffix,
  size = "md",
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === "lg" ? "var(--control-h-lg)" : size === "sm" ? "var(--control-h-sm)" : "var(--control-h)";
  const field = /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      height: height,
      width: "100%",
      minWidth: 0,
      padding: "0 var(--sp-4)",
      background: "var(--paper-0)",
      color: "var(--text-primary)",
      border: "1px solid " + (invalid ? "var(--state-danger)" : focus ? "var(--accent)" : "var(--rule-strong)"),
      borderRadius: "var(--radius-1)",
      outline: "none",
      boxShadow: focus ? "inset 0 0 0 1px var(--accent)" : "none",
      font: mono ? "var(--type-numeric)" : "var(--type-body)",
      textAlign: align,
      fontVariantNumeric: "tabular-nums",
      transition: "var(--transition-control)",
      ...style
    }
  }));
  if (!suffix) return field;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      minWidth: 0
    }
  }, field, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric)",
      color: "var(--text-label)"
    }
  }, suffix));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  mono = false,
  size = "md",
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === "lg" ? "var(--control-h-lg)" : size === "sm" ? "var(--control-h-sm)" : "var(--control-h)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      height: height,
      width: "100%",
      padding: "0 var(--sp-8) 0 var(--sp-4)",
      background: "var(--paper-0)",
      color: "var(--text-primary)",
      border: "1px solid " + (invalid ? "var(--state-danger)" : focus ? "var(--accent)" : "var(--rule-strong)"),
      borderRadius: "var(--radius-1)",
      font: mono ? "var(--type-numeric)" : "var(--type-body)",
      outline: "none",
      cursor: "pointer",
      transition: "var(--transition-control)",
      ...style
    }
  }), options.map(o => {
    const v = o.value !== undefined ? o.value : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, o.label !== undefined ? o.label : o);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "var(--sp-4)",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-label)",
      font: "var(--type-body-sm)"
    }
  }, "\u25BE"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/App.jsx
try { (() => {
function App({
  initialRoute
}) {
  const D = window.SHARPE_DATA;
  const [authed, setAuthed] = React.useState(initialRoute !== "auth");
  const [email, setEmail] = React.useState(D.user.email);
  const [route, setRoute] = React.useState(initialRoute === "auth" ? "auth" : initialRoute || "list");
  const [portfolioId, setPortfolioId] = React.useState(4);
  const portfolio = D.portfolios.find(p => p.id === portfolioId) || D.portfolios[0];
  if (!authed || route === "auth") {
    return /*#__PURE__*/React.createElement(AuthScreen, {
      onAuthed: e => {
        setEmail(e);
        setAuthed(true);
        setRoute("list");
      }
    });
  }
  const navigate = (r, id) => {
    if (id != null) setPortfolioId(id);
    setRoute(r);
  };
  return /*#__PURE__*/React.createElement(AppShell, {
    email: email,
    portfolios: D.portfolios,
    route: route,
    portfolioId: portfolioId,
    onNavigate: navigate,
    onSignOut: () => {
      setAuthed(false);
      setRoute("auth");
    }
  }, route === "list" ? /*#__PURE__*/React.createElement(PortfolioList, {
    portfolios: D.portfolios,
    onOpen: id => navigate("stats", id),
    onCreate: () => setRoute("create")
  }) : null, route === "create" ? /*#__PURE__*/React.createElement(CreatePortfolio, {
    onCancel: () => setRoute("list"),
    onSave: () => navigate("stats", 4)
  }) : null, route === "stats" ? /*#__PURE__*/React.createElement(PortfolioStats, {
    portfolio: portfolio,
    stats: portfolioId === 4 ? D.stats : D.stats,
    onEdit: () => setRoute("create")
  }) : null);
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/AppShell.jsx
try { (() => {
const {
  Icon,
  Badge,
  IconButton
} = window.SharpeDesignSystem_989b45;
function Wordmark({
  dark
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 17px/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: dark ? "var(--paper-0)" : "var(--ink-0)"
    }
  }, "Sharpe", /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? "var(--sodium-400)" : "var(--accent)"
    }
  }, "."));
}
function NavItem({
  icon,
  label,
  active,
  onClick,
  meta
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)",
      width: "100%",
      height: 28,
      padding: "0 var(--sp-5)",
      background: active ? "var(--paper-2)" : h ? "var(--surface-row-alt)" : "transparent",
      border: "none",
      borderLeft: "2px solid " + (active ? "var(--accent)" : "transparent"),
      color: active ? "var(--text-primary)" : "var(--text-secondary)",
      font: active ? "var(--type-h3)" : "var(--type-body)",
      cursor: "pointer",
      textAlign: "left",
      transition: "var(--transition-control)"
    }
  }, icon ? /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, label), meta != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric-sm)",
      color: "var(--text-label)"
    }
  }, meta) : null);
}
function AppShell({
  email,
  portfolios,
  route,
  portfolioId,
  onNavigate,
  onSignOut,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "var(--sidebar-w) 1fr",
      minHeight: "100%",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: "var(--border-hair)",
      background: "var(--paper-1)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--topbar-h)",
      display: "flex",
      alignItems: "center",
      padding: "0 var(--sp-5)",
      borderBottom: "var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-5) 0 var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--sp-5) var(--sp-3)"
    },
    className: "label"
  }, "workspace"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "layers",
    label: "Portfolios",
    active: route === "list",
    meta: portfolios.length,
    onClick: () => onNavigate("list")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "sigma",
    label: "Methodology",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "settings",
    label: "Settings",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-4) 0",
      borderTop: "var(--border-soft)",
      overflow: "auto",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--sp-5) var(--sp-3)"
    },
    className: "label"
  }, "saved"), portfolios.map(p => /*#__PURE__*/React.createElement(NavItem, {
    key: p.id,
    label: p.name,
    active: route === "stats" && portfolioId === p.id,
    meta: p.tickers.length,
    onClick: () => onNavigate("stats", p.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--border-hair)",
      padding: "var(--sp-4) var(--sp-5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-secondary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, email), /*#__PURE__*/React.createElement(IconButton, {
    name: "log-out",
    label: "Sign out",
    size: "sm",
    onClick: onSignOut
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      minWidth: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, children));
}
function PageHeader({
  title,
  eyebrow,
  meta,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "var(--border-hair)",
      background: "var(--paper-1)",
      padding: "var(--sp-6) var(--sp-8)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--sp-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)",
      minWidth: 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h1)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, title), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-5)",
      font: "var(--type-numeric-sm)",
      color: "var(--text-secondary)"
    }
  }, meta) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)"
    }
  }, actions) : null);
}
Object.assign(window, {
  AppShell,
  PageHeader,
  Wordmark,
  NavItem
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/AuthScreen.jsx
try { (() => {
const {
  Button,
  Input,
  Field,
  Checkbox,
  ScaleLegend
} = window.SharpeDesignSystem_989b45;
const AUTH_MATRIX = [["p4", "p2", "p2", "0", "n2"], ["p2", "p4", "p1", "p1", "n1"], ["p2", "p1", "p4", "0", "n2"], ["0", "p1", "0", "p4", "p2"], ["n2", "n1", "n2", "p2", "p4"]];
function AuthScreen({
  onAuthed
}) {
  const [mode, setMode] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const submit = e => {
    e.preventDefault();
    onAuthed(email || "m.okonkwo@gmail.com");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      minHeight: "100%",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--ink-0)",
      padding: "var(--sp-10) var(--sp-11)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 20px/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--paper-0)"
    }
  }, "Sharpe", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sodium-400)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "600 30px/1.15 var(--font-display)",
      letterSpacing: "-0.025em",
      color: "var(--paper-0)",
      maxWidth: "22ch"
    }
  }, "Risk and return statistics computed on your actual holdings."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--ink-4)",
      maxWidth: "48ch"
    }
  }, "Covariance, correlation, portfolio volatility and the Sharpe ratio, from daily log returns over a five-year window. Every formula and its assumptions are written down."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      border: "1px solid var(--rule-inverse)"
    }
  }, AUTH_MATRIX.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex"
    }
  }, row.map((b, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      width: 34,
      height: 22,
      background: "var(--div-" + b + ")",
      borderRight: "1px solid rgba(18,20,21,.5)",
      borderBottom: "1px solid rgba(18,20,21,.5)"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-4)",
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, "correlation matrix \xB7 offsetting \u2192 co-moving"))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-numeric-sm)",
      color: "var(--ink-3)"
    }
  }, "\u03C3\xB2\u209A = w\u1D40\u03A3w")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      width: 340,
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-6)",
      borderBottom: "var(--border-hair)"
    }
  }, [["login", "Sign in"], ["register", "Create account"]].map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    type: "button",
    onClick: () => setMode(id),
    style: {
      background: "none",
      border: "none",
      borderBottom: "2px solid " + (mode === id ? "var(--accent)" : "transparent"),
      marginBottom: -1,
      padding: "var(--sp-3) 0 var(--sp-4)",
      font: "var(--type-h3)",
      color: mode === id ? "var(--text-primary)" : "var(--text-secondary)",
      cursor: "pointer"
    }
  }, label))), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "email",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    id: "email",
    size: "lg",
    type: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    htmlFor: "pw",
    required: true,
    hint: mode === "register" ? "Minimum 8 characters." : null
  }, /*#__PURE__*/React.createElement(Input, {
    id: "pw",
    size: "lg",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pw,
    onChange: e => setPw(e.target.value)
  })), mode === "login" ? /*#__PURE__*/React.createElement(Checkbox, {
    checked: remember,
    onChange: setRemember,
    label: "Keep me signed in on this device"
  }) : null, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    block: true
  }, mode === "login" ? "Sign in" : "Create account"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-label)"
    }
  }, mode === "login" ? "No account yet? " : "Already registered? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode(mode === "login" ? "register" : "login");
    }
  }, mode === "login" ? "Create one" : "Sign in"), "."))));
}
Object.assign(window, {
  AuthScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/AuthScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/CreatePortfolio.jsx
try { (() => {
const {
  Button,
  Input,
  Field,
  Panel,
  IconButton,
  Badge,
  WeightBar,
  DataTable
} = window.SharpeDesignSystem_989b45;
function CreatePortfolio({
  onCancel,
  onSave
}) {
  const [name, setName] = React.useState("Core equity + gold");
  const [rows, setRows] = React.useState([{
    ticker: "AAPL",
    weight: "30.0"
  }, {
    ticker: "MSFT",
    weight: "20.0"
  }, {
    ticker: "NVDA",
    weight: "15.0"
  }, {
    ticker: "GLD",
    weight: "20.0"
  }, {
    ticker: "TLT",
    weight: "15.0"
  }]);
  const total = rows.reduce((s, r) => s + (parseFloat(r.weight) || 0), 0);
  const balanced = Math.abs(total - 100) < 0.05;
  const set = (i, key, v) => setRows(rows.map((r, j) => j === i ? {
    ...r,
    [key]: v
  } : r));
  const add = () => setRows(rows.concat([{
    ticker: "",
    weight: ""
  }]));
  const remove = i => setRows(rows.filter((_, j) => j !== i));
  const equalise = () => {
    const w = (100 / rows.length).toFixed(1);
    setRows(rows.map(r => ({
      ...r,
      weight: w
    })));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "portfolios / new",
    title: "Create portfolio",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, rows.length, " rows"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--rule-strong)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", null, "weights must sum to 100%")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onCancel
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      disabled: !balanced,
      onClick: onSave
    }, "Save & compute"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-8)",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 320px",
      gap: "var(--sp-6)",
      alignItems: "start",
      maxWidth: "var(--content-max)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Definition"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,360px) 140px",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Portfolio name",
    required: true,
    htmlFor: "pname",
    hint: "Shown in your portfolio list."
  }, /*#__PURE__*/React.createElement(Input, {
    id: "pname",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Return window",
    hint: "Daily closes."
  }, /*#__PURE__*/React.createElement(Input, {
    mono: true,
    align: "right",
    defaultValue: "5Y"
  })))), /*#__PURE__*/React.createElement(Panel, {
    title: "Holdings",
    eyebrow: rows.length + " rows",
    pad: false,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: equalise
    }, "Equal weight"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      icon: "plus",
      onClick: add
    }, "Add row")),
    footnote: balanced ? "Weights sum to 100.0%. Ready to compute." : "Weights sum to " + total.toFixed(1) + "%. The API rejects anything more than 0.0001 away from 1.0."
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, [["#", "right", 44], ["Ticker", "left", null], ["Weight", "right", 180], ["", "right", 56]].map(([h, a, w], i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-label)",
      textAlign: a,
      padding: "var(--sp-3) var(--cell-pad-x)",
      background: "var(--surface-header)",
      borderBottom: "var(--border-hair)",
      width: w || undefined
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: "var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-3) var(--cell-pad-x)",
      textAlign: "right",
      font: "var(--type-numeric-sm)",
      color: "var(--text-label)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-3) var(--cell-pad-x)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    mono: true,
    value: r.ticker,
    placeholder: "e.g. VTI",
    onChange: e => set(i, "ticker", e.target.value.toUpperCase()),
    style: {
      maxWidth: 200
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-3) var(--cell-pad-x)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    mono: true,
    align: "right",
    suffix: "%",
    value: r.weight,
    onChange: e => set(i, "weight", e.target.value)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-3) var(--cell-pad-x)",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "trash-2",
    label: "Remove row " + (i + 1),
    size: "sm",
    tone: "danger",
    onClick: () => remove(i)
  })))), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--surface-header)",
      borderTop: "var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-4) var(--cell-pad-x)",
      font: "var(--type-h3)",
      color: "var(--text-primary)"
    }
  }, "Total"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--sp-4) var(--cell-pad-x)",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric)",
      color: balanced ? "var(--value-positive)" : "var(--state-danger)",
      paddingRight: 22
    }
  }, total.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", null)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Allocation",
    eyebrow: balanced ? "balanced" : "unbalanced"
  }, /*#__PURE__*/React.createElement(WeightBar, {
    showLegend: true,
    segments: rows.filter(r => r.ticker).map(r => ({
      label: r.ticker,
      value: parseFloat(r.weight) || 0,
      display: (parseFloat(r.weight) || 0).toFixed(1) + "%"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-6)",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: balanced ? "positive" : "negative"
  }, balanced ? "sums to 100%" : "≠ 100%"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric-sm)",
      color: "var(--text-secondary)"
    }
  }, rows.filter(r => r.ticker).length, " tickers"))), /*#__PURE__*/React.createElement(Panel, {
    title: "Rules",
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "var(--sp-6)",
      font: "var(--type-body)",
      color: "var(--text-body)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "Weights must sum to exactly 100%. No short positions."), /*#__PURE__*/React.createElement("li", null, "Tickers are validated against available price history; unknown symbols are rejected with a 404."), /*#__PURE__*/React.createElement("li", null, "Holdings need overlapping trading history \u2014 the returns matrix drops any date either side is missing."), /*#__PURE__*/React.createElement("li", null, "Up to 15 holdings. Beyond that, sample covariance estimated from a 5-year window becomes unstable."))))));
}
Object.assign(window, {
  CreatePortfolio
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/CreatePortfolio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/PortfolioList.jsx
try { (() => {
const {
  Button,
  DataTable,
  Badge,
  IconButton,
  Panel,
  Metric
} = window.SharpeDesignSystem_989b45;
function PortfolioList({
  portfolios,
  onOpen,
  onCreate
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "workspace",
    title: "Portfolios",
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, portfolios.length, " saved"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--rule-strong)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", null, "16 holdings total"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--rule-strong)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", null, "risk-free rate 3.70%")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "download"
    }, "Export all"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "plus",
      onClick: onCreate
    }, "New portfolio"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)",
      maxWidth: "var(--content-max)"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Saved portfolios",
    eyebrow: "sorted by created · newest first",
    pad: false,
    footnote: "Statistics are recomputed on open from the latest available daily closes."
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: portfolios,
    rowKey: p => p.id,
    onRowClick: p => onOpen(p.id),
    columns: [{
      key: "name",
      header: "Name",
      render: p => /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-h3)",
          color: "var(--text-primary)"
        }
      }, p.name)
    }, {
      key: "tickers",
      header: "Holdings",
      render: p => /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: "var(--sp-3)",
          alignItems: "center"
        }
      }, p.tickers.slice(0, 4).map(t => /*#__PURE__*/React.createElement("span", {
        key: t,
        style: {
          font: "var(--type-ticker)",
          color: "var(--text-body)"
        }
      }, t)), p.tickers.length > 4 ? /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-numeric-sm)",
          color: "var(--text-label)"
        }
      }, "+", p.tickers.length - 4) : null)
    }, {
      key: "count",
      header: "n",
      align: "right",
      mono: true,
      width: 56,
      render: p => p.tickers.length
    }, {
      key: "sharpe",
      header: "Sharpe",
      align: "right",
      mono: true,
      width: 90,
      render: p => p.sharpe.toFixed(3)
    }, {
      key: "created",
      header: "Created",
      align: "right",
      mono: true,
      muted: true,
      width: 120,
      render: p => p.created
    }, {
      key: "actions",
      header: "",
      align: "right",
      width: 80,
      render: () => /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: "var(--sp-2)"
        }
      }, /*#__PURE__*/React.createElement(IconButton, {
        name: "pencil",
        label: "Rename",
        size: "sm"
      }), /*#__PURE__*/React.createElement(IconButton, {
        name: "trash-2",
        label: "Delete",
        size: "sm",
        tone: "danger"
      }))
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(Metric, {
    label: "Best Sharpe",
    value: "0.723",
    size: "sm",
    note: "Core equity + gold"
  })), /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(Metric, {
    label: "Lowest volatility",
    value: "14.9%",
    size: "sm",
    note: "All-weather sketch"
  })), /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(Metric, {
    label: "Risk-free rate",
    value: "3.70%",
    size: "sm",
    note: "3-month T-bill, 20 Aug 2026"
  })), /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(Metric, {
    label: "Return window",
    value: "5Y",
    size: "sm",
    note: "1,258 daily observations"
  })))));
}
Object.assign(window, {
  PortfolioList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/PortfolioList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/PortfolioStats.jsx
try { (() => {
const {
  Button,
  Panel,
  Metric,
  DataTable,
  MatrixGrid,
  ScaleLegend,
  WeightBar,
  Badge,
  Tabs,
  IconButton
} = window.SharpeDesignSystem_989b45;
function PortfolioStats({
  portfolio,
  stats,
  onEdit
}) {
  const [hover, setHover] = React.useState(null);
  const covMax = Math.max.apply(null, stats.tickers.map(r => Math.max.apply(null, stats.tickers.map(c => Math.abs(stats.covariance_matrix[r][c])))));
  const holdings = stats.tickers.map((t, i) => ({
    ticker: t,
    weight: window.pct(stats.weights[i]),
    ret: window.pct(stats.holding_return[t]),
    vol: window.pct(stats.holding_vol[t]),
    contrib: window.pct(stats.weights[i] * stats.holding_vol[t], 2)
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "portfolios / " + portfolio.id,
    title: portfolio.name,
    meta: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, stats.tickers.length, " holdings"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--rule-strong)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", null, stats.window), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--rule-strong)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", null, "created ", portfolio.created)),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "positive"
    }, "computed"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "download"
    }, "Export CSV"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "pencil",
      onClick: onEdit
    }, "Edit holdings"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "Recompute"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(0,1fr))",
      borderBottom: "var(--border-hair)",
      background: "var(--surface-panel)"
    }
  }, [{
    label: "Portfolio return",
    value: (stats.portfolio_return * 100).toFixed(1),
    unit: "%",
    note: "annualised, weighted"
  }, {
    label: "Volatility",
    value: (stats.portfolio_volatility * 100).toFixed(1),
    unit: "%",
    note: "σₚ = √(wᵀΣw)"
  }, {
    label: "Sharpe ratio",
    value: stats.sharpe_ratio.toFixed(3),
    note: "(0.187 − 0.037) / 0.208",
    emphasis: true
  }, {
    label: "Variance",
    value: stats.portfolio_variance.toFixed(4),
    note: "wᵀΣw"
  }, {
    label: "Risk-free rate",
    value: (stats.risk_free_rate * 100).toFixed(2),
    unit: "%",
    note: "3-month T-bill"
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.label,
    style: {
      padding: "var(--sp-7) var(--sp-8)",
      borderLeft: i === 0 ? "none" : "var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    label: m.label,
    value: m.value,
    unit: m.unit,
    note: m.note,
    emphasis: m.emphasis,
    size: m.emphasis ? "lg" : "md"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)",
      maxWidth: "var(--content-max)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)",
      gap: "var(--sp-6)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Holdings",
    eyebrow: "annualised from daily log returns",
    pad: false,
    footnote: "Risk contribution is the naive weight \xD7 volatility product; it ignores cross-covariance."
  }, /*#__PURE__*/React.createElement(DataTable, {
    dense: true,
    rows: holdings,
    rowKey: r => r.ticker,
    footer: {
      ticker: "Total",
      weight: "100.0%",
      ret: window.pct(stats.portfolio_return),
      vol: window.pct(stats.portfolio_volatility),
      contrib: "—"
    },
    columns: [{
      key: "ticker",
      header: "Ticker",
      mono: true
    }, {
      key: "weight",
      header: "Weight",
      align: "right",
      mono: true
    }, {
      key: "ret",
      header: "Ann. return",
      align: "right",
      mono: true
    }, {
      key: "vol",
      header: "Ann. vol",
      align: "right",
      mono: true
    }, {
      key: "contrib",
      header: "w × σ",
      align: "right",
      mono: true,
      muted: true
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Allocation",
    eyebrow: "weights",
    footnote: "Diversification benefit: weighted-average volatility is 27.4% against a portfolio volatility of 20.8%."
  }, /*#__PURE__*/React.createElement(WeightBar, {
    height: 10,
    showLegend: true,
    segments: stats.tickers.map((t, i) => ({
      label: t,
      value: stats.weights[i],
      display: window.pct(stats.weights[i])
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-7)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-6)",
      borderTop: "var(--border-soft)",
      paddingTop: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    size: "sm",
    label: "Weighted-avg vol",
    value: "27.4%",
    note: "if all correlations were 1"
  }), /*#__PURE__*/React.createElement(Metric, {
    size: "sm",
    label: "Risk reduced",
    value: "\u22126.6 pp",
    note: "from correlations below 1"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-6)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Correlation",
    eyebrow: "pearson \xB7 unitless, \u22121 \u2192 +1",
    pad: false,
    actions: /*#__PURE__*/React.createElement(ScaleLegend, {
      caption: "offsetting \u2192 co-moving"
    }),
    footnote: hover ? hover.row + " / " + hover.col + " = " + hover.value.toFixed(2) : "Estimated from one historical window and assumed stationary; correlations spike toward 1 in a crisis."
  }, /*#__PURE__*/React.createElement(MatrixGrid, {
    tickers: stats.tickers,
    matrix: stats.correlation_matrix,
    onCellHover: setHover,
    cell: 72
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Covariance",
    eyebrow: "annualised · scale ±" + covMax.toFixed(2),
    pad: false,
    actions: /*#__PURE__*/React.createElement(ScaleLegend, {
      caption: "\u03C3\xB2 on the diagonal",
      min: "−" + covMax.toFixed(2),
      max: "+" + covMax.toFixed(2)
    }),
    footnote: "\u03A3 is the object the optimiser minimises: w\u1D40\u03A3w subject to the weight constraints."
  }, /*#__PURE__*/React.createElement(MatrixGrid, {
    tickers: stats.tickers,
    matrix: stats.covariance_matrix,
    max: covMax,
    cell: 72,
    format: v => v == null ? "—" : v.toFixed(3)
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "Method",
    tone: "sunken",
    eyebrow: "week 2\u20133 \xB7 covariance, correlation, sharpe"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0,1fr))",
      gap: "var(--sp-8)",
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "returns"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric)"
    }
  }, "r\u209C = ln(P\u209C / P\u209C\u208B\u2081)"), /*#__PURE__*/React.createElement("span", null, "Log returns are time-additive, so multi-period aggregation and annualisation stay clean.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "portfolio variance"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-numeric)"
    }
  }, "\u03C3\xB2\u209A = w\u1D40\u03A3w"), /*#__PURE__*/React.createElement("span", null, "Sample covariance uses n\u22121. Daily volatility is annualised by \u221A252.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "limitations"), /*#__PURE__*/React.createElement("span", null, "Standard deviation only describes risk fully if returns are symmetric. Real markets have fat tails and volatility clustering."))))));
}
Object.assign(window, {
  PortfolioStats
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/PortfolioStats.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sharpe-app/data.js
try { (() => {
window.SHARPE_DATA = {
  user: {
    email: "m.okonkwo@gmail.com"
  },
  portfolios: [{
    id: 4,
    name: "Core equity + gold",
    created: "2026-08-11",
    tickers: ["AAPL", "MSFT", "NVDA", "GLD", "TLT"],
    weights: [0.30, 0.20, 0.15, 0.20, 0.15],
    sharpe: 0.723
  }, {
    id: 3,
    name: "60/40 baseline",
    created: "2026-07-29",
    tickers: ["VTI", "BND"],
    weights: [0.6, 0.4],
    sharpe: 0.612
  }, {
    id: 2,
    name: "Semis concentration test",
    created: "2026-07-14",
    tickers: ["NVDA", "AMD", "TSM", "ASML"],
    weights: [0.4, 0.25, 0.2, 0.15],
    sharpe: 0.481
  }, {
    id: 1,
    name: "All-weather sketch",
    created: "2026-06-30",
    tickers: ["VTI", "TLT", "GLD", "DBC", "IEF"],
    weights: [0.3, 0.4, 0.075, 0.075, 0.15],
    sharpe: 0.539
  }],
  stats: {
    tickers: ["AAPL", "MSFT", "NVDA", "GLD", "TLT"],
    weights: [0.30, 0.20, 0.15, 0.20, 0.15],
    covariance_matrix: {
      AAPL: {
        AAPL: 0.0631,
        MSFT: 0.0402,
        NVDA: 0.0774,
        GLD: 0.0059,
        TLT: -0.0112
      },
      MSFT: {
        AAPL: 0.0402,
        MSFT: 0.0502,
        NVDA: 0.0651,
        GLD: 0.0081,
        TLT: -0.0074
      },
      NVDA: {
        AAPL: 0.0774,
        MSFT: 0.0651,
        NVDA: 0.2418,
        GLD: 0.0143,
        TLT: -0.0195
      },
      GLD: {
        AAPL: 0.0059,
        MSFT: 0.0081,
        NVDA: 0.0143,
        GLD: 0.0834,
        TLT: 0.0172
      },
      TLT: {
        AAPL: -0.0112,
        MSFT: -0.0074,
        NVDA: -0.0195,
        GLD: 0.0172,
        TLT: 0.0202
      }
    },
    correlation_matrix: {
      AAPL: {
        AAPL: 1.0,
        MSFT: 0.71,
        NVDA: 0.63,
        GLD: 0.08,
        TLT: -0.31
      },
      MSFT: {
        AAPL: 0.71,
        MSFT: 1.0,
        NVDA: 0.59,
        GLD: 0.13,
        TLT: -0.23
      },
      NVDA: {
        AAPL: 0.63,
        MSFT: 0.59,
        NVDA: 1.0,
        GLD: 0.10,
        TLT: -0.28
      },
      GLD: {
        AAPL: 0.08,
        MSFT: 0.13,
        NVDA: 0.10,
        GLD: 1.0,
        TLT: 0.42
      },
      TLT: {
        AAPL: -0.31,
        MSFT: -0.23,
        NVDA: -0.28,
        GLD: 0.42,
        TLT: 1.0
      }
    },
    holding_vol: {
      AAPL: 0.251,
      MSFT: 0.224,
      NVDA: 0.492,
      GLD: 0.289,
      TLT: 0.142
    },
    holding_return: {
      AAPL: 0.214,
      MSFT: 0.196,
      NVDA: 0.412,
      GLD: 0.091,
      TLT: 0.026
    },
    portfolio_variance: 0.0432,
    portfolio_volatility: 0.208,
    portfolio_return: 0.187,
    risk_free_rate: 0.037,
    sharpe_ratio: 0.723,
    window: "5Y daily · 1,258 obs"
  }
};
window.pct = (v, d) => (v * 100).toFixed(d === undefined ? 1 : d) + "%";
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sharpe-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DIVERGING = __ds_scope.DIVERGING;

__ds_ns.MatrixGrid = __ds_scope.MatrixGrid;

__ds_ns.ScaleLegend = __ds_scope.ScaleLegend;

__ds_ns.WeightBar = __ds_scope.WeightBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

})();
