import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
  wholesale?: boolean;
};

export type WholesaleAccount = {
  business: string;
  gst?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
};

export type Order = {
  id: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: string;
  address: {
    name: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
};

type ShopState = {
  cart: CartLine[];
  saved: CartLine[];
  wishlist: string[];
  recent: string[];
  orders: Order[];
  wholesale: WholesaleAccount | null;
  wholesaleMode: boolean;
  addToCart: (line: CartLine) => void;
  removeLine: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  saveForLater: (index: number) => void;
  moveToCart: (index: number) => void;
  removeSaved: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  addRecent: (slug: string) => void;
  registerWholesale: (account: WholesaleAccount) => void;
  setWholesaleMode: (on: boolean) => void;
  placeOrder: (order: Order) => void;
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
  const [saved, setSaved] = useLocal<CartLine[]>("eagon.saved", []);
  const [wishlist, setWishlist] = useLocal<string[]>("eagon.wishlist", []);
  const [recent, setRecent] = useLocal<string[]>("eagon.recent", []);
  const [orders, setOrders] = useLocal<Order[]>("eagon.orders", []);
  const [wholesale, setWholesale] = useLocal<WholesaleAccount | null>("eagon.wholesale", null);
  const [wholesaleMode, setMode] = useLocal<boolean>("eagon.wholesaleMode", false);
  const [theme, setTheme] = useLocal<"light" | "dark">("eagon.theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo<ShopState>(
    () => ({
      cart,
      saved,
      wishlist,
      recent,
      orders,
      wholesale,
      wholesaleMode: wholesaleMode && wholesale !== null,
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      addToCart: (line) =>
        setCart((prev) => {
          const idx = prev.findIndex(
            (l) =>
              l.slug === line.slug &&
              l.size === line.size &&
              l.color === line.color &&
              !!l.wholesale === !!line.wholesale,
          );
          if (idx === -1) return [...prev, line];
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
          return next;
        }),
      removeLine: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      setQty: (index, qty) =>
        setCart((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l))),
      saveForLater: (index) =>
        setCart((prev) => {
          const line = prev[index];
          if (line) setSaved((s) => [...s, line]);
          return prev.filter((_, i) => i !== index);
        }),
      moveToCart: (index) =>
        setSaved((prev) => {
          const line = prev[index];
          if (line) setCart((c) => [...c, line]);
          return prev.filter((_, i) => i !== index);
        }),
      removeSaved: (index) => setSaved((prev) => prev.filter((_, i) => i !== index)),
      clearCart: () => setCart([]),
      toggleWishlist: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
      addRecent: (slug) =>
        setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 6)),
      registerWholesale: (account) => {
        setWholesale(account);
        setMode(true);
      },
      setWholesaleMode: (on) => setMode(on),
      placeOrder: (order) => {
        setOrders((prev) => [order, ...prev]);
        setCart([]);
      },
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      subtotal: cart.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    [
      cart,
      saved,
      wishlist,
      recent,
      orders,
      wholesale,
      wholesaleMode,
      theme,
      setCart,
      setSaved,
      setWishlist,
      setRecent,
      setOrders,
      setWholesale,
      setMode,
      setTheme,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
