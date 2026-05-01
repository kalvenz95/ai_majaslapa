// Centralizēts API klients — vienādi strādā web un mobilajā lietotnē
// Mobile app var importēt šo failu un izsaukt tos pašus endpoints

const BASE_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Kļūda" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// Lietotājs
export const userApi = {
  sync: () => apiFetch("/user/sync", { method: "POST" }),
  get: () => apiFetch<{ user: any; subscription: any }>("/user"),
};

// Kursi
export const coursesApi = {
  list: () => apiFetch<{ courses: any[] }>("/courses"),
  get: (slug: string) => apiFetch<{ course: any }>(`/courses/${slug}`),
};

// Progress
export const progressApi = {
  complete: (lessonId: string) =>
    apiFetch("/progress", { method: "POST", body: JSON.stringify({ lessonId, completed: true }) }),
  update: (lessonId: string, watchedSeconds: number) =>
    apiFetch("/progress", { method: "POST", body: JSON.stringify({ lessonId, watchedSeconds }) }),
};

// Stripe
export const stripeApi = {
  createCheckout: (plan: string) =>
    apiFetch<{ url: string }>("/stripe/checkout", { method: "POST", body: JSON.stringify({ plan }) }),
  openPortal: () =>
    apiFetch<{ url: string }>("/stripe/portal", { method: "POST" }),
};
