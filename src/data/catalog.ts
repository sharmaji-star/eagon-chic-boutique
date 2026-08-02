import { products, type Product } from "./products";

export type Gender = "Women" | "Men" | "Kids";

export type MenuGroup = {
  label: Gender | "Sale";
  gender?: Gender;
  items: { label: string; category?: string; tag?: Product["tags"][number] }[];
};

export const shopMenu: MenuGroup[] = [
  {
    label: "Women",
    gender: "Women",
    items: [
      { label: "Kurtis", category: "Kurtis" },
      { label: "Co-ord Sets", category: "Co-ord Sets" },
      { label: "Dresses", category: "Dresses" },
      { label: "Tops", category: "Tops" },
      { label: "Bottom Wear", category: "Bottom Wear" },
      { label: "Sarees", category: "Sarees" },
      { label: "Ethnic Sets", category: "Ethnic Sets" },
      { label: "New Arrivals", tag: "new" },
    ],
  },
  {
    label: "Men",
    gender: "Men",
    items: [
      { label: "T-Shirts", category: "T-Shirts" },
      { label: "Shirts", category: "Shirts" },
      { label: "Jeans", category: "Jeans" },
      { label: "Trousers", category: "Trousers" },
      { label: "Hoodies", category: "Hoodies" },
      { label: "Jackets", category: "Jackets" },
      { label: "New Arrivals", tag: "new" },
    ],
  },
  {
    label: "Kids",
    gender: "Kids",
    items: [
      { label: "Boys", category: "Boys" },
      { label: "Girls", category: "Girls" },
      { label: "Baby Wear", category: "Baby Wear" },
      { label: "Dresses", category: "Dresses" },
      { label: "T-Shirts", category: "T-Shirts" },
      { label: "New Arrivals", tag: "new" },
    ],
  },
  { label: "Sale", items: [{ label: "All Sale", tag: "offer" }] },
];

/* ---------------- Wholesale pricing ---------------- */

export type WholesaleTier = { minQty: number; price: number | null };

const round9 = (n: number) => Math.max(1, Math.round(n / 10) * 10 - 1);

export const MOQ = 10;

export const wholesaleTiers = (retail: number): WholesaleTier[] => [
  { minQty: 10, price: round9(retail * 0.88) },
  { minQty: 25, price: round9(retail * 0.83) },
  { minQty: 50, price: round9(retail * 0.78) },
  { minQty: 100, price: null },
];

/** Unit price for a quantity in wholesale mode (retail price below MOQ). */
export const wholesaleUnitPrice = (retail: number, qty: number) => {
  const tiers = wholesaleTiers(retail);
  let price = retail;
  for (const t of tiers) if (qty >= t.minQty && t.price !== null) price = t.price;
  return price;
};

export const bulkSavings = (retail: number, qty: number) =>
  Math.max(0, retail * qty - wholesaleUnitPrice(retail, qty) * qty);

/* ---------------- Stock & delivery (deterministic demo values) ---------------- */

export const stockFor = (p: Product) => 12 + ((p.reviews * 7) % 60);

export const deliveryEstimate = () => {
  const d = new Date();
  const from = new Date(d.getTime() + 3 * 864e5);
  const to = new Date(d.getTime() + 6 * 864e5);
  const fmt = (x: Date) => x.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return `${fmt(from)} – ${fmt(to)}`;
};

/* ---------------- Filtering ---------------- */

export type CatalogFilters = {
  gender?: string;
  group?: string;
  category?: string;
  tag?: string;
  size?: string | null;
  color?: string | null;
  maxPrice?: number;
};

export const filterProducts = (f: CatalogFilters) => {
  let out = products.slice();
  if (f.maxPrice) out = out.filter((p) => p.price <= f.maxPrice!);
  if (f.gender) out = out.filter((p) => p.gender === f.gender);
  if (f.group) out = out.filter((p) => p.group === f.group);
  if (f.category)
    out = out.filter(
      (p) =>
        p.category === f.category ||
        p.group === f.category ||
        p.category.toLowerCase().includes(f.category!.toLowerCase()),
    );
  if (f.tag) out = out.filter((p) => p.tags.includes(f.tag as Product["tags"][number]));
  if (f.size) out = out.filter((p) => p.sizes.includes(f.size!));
  if (f.color)
    out = out.filter((p) => p.colors.some((c) => c.name.toLowerCase() === f.color!.toLowerCase()));
  return out;
};

export const allColors = () => {
  const map = new Map<string, string>();
  for (const p of products) for (const c of p.colors) if (!map.has(c.name)) map.set(c.name, c.hex);
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
};

export const allCategories = () => [...new Set(products.map((p) => p.category))].sort();

/* ---------------- Contact & shipping ---------------- */

export const CONTACT = {
  phone: "7983642540",
  phoneIntl: "917983642540",
  email: "gauav4680@gmail.com",
  whatsappGroup: "https://chat.whatsapp.com/GL6LLv14p1A86g9HGaSrm9",
  whatsappChat: "https://wa.me/917983642540",
};

export const shippingFor = (subtotal: number) => {
  if (subtotal === 0) return 0;
  if (subtotal >= 999) return 0;
  if (subtotal >= 500) return 49;
  return 79;
};
