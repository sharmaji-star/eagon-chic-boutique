/**
 * Lightweight local store for admin-managed overrides (retail price, wholesale
 * price, MOQ, stock, category, visibility, banners) and order fulfilment status.
 * Persists in localStorage so the storefront and the admin dashboard stay in
 * sync in the browser.
 */

export type ProductOverride = {
  name?: string;
  price?: number;
  wholesalePrice?: number;
  moq?: number;
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

export type BannerConfig = {
  hero?: string;
  heroHeadline?: string;
  heroSub?: string;
  promo?: string;
};

const OVERRIDES_KEY = "eagon.admin.products";
const STATUS_KEY = "eagon.admin.orderStatus";
const BANNER_KEY = "eagon.admin.banners";
const CATEGORY_KEY = "eagon.admin.categories";

export const ADMIN_CHANGE_EVENT = "eagon-admin-change";

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
  window.dispatchEvent(new Event(ADMIN_CHANGE_EVENT));
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

/* ---------------- Banners ---------------- */

export const getBanners = () => read<BannerConfig>(BANNER_KEY, {});

export const setBanner = (patch: BannerConfig) => {
  const next = { ...getBanners(), ...patch };
  write(BANNER_KEY, next);
  return next;
};

/* ---------------- Custom categories ---------------- */

export const getCustomCategories = () => read<string[]>(CATEGORY_KEY, []);

export const addCustomCategory = (name: string) => {
  const clean = name.trim().slice(0, 40);
  if (!clean) return getCustomCategories();
  const next = [...new Set([...getCustomCategories(), clean])];
  write(CATEGORY_KEY, next);
  return next;
};

export const removeCustomCategory = (name: string) => {
  const next = getCustomCategories().filter((c) => c !== name);
  write(CATEGORY_KEY, next);
  return next;
};
