import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { products } from "@/data/products";
import { allCategories, allColors, filterProducts, shopMenu } from "@/data/catalog";

type ShopSearch = {
  group?: string;
  category?: string;
  gender?: string;
  tag?: string;
};

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    group: str(search.group),
    category: str(search.category),
    gender: str(search.gender),
    tag: str(search.tag),
  }),
  head: () => ({
    meta: [
      { title: "Shop Women, Men & Kids Fashion — Eagon Shop" },
      {
        name: "description",
        content:
          "Browse kurtis, co-ord sets, dresses, tops, bottom wear and more for women, men and kids. Retail and wholesale pricing. Free shipping above ₹999.",
      },
      { property: "og:title", content: "Shop Women, Men & Kids Fashion — Eagon Shop" },
      {
        property: "og:description",
        content: "Filter the full Eagon Shop edit by category, gender, size, colour and price.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const sortOptions = ["Featured", "Price: low to high", "Price: high to low", "Top rated"] as const;

const tagLabels: { label: string; tag?: string }[] = [
  { label: "All" },
  { label: "New Arrival", tag: "new" },
  { label: "Best Seller", tag: "bestseller" },
  { label: "Trending", tag: "trending" },
  { label: "Sale", tag: "offer" },
];

function Shop() {
  const { group, category, gender, tag } = Route.useSearch();
  const [maxPrice, setMaxPrice] = useState(3000);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let out = filterProducts({ group, category, gender, tag, size, color, maxPrice });
    if (sort === "Price: low to high") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "Top rated") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [group, category, gender, tag, size, color, maxPrice, sort]);

  const heading =
    category ?? (tag === "offer" ? "Sale" : tag === "new" ? "New Arrivals" : null) ?? gender ?? group ?? "All Products";

  const colors = allColors().slice(0, 14);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <nav className="eyebrow flex flex-wrap gap-2">
        <Link to="/" className="link-underline">
          Home
        </Link>
        <span>/</span>
        {gender && (
          <>
            <Link to="/shop" search={{ gender }} className="link-underline">
              {gender}
            </Link>
            <span>/</span>
          </>
        )}
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
          className="glass flex shrink-0 items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.18em] lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {tagLabels.map((t) => (
          <Link
            key={t.label}
            to="/shop"
            search={{ ...(gender ? { gender } : {}), ...(t.tag ? { tag: t.tag } : {}) }}
            className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
              (tag ?? undefined) === t.tag ? "border-foreground bg-primary text-primary-foreground" : "border-border"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className={`${filtersOpen ? "block" : "hidden"} space-y-8 lg:block`}>
          <div>
            <p className="eyebrow">Shop for</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/shop" search={{}} className="link-underline">
                  Everything
                </Link>
              </li>
              {shopMenu
                .filter((g) => g.gender)
                .map((g) => (
                  <li key={g.label}>
                    <Link to="/shop" search={{ gender: g.gender }} className="link-underline">
                      {g.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Category</p>
            <ul className="mt-3 space-y-2 text-sm">
              {["Western Wear", "Indian Wear"].map((g) => (
                <li key={g}>
                  <Link to="/shop" search={{ group: g }} className="link-underline">
                    {g}
                  </Link>
                </li>
              ))}
              {allCategories().map((c) => (
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
              min={300}
              max={3000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--gold)]"
            />
          </div>

          <div>
            <p className="eyebrow">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "XXL", "Free Size"].map((s) => (
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
            <p className="eyebrow">Colour {color ? `· ${color}` : ""}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(color === c.name ? null : c.name)}
                  className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === c.name ? "border-foreground" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
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
            <div className="col-span-full">
              <p className="text-sm text-muted-foreground">
                No pieces in this section yet — new stock is added weekly.
              </p>
              <Link to="/shop" search={{}} className="link-underline mt-3 inline-block text-sm">
                Browse all {products.length} products
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
