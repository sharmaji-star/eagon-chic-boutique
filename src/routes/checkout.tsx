import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Banknote, Building2 } from "lucide-react";
import { inr } from "@/data/products";
import { shippingFor, CONTACT } from "@/data/catalog";
import { useShop, type Order } from "@/context/shop";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Eagon Shop" },
      {
        name: "description",
        content:
          "Enter your shipping address and pay with UPI, Razorpay, cards, net banking or cash on delivery. Free shipping above ₹999.",
      },
      { property: "og:title", content: "Secure Checkout — Eagon Shop" },
      { property: "og:description", content: "Address, payment and order confirmation in three quick steps." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "razorpay", label: "Razorpay (Cards / UPI / Wallets)", icon: CreditCard },
  { id: "upi", label: "UPI — GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "netbanking", label: "Net banking", icon: Building2 },
  { id: "cod", label: "Cash on delivery", icon: Banknote },
];

const emptyAddress = { name: "", phone: "", line1: "", city: "", state: "", pincode: "" };

function Checkout() {
  const { cart, subtotal, placeOrder } = useShop();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState(emptyAddress);
  const [payment, setPayment] = useState("razorpay");
  const [order, setOrder] = useState<Order | null>(null);

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const addressValid =
    address.name.trim().length > 1 &&
    /^\d{10}$/.test(address.phone.trim()) &&
    address.line1.trim().length > 4 &&
    address.city.trim().length > 1 &&
    address.state.trim().length > 1 &&
    /^\d{6}$/.test(address.pincode.trim());

  const confirm = () => {
    const created: Order = {
      id: `EG${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      lines: cart,
      subtotal,
      shipping,
      total,
      payment: payments.find((p) => p.id === payment)?.label ?? payment,
      address,
    };
    setOrder(created);
    placeOrder(created);
    setStep(3);
  };

  if (step === 3 && order) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="glass p-10">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-5" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Order confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Order <span className="text-foreground">{order.id}</span> · {inr(order.total)} · {order.payment}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            We've noted your order for {order.address.name}, {order.address.city}. Our team will confirm dispatch on
            WhatsApp at {order.address.phone}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              search={{}}
              className="bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              Continue shopping
            </Link>
            <a
              href={CONTACT.whatsappChat}
              target="_blank"
              rel="noreferrer"
              className="border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Track on WhatsApp
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold">Nothing to check out</h1>
        <Link to="/shop" search={{}} className="link-underline mt-4 inline-block text-sm">
          Browse the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Checkout</h1>

      <ol className="mt-6 flex gap-6 text-xs uppercase tracking-[0.18em]">
        {["Address", "Payment", "Confirm"].map((s, i) => (
          <li key={s} className={step === i + 1 ? "text-foreground" : "text-muted-foreground"}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "name", label: "Full name", span: true },
                { k: "phone", label: "Phone (10 digits)" },
                { k: "pincode", label: "PIN code" },
                { k: "line1", label: "Address", span: true },
                { k: "city", label: "City" },
                { k: "state", label: "State" },
              ].map((f) => (
                <label key={f.k} className={f.span ? "sm:col-span-2" : ""}>
                  <span className="eyebrow">{f.label}</span>
                  <input
                    value={address[f.k as keyof typeof address]}
                    onChange={(e) => setAddress({ ...address, [f.k]: e.target.value.slice(0, 120) })}
                    className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-foreground"
                  />
                </label>
              ))}
              <button
                type="button"
                disabled={!addressValid}
                onClick={() => setStep(2)}
                className="mt-2 bg-primary py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-40 sm:col-span-2"
              >
                Continue to payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {payments.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPayment(p.id)}
                  className={`flex w-full items-center gap-3 border px-4 py-4 text-left text-sm transition-colors ${
                    payment === p.id ? "border-foreground bg-secondary" : "border-border"
                  }`}
                >
                  <p.icon className="size-4 text-gold" />
                  {p.label}
                </button>
              ))}
              <p className="text-xs text-muted-foreground">
                Online payments go live as soon as the Razorpay keys are connected. COD orders are confirmed on
                WhatsApp.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-border py-3.5 text-xs uppercase tracking-[0.2em]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="flex-1 bg-primary py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Place order
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="glass h-fit p-6">
          <p className="eyebrow">Order summary</p>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((l, i) => (
              <li key={`${l.slug}-${i}`} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-muted-foreground">
                  {l.name} × {l.qty}
                </span>
                <span>{inr(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{inr(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
