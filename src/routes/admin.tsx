import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LayoutDashboard, Boxes, ClipboardList, Tags, Save, RotateCcw } from "lucide-react";
import { inr, products } from "@/data/products";
import { allCategories, wholesaleTiers, MOQ, stockFor } from "@/data/catalog";
import { useShop } from "@/context/shop";
import {
  ORDER_STATUSES,
  clearOverride,
  getOrderStatuses,
  getOverrides,
  setOrderStatus,
  setOverride,
  statusOf,
  type OrderStatus,
  type ProductOverride,
} from "@/data/admin-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Eagon Shop" },
      {
        name: "description",
        content:
          "Manage Eagon Shop products, retail and wholesale pricing, MOQ, stock, categories and order fulfilment.",
      },
      { property: "og:title", content: "Admin Dashboard — Eagon Shop" },
      { property: "og:description", content: "Internal catalogue and order management for Eagon Shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Boxes },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "orders", label: "Orders", icon: ClipboardList },
] as const;

function Admin() {
  const { orders } = useShop();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>({});
  const [statuses, setStatuses] = useState<Record<string, OrderStatus>>({});

  useEffect(() => {
    setOverrides(getOverrides());
    setStatuses(getOrderStatuses());
  }, []);

  const revenue = orders.reduce((n, o) => n + o.total, 0);
  const units = orders.reduce((n, o) => n + o.lines.reduce((m, l) => m + l.qty, 0), 0);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of allCategories()) map.set(c, 0);
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-3xl font-semibold tracking-tight sm:text-4xl">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Catalogue, pricing, stock and orders. Changes are saved on this device — connect Cloud for
            multi-device, permanent storage.
          </p>
        </div>
      </header>

      <nav className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border px-4 py-2.5 ${
              tab === t.id ? "border-foreground bg-secondary" : "border-border"
            }`}
          >
            <t.icon className="size-3.5 text-gold" /> {t.label}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Products", value: String(products.length) },
            { label: "Orders", value: String(orders.length) },
            { label: "Units sold", value: String(units) },
            { label: "Revenue", value: inr(revenue) },
          ].map((s) => (
            <div key={s.label} className="glass p-6">
              <p className="eyebrow">{s.label}</p>
              <p className="mt-3 text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </section>
      )}

      {tab === "products" && (
        <section className="mt-8 space-y-4">
          {products.map((p) => {
            const o = overrides[p.slug] ?? {};
            const price = o.price ?? p.price;
            const stock = o.stock ?? stockFor(p);
            const tiers = wholesaleTiers(price);
            return (
              <article key={p.slug} className="glass p-5">
                <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)]">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-3/4 w-16 shrink-0 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.category} · {p.gender} · MOQ {MOQ} · wholesale from{" "}
                      {tiers[2].price ? inr(tiers[2].price) : "on request"}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-4">
                      <label>
                        <span className="eyebrow">Retail price</span>
                        <input
                          type="number"
                          value={price}
                          min={1}
                          onChange={(e) =>
                            setOverrides(setOverride(p.slug, { price: Number(e.target.value) }))
                          }
                          className="mt-1.5 w-full border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground"
                        />
                      </label>
                      <label>
                        <span className="eyebrow">Stock</span>
                        <input
                          type="number"
                          value={stock}
                          min={0}
                          onChange={(e) =>
                            setOverrides(setOverride(p.slug, { stock: Number(e.target.value) }))
                          }
                          className="mt-1.5 w-full border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground"
                        />
                      </label>
                      <label>
                        <span className="eyebrow">Category</span>
                        <input
                          value={o.category ?? p.category}
                          onChange={(e) =>
                            setOverrides(setOverride(p.slug, { category: e.target.value.slice(0, 40) }))
                          }
                          className="mt-1.5 w-full border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground"
                        />
                      </label>
                      <div className="flex items-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setOverrides(setOverride(p.slug, { hidden: !(o.hidden ?? false) }))
                          }
                          className="flex-1 border border-border px-3 py-2 text-[0.65rem] uppercase tracking-[0.16em]"
                        >
                          <Save className="mr-1 inline size-3" />
                          {o.hidden ? "Hidden" : "Live"}
                        </button>
                        <button
                          type="button"
                          aria-label={`Reset ${p.name}`}
                          onClick={() => setOverrides(clearOverride(p.slug))}
                          className="border border-border px-3 py-2"
                        >
                          <RotateCcw className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {tab === "categories" && (
        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([name, count]) => (
            <div key={name} className="glass flex items-center justify-between p-5 text-sm">
              <span className="min-w-0 truncate">{name}</span>
              <span className="shrink-0 text-muted-foreground">{count}</span>
            </div>
          ))}
        </section>
      )}

      {tab === "orders" && (
        <section className="mt-8 space-y-4">
          {orders.length === 0 && (
            <p className="glass p-8 text-center text-sm text-muted-foreground">No orders yet.</p>
          )}
          {orders.map((o) => (
            <article key={o.id} className="glass p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{o.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {o.address.name} · {o.address.phone} · {o.address.city} · {o.payment}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold">{inr(o.total)}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.14em]">
                {ORDER_STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatuses(setOrderStatus(o.id, s))}
                    className={`border px-3 py-2 ${
                      statusOf(o.id, statuses) === s ? "border-foreground bg-secondary" : "border-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
