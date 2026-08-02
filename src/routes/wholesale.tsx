import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Percent, Package, Headphones } from "lucide-react";
import { CONTACT, MOQ, wholesaleTiers } from "@/data/catalog";
import { inr } from "@/data/products";
import { useShop, type WholesaleAccount } from "@/context/shop";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Registration — Eagon Shop Bulk Clothing" },
      {
        name: "description",
        content:
          "Register for Eagon Shop wholesale pricing. MOQ 10 pieces, tiered bulk rates from 10/25/50/100+ pieces on kurtis, dresses and co-ord sets.",
      },
      { property: "og:title", content: "Wholesale Registration — Eagon Shop" },
      {
        property: "og:description",
        content: "Bulk clothing rates for resellers, boutiques and retailers. MOQ 10 pieces.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: Wholesale,
});

const empty: WholesaleAccount = {
  business: "",
  gst: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  country: "India",
};

const fields: { k: keyof WholesaleAccount; label: string; span?: boolean; optional?: boolean }[] = [
  { k: "business", label: "Business name", span: true },
  { k: "gst", label: "GST number (optional)", span: true, optional: true },
  { k: "name", label: "Your name" },
  { k: "phone", label: "Phone" },
  { k: "email", label: "Email" },
  { k: "city", label: "City" },
  { k: "state", label: "State" },
  { k: "country", label: "Country" },
];

function Wholesale() {
  const { wholesale, wholesaleMode, registerWholesale, setWholesaleMode } = useShop();
  const [form, setForm] = useState<WholesaleAccount>(wholesale ?? empty);

  const valid =
    form.business.trim().length > 1 &&
    form.name.trim().length > 1 &&
    /^\d{10}$/.test(form.phone.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.city.trim().length > 1 &&
    form.state.trim().length > 1 &&
    form.country.trim().length > 1;

  const sampleTiers = wholesaleTiers(399);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="eyebrow">Wholesale</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Buy in bulk with Eagon Shop</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Boutiques, resellers and online sellers get factory-direct rates on our full catalogue. Minimum order is{" "}
        {MOQ} pieces per style — rates drop further at 25, 50 and 100 pieces.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Percent, title: "Tiered bulk pricing", text: "Up to 22% below retail as quantity grows." },
          { icon: Package, title: "MOQ 10 pieces", text: "Mix sizes and colours within a style." },
          { icon: Headphones, title: "Dedicated support", text: "WhatsApp catalogue drops every week." },
        ].map((c) => (
          <div key={c.title} className="glass p-6">
            <c.icon className="size-4 text-gold" />
            <p className="mt-3 text-sm font-medium">{c.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          {wholesaleMode ? (
            <div className="glass p-8">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" />
              </span>
              <h2 className="mt-4 text-xl font-semibold">Wholesale pricing is active</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {wholesale?.business} · {wholesale?.city}, {wholesale?.state}. Bulk rates now show on every product
                page.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  search={{}}
                  className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Shop wholesale
                </Link>
                <button
                  type="button"
                  onClick={() => setWholesaleMode(false)}
                  className="border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Switch to retail
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <label key={f.k} className={f.span ? "sm:col-span-2" : ""}>
                  <span className="eyebrow">{f.label}</span>
                  <input
                    value={form[f.k] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value.slice(0, 120) })}
                    className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-foreground"
                  />
                </label>
              ))}
              <button
                type="button"
                disabled={!valid}
                onClick={() => registerWholesale(form)}
                className="bg-primary py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-40 sm:col-span-2"
              >
                Register &amp; unlock wholesale prices
              </button>
              {wholesale && !wholesaleMode && (
                <button
                  type="button"
                  onClick={() => setWholesaleMode(true)}
                  className="link-underline text-xs sm:col-span-2"
                >
                  Re-activate my existing wholesale account
                </button>
              )}
            </div>
          )}
        </section>

        <aside className="glass h-fit p-6">
          <p className="eyebrow">Example rate card</p>
          <p className="mt-2 text-sm">Retail: 1 piece = {inr(399)}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {sampleTiers.map((t) => (
              <li key={t.minQty} className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{t.minQty}+ pieces</span>
                <span>{t.price === null ? "Contact us" : `${inr(t.price)} each`}</span>
              </li>
            ))}
          </ul>
          <a
            href={CONTACT.whatsappGroup}
            target="_blank"
            rel="noreferrer"
            className="mt-5 block border border-foreground py-3 text-center text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Join wholesale WhatsApp group
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {CONTACT.phone} · {CONTACT.email}
          </p>
        </aside>
      </div>
    </main>
  );
}
