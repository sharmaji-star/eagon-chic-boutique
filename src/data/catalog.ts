import { products, DEFAULT_MOQ, type Product } from "./products";

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

/** Every category the storefront knows about, grouped by gender. */
export const CATEGORY_TREE: Record<Gender, string[]> = {
  Women: [
    "Kurtis",
    "Co-ord Sets",
    "Dresses",
    "Tops",
    "Bottom Wear",
    "Sarees",
    "Ethnic Sets",
    "New Arrivals",
  ],
  Men: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Hoodies", "Jackets", "New Arrivals"],
  Kids: ["Boys", "Girls", "Baby Wear", "Dresses", "T-Shirts", "New Arrivals"],
};

/* ---------------- Wholesale pricing ---------------- */

export { DEFAULT_MOQ };
/** Backwards-compatible default MOQ. */
export const MOQ = DEFAULT_MOQ;

export type WholesaleTier = { minQty: number; price: number | null; label: string };

const round9 = (n: number) => Math.max(1, Math.round(n / 10) * 10 - 1);

/**
 * Tiers are built off the product's own wholesale price and MOQ, so both stay
 * editable per product from the admin dashboard.
 */
export const wholesaleTiers = (p: Pick<Product, "wholesalePrice" | "moq">): WholesaleTier[] => {
  const moq = p.moq || DEFAULT_MOQ;
  return [
    { minQty: moq, price: p.wholesalePrice, label: `${moq}+ pcs` },
    { minQty: moq * 2, price: round9(p.wholesalePrice * 0.95), label: `${moq * 2}+ pcs` },
    { minQty: moq * 5, price: round9(p.wholesalePrice * 0.9), label: `${moq * 5}+ pcs` },
    { minQty: moq * 10, price: null, label: `${moq * 10}+ pcs` },
  ];
};

/** Unit price for a quantity in wholesale mode (retail price below MOQ). */
export const wholesaleUnitPrice = (p: Product, qty: number) => {
  let price = p.price;
  for (const t of wholesaleTiers(p)) if (qty >= t.minQty && t.price !== null) price = t.price;
  return price;
};

/** Total ₹ saved vs retail for a bulk quantity. */
export const bulkSavings = (p: Product, qty: number) =>
  Math.max(0, p.price * qty - wholesaleUnitPrice(p, qty) * qty);

/** Discount % of the wholesale rate vs retail. */
export const bulkDiscountPct = (p: Product, qty: number) =>
  Math.max(0, Math.round(100 - (wholesaleUnitPrice(p, qty) / p.price) * 100));

/* ---------------- Stock & delivery ---------------- */

export const stockFor = (p: Product) => p.stock;

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
  q?: string;
};

export const filterProducts = (f: CatalogFilters, list: Product[] = products) => {
  let out = list.slice();
  if (f.q) {
    const q = f.q.trim().toLowerCase();
    out = out.filter((p) =>
      [p.name, p.category, p.gender, p.group, p.fabric, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  if (f.maxPrice) out = out.filter((p) => p.price <= f.maxPrice!);
  if (f.gender) out = out.filter((p) => p.gender === f.gender);
  if (f.group) out = out.filter((p) => p.group === f.group);
  if (f.category === "New Arrivals") out = out.filter((p) => p.tags.includes("new"));
  else if (f.category)
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

export const allColors = (list: Product[] = products) => {
  const map = new Map<string, string>();
  for (const p of list) for (const c of p.colors) if (!map.has(c.name)) map.set(c.name, c.hex);
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
};

export const allCategories = (list: Product[] = products) =>
  [...new Set([...list.map((p) => p.category), ...Object.values(CATEGORY_TREE).flat()])]
    .filter((c) => c !== "New Arrivals")
    .sort();

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
