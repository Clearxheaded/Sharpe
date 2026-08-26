(function () {
  const API_BASE = "/api";
  const REFRESH_KEY = "sharpe_refresh_token";

  class ApiError extends Error {
    constructor(status, detail) {
      super(detail || "Request failed with status " + status);
      this.status = status;
      this.detail = detail;
    }
  }

  let accessToken = null;

  function getTokenStore() {
    if (localStorage.getItem(REFRESH_KEY) != null) return localStorage;
    if (sessionStorage.getItem(REFRESH_KEY) != null) return sessionStorage;
    return null;
  }

  function getRefreshToken() {
    const store = getTokenStore();
    return store ? store.getItem(REFRESH_KEY) : null;
  }

  function setRefreshToken(token, remember) {
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    if (token) (remember ? localStorage : sessionStorage).setItem(REFRESH_KEY, token);
  }

  function rotateRefreshToken(token) {
    const store = getTokenStore() || sessionStorage;
    store.setItem(REFRESH_KEY, token);
  }

  function clearTokens() {
    accessToken = null;
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
  }

  async function parseError(res) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (body && body.detail) {
        detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
      }
    } catch (e) {}
    return new ApiError(res.status, detail);
  }

  async function rawRequest(path, options) {
    const headers = Object.assign({}, options.headers);
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    if (accessToken) headers["Authorization"] = "Bearer " + accessToken;
    return fetch(API_BASE + path, Object.assign({}, options, { headers }));
  }

  async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new ApiError(401, "Not signed in.");
    const res = await fetch(API_BASE + "/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) {
      clearTokens();
      throw await parseError(res);
    }
    const data = await res.json();
    accessToken = data.access_token;
    rotateRefreshToken(data.refresh_token);
    return data;
  }

  async function request(path, options = {}) {
    let res = await rawRequest(path, options);
    if (res.status === 401 && path !== "/auth/refresh" && getRefreshToken()) {
      await refreshAccessToken();
      res = await rawRequest(path, options);
    }
    if (!res.ok) throw await parseError(res);
    if (res.status === 204) return null;
    return res.json();
  }

  const api = {
    hasStoredSession: () => !!getRefreshToken(),
    restoreSession: () => refreshAccessToken(),

    register: (email, password) =>
      request("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),

    login: async (email, password, remember) => {
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      accessToken = data.access_token;
      setRefreshToken(data.refresh_token, remember);
      return data;
    },

    logout: async () => {
      const refreshToken = getRefreshToken();
      clearTokens();
      if (refreshToken) {
        try {
          await fetch(API_BASE + "/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
        } catch (e) {}
      }
    },

    getCurrentUser: () => request("/auth/me"),
    listPortfoliosSummary: () => request("/portfolios/summary"),
    getPortfolio: (id) => request("/portfolios/" + id),
    getPortfolioStats: (id) => request("/portfolios/" + id + "/stats"),
    createPortfolio: (name, holdings) =>
      request("/portfolios", { method: "POST", body: JSON.stringify({ name, holdings }) }),
    updatePortfolio: (id, name, holdings) =>
      request("/portfolios/" + id, { method: "PATCH", body: JSON.stringify({ name, holdings }) }),
    deletePortfolio: (id) => request("/portfolios/" + id, { method: "DELETE" }),
  };

  window.SharpeApi = { api, ApiError };
})();
