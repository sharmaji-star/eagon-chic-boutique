import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, BookmarkPlus, ShoppingBag } from "lucide-react";
import { inr } from "@/data/products";
import { shippingFor } from "@/data/catalog";
import { useShop } from "@/context/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Shopping Bag — Eagon Shop" },
      {
        name: "description",
        content:
          "Review your Eagon Shop bag, update quantities, save items for later and continue to secure checkout with UPI, cards or COD.",
      },
      { property: "og:title", content: "Your Shopping Bag — Eagon Shop" },
      { property: "og:description", content: "Update quantities, save for later and checkout securely." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, saved, subtotal, setQty, removeLine, saveForLater, moveToCart, removeSaved } = useShop();
  const shipping = shippingFor(subtotal);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your bag</h1>

      {cart.length === 0 ? (
        <div className="glass mt-8 p-10 text-center">
          <ShoppingBag className="mx-auto size-6 text-gold" />
          <p className="mt-3 text-sm text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/shop"
            search={{}}
            className="mt-5 inline-block bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            {cart.map((line, i) => (
              <div key={`${line.slug}-${i}`} className="flex gap-4 border-b border-border pb-6">
                <img src={line.image} alt="" className="h-32 w-24 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <Link to="/product/$slug" params={{ slug: line.slug }} className="link-underline text-sm font-medium">
                    {line.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {line.size} · {line.color}
                    {line.wholesale ? " · Wholesale rate" : ""}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{inr(line.price * line.qty)}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-3 border border-border px-3 py-1.5">
                      <button type="button" aria-label="Decrease" onClick={() => setQty(i, line.qty - 1)}>
                        <Minus className="size-3.5" />
                      </button>
                      <span className="text-sm">{line.qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => setQty(i, line.qty + 1)}>
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => saveForLater(i)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <BookmarkPlus className="size-3.5" /> Save for later
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(i)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <Trash2 className="size-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="glass h-fit p-6">
            <p className="eyebrow">Order summary</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{inr(subtotal + shipping)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-5 block bg-primary py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              Checkout
            </Link>
            <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Free shipping above ₹999
            </p>
          </aside>
        </div>
      )}

      {saved.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Saved for later</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {saved.map((line, i) => (
              <div key={`${line.slug}-saved-${i}`} className="glass flex gap-4 p-4">
                <img src={line.image} alt="" className="h-24 w-18 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{line.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {line.size} · {line.color}
                  </p>
                  <p className="mt-1 text-sm">{inr(line.price)}</p>
                  <div className="mt-3 flex gap-4 text-xs">
                    <button type="button" onClick={() => moveToCart(i)} className="link-underline">
                      Move to bag
                    </button>
                    <button type="button" onClick={() => removeSaved(i)} className="text-muted-foreground">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
