import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";
import heroAsset from "@/assets/hero-pink-floral.jpg.asset.json";
import detail from "@/assets/detail-1.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { byTag, categories, products, reviewsList, type Product } from "@/data/products";

const pick = (...lists: Product[][]) =>
  [...new Map(lists.flat().map((p) => [p.slug, p])).values()].slice(0, 4);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eagon Shop — Affordable Luxury Womenswear Online" },
      {
        name: "description",
        content:
          "Shop Eagon Shop's edit of western and Indian wear for women — dresses, kurtis, co-ord sets and plazo. Free shipping above ₹999, 7-day returns.",
      },
      { property: "og:title", content: "Eagon Shop — Affordable Luxury Womenswear Online" },
      {
        property: "og:description",
        content: "Shop Eagon Shop's edit of western and Indian wear for women — dresses, kurtis, co-ord sets and plazo. Free shipping above ₹999, 7-day returns.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function SectionHead({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link to="/shop" search={{}} className="link-underline shrink-0 text-xs uppercase tracking-[0.2em]">
          View all
        </Link>
      )}
    </div>
  );
}

function Home() {
  return (
    <main>
      <section className="relative">
        <img
          src={heroAsset.url}
          alt="Model wearing a pink floral tiered mini dress with a straw hat"
          width={1024}
          height={1536}
          className="h-[86vh] min-h-[520px] w-full object-cover object-[50%_20%]"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-md">
              <p className="eyebrow">Autumn Edit 2026</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Quiet luxury,
                <span className="block text-gold-gradient">everyday price.</span>
              </h1>
              <p className="mt-5 max-w-sm text-sm text-muted-foreground sm:text-base">
                Considered western and Indian silhouettes for women — refined fabrics, honest pricing,
                delivered across India.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  search={{}}
                  className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Shop Now
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/shop"
                  search={{ group: "Indian Wear" }}
                  className="link-underline text-xs uppercase tracking-[0.24em]"
                >
                  Explore Indian wear
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3">
          {[
            { icon: Truck, label: "Free shipping above ₹999" },
            { icon: RotateCcw, label: "Easy 7-day returns" },
            { icon: ShieldCheck, label: "Secure payments · UPI & COD" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <Icon className="size-4 shrink-0 text-gold" />
              <span className="min-w-0">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrow="Shop by category" title="Featured Categories" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                to="/shop"
                search={{ category: c.name }}
                className="group relative block overflow-hidden"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3">
                  <span className="glass block px-4 py-2.5 text-xs uppercase tracking-[0.18em]">
                    {c.name}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHead eyebrow="Loved right now" title="Trending Collection" href="/shop" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {pick(byTag("trending"), byTag("new")).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="marquee-track flex w-max gap-10 text-xs uppercase tracking-[0.32em]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              {["New arrivals weekly", "Made in India", "Sizes XS–XXL", "Fabric-first design", "COD available"].map(
                (t) => (
                  <span key={t}>{t}</span>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrow="Customer favourites" title="Best Sellers" href="/shop" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {pick(byTag("bestseller"), products).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHead eyebrow="Just landed" title="New Arrivals" href="/shop" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {pick(byTag("new"), products.slice(2)).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <div className="grid items-center gap-0 overflow-hidden bg-secondary md:grid-cols-2">
            <img
              src={detail}
              alt="Folded beige and black clothing with gold jewellery"
              loading="lazy"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
            <div className="p-8 sm:p-12">
              <p className="eyebrow">Limited time</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Festive edit up to 45% off</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Use code <span className="font-semibold text-foreground">EAGON45</span> at checkout.
                Ends Sunday, or while stocks last.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { v: "02", l: "Days" },
                  { v: "14", l: "Hrs" },
                  { v: "38", l: "Min" },
                ].map((t) => (
                  <div key={t.l} className="glass px-4 py-3 text-center">
                    <p className="text-xl font-semibold">{t.v}</p>
                    <p className="eyebrow">{t.l}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/shop"
                search={{}}
                className="mt-8 inline-block bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground"
              >
                Shop the offer
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHead eyebrow="4.8 average rating" title="Customer Reviews" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviewsList.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <blockquote className="glass h-full p-6">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed">{r.text}</p>
                <footer className="eyebrow mt-5">
                  {r.name} · {r.city}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHead eyebrow="@eagonshop" title="Styled by you" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {categories.slice(0, 6).map((c, i) => (
            <Reveal key={`gram-${c.slug}`} delay={i * 50}>
              <img
                src={c.image}
                alt={`Eagon Shop customer wearing ${c.name}`}
                loading="lazy"
                width={900}
                height={1200}
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <Reveal>
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Get ₹200 off your first order
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Early access to drops, private sales and styling notes. No spam, ever.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass mx-auto mt-7 flex max-w-md items-center gap-2 p-2"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              Join
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
