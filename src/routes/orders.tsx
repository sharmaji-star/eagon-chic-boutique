import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, Truck, Check, Search } from "lucide-react";
import { inr } from "@/data/products";
import { CONTACT } from "@/data/catalog";
import { useShop } from "@/context/shop";
import { ORDER_STATUSES, getOrderStatuses, statusOf, type OrderStatus } from "@/data/admin-store";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Eagon Shop" },
      {
        name: "description",
        content:
          "Track your Eagon Shop order status from placed to delivered, review items, payment method and delivery address.",
      },
      { property: "og:title", content: "Track Your Order — Eagon Shop" },
      { property: "og:description", content: "Live status for every Eagon Shop order you placed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { orders } = useShop();
  const [statuses, setStatuses] = useState<Record<string, OrderStatus>>({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sync = () => setStatuses(getOrderStatuses());
    sync();
    window.addEventListener("eagon-admin-change", sync);
    return () => window.removeEventListener("eagon-admin-change", sync);
  }, []);

  const q = query.trim().toLowerCase();
  const list = q ? orders.filter((o) => o.id.toLowerCase().includes(q)) : orders;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Order tracking</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your order ID or scroll through your recent orders.
      </p>

      <label className="mt-6 flex items-center gap-3 border border-border px-3 py-2.5">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 20))}
          placeholder="e.g. EG12345678"
          className="w-full bg-transparent text-sm outline-none"
        />
      </label>

      {list.length === 0 ? (
        <div className="glass mt-10 p-10 text-center">
          <Package className="mx-auto size-6 text-gold" />
          <p className="mt-4 text-sm text-muted-foreground">
            No orders found. Once you place an order it appears here instantly.
          </p>
          <Link
            to="/shop"
            search={{}}
            className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {list.map((o) => {
            const status = statusOf(o.id, statuses);
            const step = ORDER_STATUSES.indexOf(status);
            return (
              <li key={o.id} className="glass p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{o.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {o.payment}
                    </p>
                  </div>
                  <span className="eyebrow shrink-0 bg-secondary px-2 py-1">{status}</span>
                </div>

                <ol className="mt-5 grid grid-cols-5 gap-1 text-[0.6rem] uppercase tracking-[0.12em]">
                  {ORDER_STATUSES.map((s, i) => (
                    <li key={s} className={i <= step ? "text-foreground" : "text-muted-foreground"}>
                      <span
                        className={`mb-2 block h-0.5 ${i <= step ? "bg-gold" : "bg-border"}`}
                        aria-hidden
                      />
                      {s}
                    </li>
                  ))}
                </ol>

                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                  {o.lines.map((l, i) => (
                    <li key={`${l.slug}-${i}`} className="flex justify-between gap-3">
                      <span className="min-w-0 truncate text-muted-foreground">
                        {l.name} × {l.qty}
                      </span>
                      <span>{inr(l.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
                  <span className="text-muted-foreground">
                    {o.address.name}, {o.address.city} · {o.address.pincode}
                  </span>
                  <span className="font-semibold">{inr(o.total)}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <a
                    href={CONTACT.whatsappChat}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-foreground px-4 py-2.5 uppercase tracking-[0.18em]"
                  >
                    <Truck className="size-3.5" /> Ask for update
                  </a>
                  {status === "Delivered" && (
                    <span className="flex items-center gap-2 px-4 py-2.5 uppercase tracking-[0.18em] text-gold">
                      <Check className="size-3.5" /> Delivered
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
