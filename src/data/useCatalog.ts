import { useEffect, useMemo, useState } from "react";
import { products as baseProducts, defaultBanners, type Product } from "./products";
import {
  ADMIN_CHANGE_EVENT,
  getBanners,
  getCustomCategories,
  getOverrides,
  type BannerConfig,
} from "./admin-store";

/** Re-renders whenever the admin dashboard saves a change. */
export function useAdminVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const bump = () => setV((n) => n + 1);
    window.addEventListener(ADMIN_CHANGE_EVENT, bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener(ADMIN_CHANGE_EVENT, bump);
      window.removeEventListener("storage", bump);
    };
  }, []);
  return v;
}

export function applyOverrides(list: Product[] = baseProducts): Product[] {
  const overrides = getOverrides();
  return list
    .map((p) => {
      const o = overrides[p.slug];
      if (!o) return p;
      return {
        ...p,
        name: o.name ?? p.name,
        price: o.price ?? p.price,
        wholesalePrice: o.wholesalePrice ?? p.wholesalePrice,
        moq: o.moq ?? p.moq,
        stock: o.stock ?? p.stock,
        category: o.category ?? p.category,
      };
    })
    .filter((p) => !overrides[p.slug]?.hidden);
}

/** Catalogue with admin edits applied and hidden products removed. */
export function useProducts(): Product[] {
  const v = useAdminVersion();
  return useMemo(() => applyOverrides(), [v]);
}

export function useProduct(slug: string): Product | undefined {
  const list = useProducts();
  return list.find((p) => p.slug === slug);
}

export function useBanners(): Required<Pick<BannerConfig, "hero" | "promo">> & BannerConfig {
  const v = useAdminVersion();
  return useMemo(() => {
    const b = getBanners();
    return { ...b, hero: b.hero || defaultBanners.hero, promo: b.promo || defaultBanners.promo };
  }, [v]);
}

export function useCustomCategories(): string[] {
  const v = useAdminVersion();
  return useMemo(() => getCustomCategories(), [v]);
}
