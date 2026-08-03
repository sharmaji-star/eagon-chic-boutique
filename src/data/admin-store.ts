/**
 * Lightweight local store for admin-managed overrides (prices, stock, visibility)
 * and order fulfilment status. Persists in localStorage so the storefront and the
 * admin dashboard stay in sync in the browser.
 */

export type ProductOverride = {
  price?: number;
  stock?: number;
  hidden?: boolean;
  category?: string;
};

export type OrderStatus = "Placed" | "Packed" | "Shipped" | "Out for delivery" | "Delivered";

export const ORDER_STATUSES: OrderStatus[] = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const OVERRIDES_KEY = "eagon.admin.products";
const STATUS_KEY = "eagon.admin.orderStatus";

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("eagon-admin-change"));
};

export const getOverrides = () => read<Record<string, ProductOverride>>(OVERRIDES_KEY, {});

export const setOverride = (slug: string, patch: ProductOverride) => {
  const all = getOverrides();
  all[slug] = { ...all[slug], ...patch };
  write(OVERRIDES_KEY, all);
  return all;
};

export const clearOverride = (slug: string) => {
  const all = getOverrides();
  delete all[slug];
  write(OVERRIDES_KEY, all);
  return all;
};

export const getOrderStatuses = () => read<Record<string, OrderStatus>>(STATUS_KEY, {});

export const setOrderStatus = (id: string, status: OrderStatus) => {
  const all = getOrderStatuses();
  all[id] = status;
  write(STATUS_KEY, all);
  return all;
};

export const statusOf = (id: string, map: Record<string, OrderStatus>): OrderStatus =>
  map[id] ?? "Placed";
