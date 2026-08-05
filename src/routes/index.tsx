import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  Factory,
  Layers,
  Sparkles,
  Download,
  Send,
} from "lucide-react";
import slide01 from "@/assets/slide-01.jpg.asset.json";
import slide02 from "@/assets/slide-02.jpg.asset.json";
import slide03 from "@/assets/slide-03.jpg.asset.json";
import slide04 from "@/assets/slide-04.jpg.asset.json";
import slide05 from "@/assets/slide-05.jpg.asset.json";
import slide06 from "@/assets/slide-06.jpg.asset.json";
import slide07 from "@/assets/slide-07.jpg.asset.json";
import slide08 from "@/assets/slide-08.jpg.asset.json";
import slide09 from "@/assets/slide-09.jpg.asset.json";
import slide10 from "@/assets/slide-10.jpg.asset.json";
import catalogPdf from "@/assets/eagon-catalog.pdf.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ProductCard } from "@/components/site/ProductCard";
import { byTag, categories, products, reviewsList, type Product } from "@/data/products";
import { CONTACT, DEFAULT_MOQ } from "@/data/catalog";

const pick = (...lists: Product[][]) =>
  [...new Map(lists.flat().map((p) => [p.slug, p])).values()].slice(0, 4);

const slides = [
  slide01,
  slide02,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
  slide08,
  slide09,
  slide10,
].map((a, i) => ({ src: a.url, alt: `Eagon Shop wholesale collection look ${i + 1}` }));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eagon Shop — Wholesale & Retail Fashion Supplier in India" },
      {
        name: "description",
        content:
          "Factory-direct wholesale fashion from Eagon Shop — kurtis, co-ord sets, dresses and ethnic sets. MOQ 50 pieces, fast dispatch across India, retail & wholesale pricing.",
      },
      { property: "og:title", content: "Eagon Shop — Wholesale & Retail Fashion Supplier in India" },
      {
        property: "og:description",
        content:
          "Factory-direct wholesale fashion — kurtis, co-ord sets, dresses and ethnic sets. MOQ 50 pieces with fast dispatch across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function SectionHead({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link
          to="/shop"
          search={{}}
          className="link-underline shrink-0 text-xs uppercase tracking-[0.2em]"
        >
          View all
        </Link>
      )}
    </div>
  );
}

function InquiryForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", mobile: "", city: "", gst: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const fields: { key: keyof typeof form; label: string; required?: boolean; type?: string }[] = [
    { key: "name", label: "Your name", required: true },
    { key: "business", label: "Business name", required: true },
    { key: "mobile", label: "Mobile number", required: true, type: "tel" },
    { key: "city", label: "City", required: true },
    { key: "gst", label: "GST number (optional)" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const text = `Wholesale enquiry%0AName: ${form.name}%0ABusiness: ${form.business}%0AMobile: ${form.mobile}%0ACity: ${form.city}%0AGST: ${form.gst || "—"}`;
        window.open(`${CONTACT.whatsappChat}?text=${text}`, "_blank", "noopener");
        setSent(true);
      }}
      className="glass grid gap-3 p-6 sm:grid-cols-2"
    >
      {fields.map((f) => (
        <label key={f.key} className={`block ${f.key === "gst" ? "sm:col-span-2" : ""}`}>
          <span className="eyebrow">{f.label}</span>
          <input
            type={f.type ?? "text"}
            required={f.required}
            value={form[f.key]}
            onChange={set(f.key)}
            className="mt-1.5 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-gold"
          />
        </label>
      ))}
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Send className="size-3.5" /> Send enquiry
        </button>
        {sent && <span className="text-xs text-muted-foreground">Thanks — we'll be in touch.</span>}
      </div>
    </form>
  );
}

function Home() {
  return (
    <main>
      <HeroSlider slides={slides} />

      {/* Hero copy — two column */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0">
              <p className="eyebrow">Wholesale first · Since 2019</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Quiet luxury,
                <span className="block text-gold-gradient">wholesale price.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
                Factory-direct western and Indian womenswear for retailers, boutiques and resellers.
                Editorial-grade fabrics, honest per-piece rates from MOQ {DEFAULT_MOQ} pieces, shipped
                across India.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/shop"
                search={{}}
                className="group inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 md:w-auto"
              >
                Shop the collection
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/wholesale"
                className="inline-flex w-full items-center justify-center gap-3 border border-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-secondary md:w-auto"
              >
                Become a wholesale partner
              </Link>
              <Link
                to="/shop"
                search={{ group: "Indian Wear" }}
                className="link-underline mt-1 text-xs uppercase tracking-[0.24em]"
              >
                Explore Indian wear
              </Link>
            </div>
          </div>
        </Reveal>
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

      {/* New Arrivals — directly below the hero */}
      <section className="mx-auto max-w-7xl px-6 py-20">
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
        <SectionHead eyebrow="Shop by category" title="New Collection" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
              {[
                "New arrivals weekly",
                "Made in India",
                `MOQ ${DEFAULT_MOQ} pcs`,
                "Factory direct pricing",
                "COD available",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead
          eyebrow="Customer favourites"
          title="Designed to Impress. Priced to Delight."
          href="/shop"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {pick(byTag("bestseller"), products).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Choose Eagon */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="eyebrow">Wholesale advantage</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Why choose <span className="text-gold-gradient">Eagon</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Factory,
                title: "Factory Direct Pricing",
                text: "No middlemen. Per-piece rates straight from our production floor.",
              },
              {
                icon: Layers,
                title: `MOQ ${DEFAULT_MOQ} Pieces`,
                text: "Start small, scale fast — tiered discounts as your quantity grows.",
              },
              {
                icon: Truck,
                title: "Fast Dispatch Across India",
                text: "Ready stock dispatched in 24–72 hours to every pin code.",
              },
              {
                icon: Sparkles,
                title: "Premium Quality Assurance",
                text: "Every lot checked for stitching, fabric and colour consistency.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="glass h-full p-6">
                  <f.icon className="size-5 text-gold" />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/shop"
              search={{}}
              className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              View wholesale collection
            </Link>
            <Link
              to="/wholesale"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-secondary"
            >
              Become a wholesale partner
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
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
          {slides.slice(0, 6).map((s, i) => (
            <Reveal key={`gram-${s.src}`} delay={i * 50}>
              <img
                src={s.src}
                alt={`Eagon Shop stockist look ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Wholesale network */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">B2B partnership</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Join India's Trusted Wholesale Network
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Get partner rates, priority stock allocation and new-drop catalogues before anyone else.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                Register as wholesale buyer
              </Link>
              <a
                href={catalogPdf.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-secondary"
              >
                <Download className="size-3.5" /> Download latest catalog
              </a>
            </div>
          </div>
          <div className="mt-10">
            <InquiryForm />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
