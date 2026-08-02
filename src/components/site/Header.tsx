import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  Minus,
  Plus,
  Trash2,
  BookmarkPlus,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import { inr, products } from "@/data/products";
import { shopMenu, shippingFor } from "@/data/catalog";
import { useShop } from "@/context/shop";

export function Header() {
  const {
    cart,
    cartCount,
    subtotal,
    removeLine,
    setQty,
    saveForLater,
    theme,
    toggleTheme,
    wishlist,
    wholesaleMode,
  } = useShop();
  const [menu, setMenu] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 4)
    : [];

  const shipping = shippingFor(subtotal);

  return (
    <>
      <div className="bg-primary py-2 text-center text-[0.65rem] uppercase tracking-[0.28em] text-primary-foreground">
        {wholesaleMode
          ? "Wholesale pricing active · MOQ 10 pieces"
          : "Free shipping above ₹999 · Easy 7-day returns"}
      </div>

      <header className="glass sticky top-0 z-50">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-3">
          <div className="flex min-w-0 items-center gap-2">
            <button type="button" aria-label="Menu" onClick={() => setMenu(true)} className="lg:hidden">
              <Menu className="size-5" />
            </button>

            <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] lg:flex">
              {shopMenu.map((g) => (
                <div
                  key={g.label}
                  className="group/mega relative"
                  onMouseEnter={() => setOpenGroup(g.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <Link
                    to="/shop"
                    search={g.gender ? { gender: g.gender } : { tag: "offer" }}
                    className="link-underline flex items-center gap-1"
                  >
                    {g.label}
                    {g.items.length > 1 && <ChevronDown className="size-3" />}
                  </Link>

                  {openGroup === g.label && g.items.length > 1 && (
                    <div className="glass absolute left-0 top-full w-56 p-4">
                      <ul className="space-y-2.5 text-[0.7rem]">
                        {g.items.map((it) => (
                          <li key={it.label}>
                            <Link
                              to="/shop"
                              search={{
                                ...(g.gender ? { gender: g.gender } : {}),
                                ...(it.category ? { category: it.category } : {}),
                                ...(it.tag ? { tag: it.tag } : {}),
                              }}
                              className="link-underline"
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <Link to="/wholesale" className="link-underline flex items-center gap-1 text-gold">
                <Briefcase className="size-3" /> Wholesale
              </Link>
            </nav>
          </div>

          <Link to="/" className="justify-self-center text-center">
            <span className="text-xl font-semibold tracking-[0.42em] uppercase sm:text-2xl">Eagon</span>
            <span className="eyebrow block leading-none">Shop</span>
          </Link>

          <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
            <details className="relative hidden sm:block">
              <summary className="list-none cursor-pointer">
                <Search className="size-5" />
              </summary>
              <div className="glass absolute right-0 top-9 w-72 p-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search kurtis, dresses, co-ords…"
                  className="w-full border-b border-border bg-transparent pb-2 text-sm outline-none"
                />
                <ul className="mt-2 space-y-2">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/product/$slug"
                        params={{ slug: p.slug }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <img src={p.images[0]} alt="" className="size-10 object-cover" />
                        <span className="min-w-0 truncate">{p.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <button type="button" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>

            <Link to="/shop" search={{}} aria-label="Wishlist" className="relative hidden sm:block">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-gold text-[0.6rem] text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button type="button" aria-label="Cart" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-gold text-[0.6rem] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-background/95 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Shop</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-8 space-y-6">
            {shopMenu.map((g) => (
              <div key={g.label}>
                <Link
                  to="/shop"
                  search={g.gender ? { gender: g.gender } : { tag: "offer" }}
                  onClick={() => setMenu(false)}
                  className="text-lg font-semibold uppercase tracking-[0.2em]"
                >
                  {g.label}
                </Link>
                {g.items.length > 1 && (
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {g.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          to="/shop"
                          search={{
                            ...(g.gender ? { gender: g.gender } : {}),
                            ...(it.category ? { category: it.category } : {}),
                            ...(it.tag ? { tag: it.tag } : {}),
                          }}
                          onClick={() => setMenu(false)}
                          className="link-underline"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="grid gap-3 border-t border-border pt-6 text-sm">
              <Link to="/wholesale" onClick={() => setMenu(false)} className="link-underline w-fit text-gold">
                Wholesale registration
              </Link>
              <Link to="/cart" onClick={() => setMenu(false)} className="link-underline w-fit">
                Cart &amp; saved items
              </Link>
              <Link to="/contact" onClick={() => setMenu(false)} className="link-underline w-fit">
                Contact us
              </Link>
            </div>
          </nav>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-60 flex justify-end bg-foreground/30 backdrop-blur-sm">
          <button type="button" aria-label="Close cart" className="flex-1" onClick={() => setCartOpen(false)} />
          <aside className="flex h-full w-full max-w-sm flex-col bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.24em]">Your bag</h2>
              <button type="button" aria-label="Close" onClick={() => setCartOpen(false)}>
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-5 overflow-y-auto">
              {cart.length === 0 && <p className="text-sm text-muted-foreground">Your bag is empty.</p>}
              {cart.map((line, i) => (
                <div key={`${line.slug}-${i}`} className="flex gap-3">
                  <img src={line.image} alt="" className="h-24 w-18 shrink-0 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.size} · {line.color}
                      {line.wholesale ? " · Wholesale" : ""}
                    </p>
                    <p className="mt-1 text-sm">{inr(line.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button type="button" aria-label="Decrease" onClick={() => setQty(i, line.qty - 1)}>
                        <Minus className="size-3.5" />
                      </button>
                      <span className="text-sm">{line.qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => setQty(i, line.qty + 1)}>
                        <Plus className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Save for later"
                        className="ml-auto text-muted-foreground"
                        onClick={() => saveForLater(i)}
                      >
                        <BookmarkPlus className="size-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove"
                        className="text-muted-foreground"
                        onClick={() => removeLine(i)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">{inr(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {subtotal >= 999 ? "Free shipping unlocked" : `Add ${inr(999 - subtotal)} for free shipping`}
              </p>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="mt-4 block w-full bg-primary py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
              >
                Secure checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="mt-2 block w-full border border-border py-3 text-center text-xs uppercase tracking-[0.2em]"
              >
                View full cart
              </Link>
              <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Razorpay · UPI · Cards · Net banking · COD
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
