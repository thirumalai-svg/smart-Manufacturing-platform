const API_ROOT = "/api/v1";
const SESSION_KEY = "smarttwin.session";

export type Session = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    initials: string;
    role: string;
    factory: { id: string; name: string };
  };
};

export type DashboardSummary = {
  totalMachines: number;
  online: number;
  atRisk: number;
  criticalAlerts: number;
  productionEfficiency: number;
  overallHealth: number;
  availability: number;
  energyPerformance: number;
  statusBreakdown: Record<string, { count: number; percent: number }>;
};

export type AttentionMachine = {
  id: string;
  name: string;
  line: string;
  status: string;
  health: number;
  faultProbability: number;
  latestValue: number | null;
  lastUpdated: string | null;
};

export type RecentAlert = {
  id: string;
  severity: string;
  title: string;
  message: string;
  status: string;
  createdAt: string;
  machineCode: string;
  machineName: string;
};

export type Machine = {
  id: string;
  machineCode: string;
  name: string;
  machineType: string;
  line: string;
  ratedPowerKw: number;
  status: string;
  health: number;
  faultProbability: number;
};

export type Page<T> = {
  content: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

function readSession(): Session | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) as Session : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else sessionStorage.removeItem(SESSION_KEY);
}

async function refreshSession(): Promise<Session | null> {
  const session = readSession();
  if (!session?.refreshToken) return null;

  const response = await fetch(`${API_ROOT}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: session.refreshToken }),
  });
  if (!response.ok) {
    saveSession(null);
    return null;
  }

  const refreshed = await response.json() as Session;
  saveSession(refreshed);
  return refreshed;
}

async function request<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const session = readSession();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);

  let response = await fetch(`${API_ROOT}${path}`, { ...init, headers });
  if (response.status === 401 && retry && !path.startsWith("/auth/")) {
    const refreshed = await refreshSession();
    if (refreshed) return request<T>(path, init, false);
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json() as { detail?: string; message?: string; title?: string };
      message = body.detail || body.message || body.title || message;
    } catch {
      // Keep the HTTP status message when the response is not JSON.
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<Session> {
  const session = await request<Session>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveSession(session);
  return session;
}

export async function restoreSession(): Promise<Session | null> {
  const session = readSession();
  if (!session) return null;
  try {
    await request<Session["user"]>("/auth/me");
    return readSession();
  } catch {
    saveSession(null);
    return null;
  }
}

export async function logout(): Promise<void> {
  const session = readSession();
  saveSession(null);
  if (!session) return;
  try {
    await fetch(`${API_ROOT}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });
  } catch {
    // Local logout still succeeds when the API is unavailable.
  }
}

export const api = {
  dashboardSummary: () => request<DashboardSummary>("/dashboard/summary"),
  attentionMachines: () => request<AttentionMachine[]>("/dashboard/attention-machines?page=0&size=10"),
  recentAlerts: () => request<RecentAlert[]>("/dashboard/recent-alerts?limit=5"),
  machines: (search = "") => {
    const params = new URLSearchParams({ page: "0", size: "100" });
    if (search.trim()) params.set("search", search.trim());
    return request<Page<Machine>>(`/machines?${params}`);
  },
};
