import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { products } from "@/data/products";

type ShopSearch = { group?: string; category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    group: typeof search.group === "string" ? search.group : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Women's Western & Indian Wear — Eagon Shop" },
      {
        name: "description",
        content:
          "Browse dresses, tops, kurtis, kurta sets, co-ord sets, plazo and trousers. Filter by price and size. Free shipping above ₹999.",
      },
      { property: "og:title", content: "Shop Women's Western & Indian Wear — Eagon Shop" },
      {
        property: "og:description",
        content: "Filter the full Eagon Shop edit by category, size and price.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const sortOptions = ["Featured", "Price: low to high", "Price: high to low", "Top rated"] as const;

function Shop() {
  const { group, category } = Route.useSearch();
  const [maxPrice, setMaxPrice] = useState(2500);
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let out = products.filter((p) => p.price <= maxPrice);
    if (group) out = out.filter((p) => p.group === group);
    if (category)
      out = out.filter(
        (p) =>
          p.category === category ||
          p.group === category ||
          p.category.toLowerCase().includes(category.toLowerCase()),
      );
    if (size) out = out.filter((p) => p.sizes.includes(size));
    if (sort === "Price: low to high") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [group, category, maxPrice, size, sort]);

  const heading = category ?? group ?? "All Products";

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <nav className="eyebrow flex gap-2">
        <Link to="/" className="link-underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{heading}</span>
      </nav>

      <header className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{list.length} pieces</p>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((f) => !f)}
          className="glass flex shrink-0 items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.18em]"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className={`${filtersOpen ? "block" : "hidden"} space-y-8 lg:block`}>
          <div>
            <p className="eyebrow">Category</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/shop" search={{}} className="link-underline">
                  All
                </Link>
              </li>
              {["Western Wear", "Indian Wear"].map((g) => (
                <li key={g}>
                  <Link to="/shop" search={{ group: g }} className="link-underline">
                    {g}
                  </Link>
                </li>
              ))}
              {[...new Set(products.map((p) => p.category))].map((c) => (
                <li key={c}>
                  <Link to="/shop" search={{ category: c }} className="link-underline">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Max price · ₹{maxPrice}</p>
            <input
              type="range"
              min={500}
              max={2500}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--gold)]"
            />
          </div>

          <div>
            <p className="eyebrow">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(size === s ? null : s)}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    size === s ? "border-foreground bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Sort by</p>
            <div className="mt-3 space-y-2 text-sm">
              {sortOptions.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setSort(o)}
                  className={`block text-left ${sort === o ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
          {list.length === 0 && (
            <p className="text-sm text-muted-foreground">No pieces match these filters yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
