import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { filterProducts } from "@/data/catalog";
import { useProducts } from "@/data/useCatalog";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search Products — Eagon Shop Wholesale & Retail" },
      {
        name: "description",
        content:
          "Search the full Eagon Shop catalogue of kurtis, co-ord sets, dresses and ethnic wear with live retail and wholesale pricing.",
      },
      { property: "og:title", content: "Search Products — Eagon Shop" },
      { property: "og:description", content: "Find any Eagon Shop style in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const products = useProducts();
  const [term, setTerm] = useState(q ?? "");

  const results = useMemo(
    () => (term.trim() ? filterProducts({ q: term }, products) : []),
    [term, products],
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Search</h1>

      <div className="glass mt-6 flex items-center gap-3 px-4 py-3">
        <SearchIcon className="size-4 text-muted-foreground" />
        <input
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Try “kurti”, “co-ord”, “rayon”, “dress”…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {term.trim() ? `${results.length} result(s) for “${term.trim()}”` : "Start typing to search."}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {term.trim() && results.length === 0 && (
        <Link to="/shop" search={{}} className="link-underline mt-6 inline-block text-sm">
          Browse the full catalogue
        </Link>
      )}
    </main>
  );
}
