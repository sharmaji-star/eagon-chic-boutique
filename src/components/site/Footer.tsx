import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.4em]">Eagon</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Considered Indian and western wear for women — designed in India, priced for everyday.
          </p>
          <div className="mt-5 flex gap-4">
            <a href="https://instagram.com" aria-label="Instagram"><Instagram className="size-4" /></a>
            <a href="https://facebook.com" aria-label="Facebook"><Facebook className="size-4" /></a>
            <a href="https://youtube.com" aria-label="YouTube"><Youtube className="size-4" /></a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" search={{ group: "Western Wear" }} className="link-underline">Western Wear</Link></li>
            <li><Link to="/shop" search={{ group: "Indian Wear" }} className="link-underline">Indian Wear</Link></li>
            <li><Link to="/shop" search={{ category: "Co-ord Sets" }} className="link-underline">Co-ord Sets</Link></li>
            <li><Link to="/shop" search={{ category: "Kurtis" }} className="link-underline">Kurtis</Link></li>
            <li><Link to="/shop" search={{}} className="link-underline">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Shipping &amp; Delivery</li>
            <li>7-Day Returns</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MessageCircle className="size-4" /> +91 90000 00000</li>
            <li className="flex items-center gap-2"><Headphones className="size-4" /> care@eagonshop.com</li>
            <li>Mon–Sat, 10am–7pm IST</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Eagon Shop. Secure payments · UPI · Cards · Net banking · COD
      </div>
    </footer>
  );
}
