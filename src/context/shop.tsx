import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  recent: string[];
  addToCart: (line: CartLine) => void;
  removeLine: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  addRecent: (slug: string) => void;
  cartCount: number;
  subtotal: number;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ShopContext = createContext<ShopState | null>(null);

function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocal<CartLine[]>("eagon.cart", []);
  const [wishlist, setWishlist] = useLocal<string[]>("eagon.wishlist", []);
  const [recent, setRecent] = useLocal<string[]>("eagon.recent", []);
  const [theme, setTheme] = useLocal<"light" | "dark">("eagon.theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo<ShopState>(
    () => ({
      cart,
      wishlist,
      recent,
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      addToCart: (line) =>
        setCart((prev) => {
          const idx = prev.findIndex(
            (l) => l.slug === line.slug && l.size === line.size && l.color === line.color,
          );
          if (idx === -1) return [...prev, line];
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
          return next;
        }),
      removeLine: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      setQty: (index, qty) =>
        setCart((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      toggleWishlist: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
      addRecent: (slug) =>
        setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 6)),
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      subtotal: cart.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    [cart, wishlist, recent, theme, setCart, setWishlist, setRecent, setTheme],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
