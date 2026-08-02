import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Star, Truck, RotateCcw, ShieldCheck, Ruler, Plus, Minus, Layers } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { findProduct, inr, products, reviewsList } from "@/data/products";
import {
  CONTACT,
  MOQ,
  bulkSavings,
  deliveryEstimate,
  stockFor,
  wholesaleTiers,
  wholesaleUnitPrice,
} from "@/data/catalog";
import { useShop } from "@/context/shop";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Eagon Shop` : "Product — Eagon Shop";
    const description = p
      ? `${p.description} ${inr(p.price)} · Sizes ${p.sizes.join(", ")}. Free shipping above ₹999.`.slice(0, 155)
      : "Shop Eagon Shop womenswear.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: p.name,
                description: p.description,
                brand: { "@type": "Brand", name: "Eagon Shop" },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: p.rating,
                  reviewCount: p.reviews,
                },
                offers: {
                  "@type": "Offer",
                  price: p.price,
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              }),
            },
          ]
        : [],
    };
  },
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold">This piece didn't load</h1>
      <Link to="/shop" search={{}} className="link-underline mt-4 inline-block text-sm">
        Back to shop
      </Link>
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold">Piece not found</h1>
      <Link to="/shop" search={{}} className="link-underline mt-4 inline-block text-sm">
        Back to shop
      </Link>
    </main>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const product = findProduct(slug)!;
  const { addToCart, wishlist, toggleWishlist, addRecent, recent, wholesaleMode } = useShop();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [chartOpen, setChartOpen] = useState(false);

  useEffect(() => {
    setActive(0);
    setSize(product.sizes[1] ?? product.sizes[0]);
    setColor(product.colors[0].name);
    setQty(1);
    addRecent(product.slug);
  }, [product.slug]);

  const wished = wishlist.includes(product.slug);
  const similar = products.filter((p) => p.slug !== product.slug && p.group === product.group).slice(0, 4);
  const fbt = products.filter((p) => p.slug !== product.slug).slice(0, 2);
  const bundle = product.price + fbt.reduce((n, p) => n + p.price, 0);
  const recentList = recent.map(findProduct).filter(Boolean).slice(0, 4);

  const stock = stockFor(product);
  const delivery = deliveryEstimate();
  const tiers = wholesaleTiers(product.price);
  const bulk = wholesaleMode || qty >= MOQ;
  const unitPrice = bulk ? wholesaleUnitPrice(product.price, qty) : product.price;
  const savings = bulk ? bulkSavings(product.price, qty) : 0;
  const enquiryText = encodeURIComponent(
    `Hi Eagon Shop, I'd like a wholesale quotation for "${product.name}" (${size}, ${color}) — quantity ${Math.max(qty, MOQ)} pieces.`,
  );
  const quoteSubject = encodeURIComponent(`Quotation request — ${product.name}`);

  const add = (quantity = qty, wholesale = bulk) =>
    addToCart({
      slug: product.slug,
      name: product.name,
      price: wholesale ? wholesaleUnitPrice(product.price, quantity) : product.price,
      image: product.images[0],
      size,
      color,
      qty: quantity,
      wholesale,
    });

  const buyNow = () => {
    add();
    navigate({ to: "/checkout" });
  };

  const buyBulk = () => {
    const quantity = Math.max(qty, MOQ);
    setQty(quantity);
    add(quantity, true);
    navigate({ to: "/checkout" });
  };


  return (
    <main className="mx-auto max-w-7xl px-6 py-10 pb-28 lg:pb-10">
      <nav className="eyebrow flex flex-wrap gap-2">
        <Link to="/" className="link-underline">Home</Link>
        <span>/</span>
        <Link to="/shop" search={{ group: product.group }} className="link-underline">{product.group}</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="grid gap-3 sm:grid-cols-[80px_minmax(0,1fr)]">
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`w-20 shrink-0 border ${active === i ? "border-foreground" : "border-transparent"}`}
              >
                <img src={img} alt="" className="aspect-3/4 w-full object-cover" />
              </button>
            ))}
          </div>
          <div
            className="order-1 overflow-hidden bg-secondary sm:order-2"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={product.images[active]}
              alt={product.name}
              width={900}
              height={1200}
              className="aspect-3/4 w-full object-cover transition-transform duration-300"
              style={
                zoom
                  ? { transform: "scale(1.7)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3.5 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />
              ))}
            </span>
            <span className="text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{inr(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {Math.round(100 - (product.price / product.mrp) * 100)}% off
            </span>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Colour · {color}</p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  className={`size-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === c.name ? "border-foreground" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Size</p>
              <button
                type="button"
                onClick={() => setChartOpen((c) => !c)}
                className="link-underline flex items-center gap-1.5 text-xs uppercase tracking-[0.16em]"
              >
                <Ruler className="size-3.5" /> Size chart
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-11 border px-3 py-2 text-xs transition-colors ${
                    size === s ? "border-foreground bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {chartOpen && (
              <table className="glass mt-4 w-full text-xs">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Size</th>
                    <th className="p-2">Bust</th>
                    <th className="p-2">Waist</th>
                    <th className="p-2">Length</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["XS", "32", "26", "44"],
                    ["S", "34", "28", "44"],
                    ["M", "36", "30", "45"],
                    ["L", "38", "32", "45"],
                    ["XL", "40", "34", "46"],
                    ["XXL", "42", "36", "46"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-border">
                      {r.map((c) => (
                        <td key={c} className="p-2">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-4 border border-border px-4 py-3">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="size-3.5" />
              </button>
              <span className="text-sm">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
                <Plus className="size-3.5" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.slug)}
              className="glass grid size-12 place-items-center"
            >
              <Heart className={`size-4 ${wished ? "fill-current text-gold" : ""}`} />
            </button>
            <p className={`text-xs ${stock > 15 ? "text-muted-foreground" : "text-gold"}`}>
              {stock > 15 ? "In stock" : `Only ${stock} left`}
            </p>
          </div>

          <div className="glass mt-6 p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow flex items-center gap-2">
                <Layers className="size-3.5 text-gold" /> Wholesale rate card
              </p>
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                MOQ {MOQ} pcs
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Retail · 1 piece</span>
                <span>{inr(product.price)}</span>
              </li>
              {tiers.map((t) => (
                <li
                  key={t.minQty}
                  className={`flex justify-between ${
                    qty >= t.minQty && t.price !== null ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  <span>{t.minQty}+ pieces</span>
                  <span>{t.price === null ? "Contact us" : `${inr(t.price)} each`}</span>
                </li>
              ))}
            </ul>
            {qty >= MOQ && (
              <p className="mt-3 text-xs">
                Your price for {qty} pcs:{" "}
                <span className="font-semibold">{inr(unitPrice)} each</span> · total {inr(unitPrice * qty)}
                {savings > 0 && <span className="text-gold"> (save {inr(savings)})</span>}
              </p>
            )}
            {!wholesaleMode && (
              <Link to="/wholesale" className="link-underline mt-3 inline-block text-xs">
                Register as a wholesaler to unlock these rates
              </Link>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => add()}
              className="bg-primary py-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="border border-foreground py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-secondary"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={buyBulk}
              className="border border-border py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-secondary"
            >
              Buy in bulk ({MOQ}+ pcs)
            </button>
            <a
              href={`${CONTACT.whatsappChat}?text=${enquiryText}`}
              target="_blank"
              rel="noreferrer"
              className="border border-border py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-secondary"
            >
              Wholesale enquiry
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${quoteSubject}&body=${enquiryText}`}
              className="border border-border py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-secondary sm:col-span-2"
            >
              Request quotation
            </a>
          </div>

          <div className="mt-6 grid gap-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2"><Truck className="size-3.5 text-gold" /> Delivery estimate: {delivery} · dispatched in 24h · free above ₹999</p>
            <p className="flex items-center gap-2"><RotateCcw className="size-3.5 text-gold" /> Easy 7-day returns &amp; exchange — unworn, tags intact</p>
            <p className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-gold" /> Razorpay · UPI · Cards · Net banking · Wallets · COD</p>
          </div>


          <div className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
            <div>
              <p className="eyebrow">Description</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <p className="eyebrow">Fabric &amp; care</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {product.fabric} Gentle machine wash cold, dry in shade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <p className="eyebrow">Complete the look</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Frequently bought together</h2>
        <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid grid-cols-3 gap-4">
            {[product, ...fbt].map((p) => (
              <div key={`fbt-${p.slug}`}>
                <img src={p.images[0]} alt={p.name} loading="lazy" className="aspect-3/4 w-full object-cover" />
                <p className="mt-2 truncate text-xs">{p.name}</p>
                <p className="text-xs text-muted-foreground">{inr(p.price)}</p>
              </div>
            ))}
          </div>
          <div className="glass p-6 text-center">
            <p className="eyebrow">Bundle price</p>
            <p className="mt-2 text-2xl font-semibold">{inr(Math.round(bundle * 0.9))}</p>
            <p className="text-xs text-muted-foreground line-through">{inr(bundle)}</p>
            <button
              type="button"
              onClick={() => [product, ...fbt].forEach((p) =>
                addToCart({
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  image: p.images[0],
                  size: p.sizes[1] ?? p.sizes[0],
                  color: p.colors[0].name,
                  qty: 1,
                }),
              )}
              className="mt-4 w-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              Add all three
            </button>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">What customers say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviewsList.map((r, i) => (
            <Reveal key={`rev-${r.name}`} delay={i * 70}>
              <blockquote className="glass h-full p-6">
                <div className="flex text-gold">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
                <footer className="eyebrow mt-4">{r.name} · {r.city}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="eyebrow">You may also like</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Similar products</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {similar.map((p) => (
            <ProductCard key={`sim-${p.slug}`} product={p} />
          ))}
        </div>
      </section>

      {recentList.length > 1 && (
        <section className="mt-20">
          <p className="eyebrow">Recently viewed</p>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {recentList.map((p) => p && <ProductCard key={`rec-${p.slug}`} product={p} />)}
          </div>
        </section>
      )}

      <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 p-3 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs">{product.name}</p>
          <p className="text-sm font-semibold">{inr(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => add()}
          className="shrink-0 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
        >
          Add to cart
        </button>
      </div>
    </main>
  );
}
