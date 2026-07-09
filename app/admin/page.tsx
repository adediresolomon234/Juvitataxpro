"use client";

import { useEffect, useMemo, useState } from "react";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "https://tax.myco.com.ng").replace(
    /\/$/,
    ""
  );

const SORT_FIELDS = [
  { value: "created_at", label: "Submitted" },
  { value: "first_name", label: "First name" },
  { value: "last_name", label: "Last name" },
  { value: "business_name", label: "Business" },
  { value: "email", label: "Email" },
  { value: "phone_number", label: "Phone" },
  { value: "number_of_locations", label: "Locations" },
  { value: "annual_return_volume", label: "Volume" },
];

type SortField = (typeof SORT_FIELDS)[number]["value"];
type SortOrder = "asc" | "desc";

interface Submission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  phone_number: string;
  number_of_locations: string;
  annual_return_volume: string;
  services_interested?: string[];
  message?: string;
}

interface Pagination {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

function normalizeBearerToken(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/^Bearer\s+/i, "").trim();
}

function tokenFromLoginResponse(data: unknown): string {
  if (typeof data === "string") return normalizeBearerToken(data);
  if (!data || typeof data !== "object") return "";

  const body = data as Record<string, unknown>;
  return normalizeBearerToken(
    body.token ||
      body.access_token ||
      body.jwt ||
      body.bearer ||
      body.authorization
  );
}

function formatDate(value: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function filenameFromDisposition(disposition: string | null, fallback: string) {
  if (!disposition) return fallback;
  const match = disposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] || fallback;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [rows, setRows] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    per_page: 20,
    total_pages: 1,
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sortBy, setSortBy] = useState<SortField>("created_at");
  const [order, setOrder] = useState<SortOrder>("desc");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [downloadingId, setDownloadingId] = useState("");

  const authHeader = useMemo<HeadersInit>(
    () => {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      return headers;
    },
    [token]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("juvida_admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();
    async function loadUsers() {
      setLoading(true);
      setLoadError("");

      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
        sort_by: sortBy,
        order,
      });

      try {
        const res = await fetch(`${API_BASE}/users?${params.toString()}`, {
          headers: authHeader,
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));

        if (res.status === 401) {
          logout();
          setLoadError("Session expired. Sign in again.");
          return;
        }

        if (!res.ok) {
          setLoadError(data.error || "Could not load submissions.");
          return;
        }

        setRows(Array.isArray(data.data) ? data.data : []);
        setPagination({
          total: Number(data.pagination?.total ?? 0),
          page: Number(data.pagination?.page ?? page),
          per_page: Number(data.pagination?.per_page ?? perPage),
          total_pages: Number(data.pagination?.total_pages ?? 1),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setLoadError("Network error while loading submissions.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, [token, page, perPage, sortBy, order, authHeader]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setLoginError(data.error || "Invalid admin credentials.");
        return;
      }

      const nextToken = tokenFromLoginResponse(data);
      if (!nextToken) {
        setLoginError("Login succeeded, but no bearer token was returned.");
        return;
      }

      window.localStorage.setItem("juvida_admin_token", nextToken);
      setToken(nextToken);
      setPassword("");
      setPage(1);
    } catch {
      setLoginError("Network error while signing in.");
    } finally {
      setLoggingIn(false);
    }
  }

  function logout() {
    window.localStorage.removeItem("juvida_admin_token");
    setToken("");
    setRows([]);
  }

  async function downloadPdf(id: string) {
    setDownloadingId(id);
    setLoadError("");

    try {
      const res = await fetch(`${API_BASE}/users/pdf?id=${encodeURIComponent(id)}`, {
        headers: authHeader,
      });

      if (res.status === 401) {
        logout();
        setLoadError("Session expired. Sign in again.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLoadError(data.error || "Could not download the PDF receipt.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filenameFromDisposition(
        res.headers.get("content-disposition"),
        `submission-${id}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setLoadError("Network error while downloading the PDF receipt.");
    } finally {
      setDownloadingId("");
    }
  }

  const currentRangeStart =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.per_page + 1;
  const currentRangeEnd = Math.min(
    pagination.total,
    pagination.page * pagination.per_page
  );

  if (!token) {
    return (
      <main className="admin-shell admin-login-shell">
        <section className="admin-login-panel" aria-labelledby="adminLoginTitle">
          <div className="admin-kicker">Admin access</div>
          <h1 id="adminLoginTitle">Sign in</h1>
          <p>Use your backend admin credentials to view stored submissions.</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <label htmlFor="adminUsername">Username</label>
            <input
              id="adminUsername"
              type="text"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="adminPassword">Password</label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {loginError && <div className="admin-alert">{loginError}</div>}

            <button type="submit" className="admin-primary-btn" disabled={loggingIn}>
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <section className="admin-header">
        <div>
          <div className="admin-kicker">Admin console</div>
          <h1>Submissions</h1>
          <p>Review demo requests and download each user PDF receipt.</p>
        </div>
        <button type="button" className="admin-secondary-btn" onClick={logout}>
          Log out
        </button>
      </section>

      <section className="admin-stats" aria-label="Submission summary">
        <div className="admin-stat">
          <span>Total leads</span>
          <strong>{pagination.total}</strong>
        </div>
        <div className="admin-stat">
          <span>Current page</span>
          <strong>{pagination.page}</strong>
        </div>
        <div className="admin-stat">
          <span>Rows shown</span>
          <strong>{rows.length}</strong>
        </div>
      </section>

      <section className="admin-toolbar" aria-label="Submission controls">
        <label>
          Sort
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as SortField);
              setPage(1);
            }}
          >
            {SORT_FIELDS.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Order
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value as SortOrder);
              setPage(1);
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>

        <label>
          Per page
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </section>

      {loadError && <div className="admin-alert">{loadError}</div>}

      <section className="admin-table-panel">
        <div className="admin-table-meta">
          <span>
            Showing {currentRangeStart}-{currentRangeEnd} of {pagination.total}
          </span>
          {loading && <span>Loading...</span>}
        </div>

        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Locations</th>
                <th>Volume</th>
                <th>Interest</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !loading ? (
                <tr>
                  <td colSpan={9} className="admin-empty">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDate(row.created_at)}</td>
                    <td>
                      <strong>
                        {[row.first_name, row.last_name].filter(Boolean).join(" ") ||
                          "-"}
                      </strong>
                    </td>
                    <td>{row.business_name || "-"}</td>
                    <td>
                      <a href={`mailto:${row.email}`}>{row.email || "-"}</a>
                    </td>
                    <td>{row.phone_number || "-"}</td>
                    <td>{row.number_of_locations || "-"}</td>
                    <td>{row.annual_return_volume || "-"}</td>
                    <td>{row.services_interested?.join(", ") || "-"}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-download-btn"
                        onClick={() => downloadPdf(row.id)}
                        disabled={downloadingId === row.id}
                      >
                        {downloadingId === row.id ? "Downloading..." : "PDF"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={pagination.page <= 1 || loading}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.total_pages}
          </span>
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() =>
              setPage((value) => Math.min(pagination.total_pages, value + 1))
            }
            disabled={pagination.page >= pagination.total_pages || loading}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
