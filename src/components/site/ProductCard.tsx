import { Link } from "@tanstack/react-router";
import { Heart, Eye, Layers } from "lucide-react";
import { inr, type Product } from "@/data/products";
import { useShop } from "@/context/shop";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart, wholesaleMode } = useShop();
  const wished = wishlist.includes(product.slug);
  const off = Math.round(100 - (product.price / product.mrp) * 100);
  const wholesaleOff = Math.round(100 - (product.wholesalePrice / product.price) * 100);
  const qty = wholesaleMode ? product.moq : 1;
  const unit = wholesaleMode ? product.wholesalePrice : product.price;

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden bg-secondary"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1200}
          className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.slug)}
        className="glass absolute right-3 top-3 grid size-9 place-items-center rounded-full transition-transform duration-300 hover:scale-110"
      >
        <Heart className={`size-4 ${wished ? "fill-current text-gold" : ""}`} />
      </button>

      {wholesaleMode ? (
        <span className="absolute left-3 top-3 flex items-center gap-1 bg-primary px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
          <Layers className="size-3" /> {wholesaleOff}% bulk off
        </span>
      ) : (
        off > 0 && (
          <span className="absolute left-3 top-3 bg-primary px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
            {off}% off
          </span>
        )
      )}

      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-400 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={() =>
            addToCart({
              slug: product.slug,
              name: product.name,
              price: unit,
              image: product.images[0],
              size: product.sizes[1] ?? product.sizes[0],
              color: product.colors[0].name,
              qty,
              wholesale: wholesaleMode,
            })
          }
          className="flex-1 bg-primary py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          {wholesaleMode ? `Bulk add · ${product.moq}` : "Add to cart"}
        </button>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label="Quick view"
          className="glass grid size-10 place-items-center"
        >
          <Eye className="size-4" />
        </Link>
      </div>

      <div className="mt-4 space-y-1">
        <p className="eyebrow">{product.category}</p>
        <h3 className="text-sm font-medium text-foreground">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="link-underline">
            {product.name}
          </Link>
        </h3>
        {wholesaleMode ? (
          <>
            <p className="flex items-baseline gap-2 text-sm">
              <span className="font-semibold text-foreground">{inr(product.wholesalePrice)}</span>
              <span className="text-xs text-muted-foreground">/ pc</span>
              <span className="text-xs text-muted-foreground line-through">{inr(product.price)}</span>
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              MOQ {product.moq} pcs · {inr(product.wholesalePrice * product.moq)} lot
            </p>
          </>
        ) : (
          <p className="flex items-baseline gap-2 text-sm">
            <span className="font-semibold text-foreground">{inr(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
          </p>
        )}
      </div>
    </article>
  );
}
