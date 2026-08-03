import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useShop } from "@/context/shop";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Eagon Shop" },
      {
        name: "description",
        content:
          "Everything you have saved at Eagon Shop — kurtis, co-ord sets, dresses and more. Move pieces to your bag whenever you are ready.",
      },
      { property: "og:title", content: "My Wishlist — Eagon Shop" },
      { property: "og:description", content: "Your saved Eagon Shop pieces in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {saved.length === 0 ? "Nothing saved yet." : `${saved.length} piece(s) saved.`}
      </p>

      {saved.length === 0 ? (
        <div className="glass mt-10 p-10 text-center">
          <Heart className="mx-auto size-6 text-gold" />
          <p className="mt-4 text-sm text-muted-foreground">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/shop"
            search={{}}
            className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Start browsing
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
