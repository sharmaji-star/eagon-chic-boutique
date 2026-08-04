import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserRound, LogOut, Package, Heart, Briefcase } from "lucide-react";
import { useShop } from "@/context/shop";
import { CONTACT } from "@/data/catalog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Eagon Shop" },
      {
        name: "description",
        content:
          "Manage your Eagon Shop account: orders, wishlist, wholesale registration and your retail or wholesale pricing preference.",
      },
      { property: "og:title", content: "My Account — Eagon Shop" },
      { property: "og:description", content: "Your Eagon Shop orders, wishlist and wholesale profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, signIn, signOut, orders, wishlist, wholesale, wholesaleMode, setWholesaleMode } =
    useShop();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const field = "w-full border-b border-border bg-transparent py-2 text-sm outline-none";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My account</h1>

      {!user ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.name.trim() || !form.email.trim()) return;
            signIn({ ...form, name: form.name.trim(), email: form.email.trim() });
          }}
          className="glass mt-8 space-y-5 p-6"
        >
          <p className="eyebrow">Sign in / create account</p>
          <input
            required
            placeholder="Full name"
            value={form.name}
            maxLength={60}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field}
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            maxLength={120}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={field}
          />
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            maxLength={15}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={field}
          />
          <button
            type="submit"
            className="w-full bg-primary py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Continue
          </button>
          <p className="text-xs text-muted-foreground">
            Your details stay on this device. For a full multi-device login, ask us to enable cloud
            accounts.
          </p>
        </form>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="glass flex items-center gap-4 p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary">
              <UserRound className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
            </div>
            <button
              type="button"
              onClick={signOut}
              className="ml-auto flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[0.16em]"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>

          <div className="glass flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <p className="eyebrow">Pricing view</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {wholesaleMode ? "Wholesale (bulk) rates" : "Retail rates"}
              </p>
            </div>
            <div className="flex items-center rounded-full border border-border p-0.5 text-[0.65rem] uppercase tracking-[0.14em]">
              {(["Retail", "Wholesale"] as const).map((label) => {
                const active = (label === "Wholesale") === wholesaleMode;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setWholesaleMode(label === "Wholesale")}
                    className={`rounded-full px-3 py-1.5 ${
                      active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/orders" className="glass p-5">
              <Package className="size-5 text-gold" />
              <p className="mt-3 text-sm font-medium">Orders</p>
              <p className="text-xs text-muted-foreground">{orders.length} placed</p>
            </Link>
            <Link to="/wishlist" className="glass p-5">
              <Heart className="size-5 text-gold" />
              <p className="mt-3 text-sm font-medium">Wishlist</p>
              <p className="text-xs text-muted-foreground">{wishlist.length} saved</p>
            </Link>
            <Link to="/wholesale" className="glass p-5">
              <Briefcase className="size-5 text-gold" />
              <p className="mt-3 text-sm font-medium">Wholesale</p>
              <p className="text-xs text-muted-foreground">
                {wholesale ? wholesale.business : "Not registered"}
              </p>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Need help with a bulk order? Call {CONTACT.phone} or email {CONTACT.email}.
          </p>
        </div>
      )}
    </main>
  );
}
