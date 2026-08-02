import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { CONTACT } from "@/data/catalog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eagon Shop — Retail & Wholesale Support" },
      {
        name: "description",
        content:
          "Talk to Eagon Shop on WhatsApp, phone 7983642540 or email gauav4680@gmail.com for orders, sizing help and wholesale enquiries.",
      },
      { property: "og:title", content: "Contact Eagon Shop" },
      { property: "og:description", content: "Phone, email and WhatsApp support for retail and wholesale buyers." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">We're here to help</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Questions about sizing, fabric, bulk rates or an existing order? Reach us any way you like — we usually reply
        within minutes.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a href={`tel:+91${CONTACT.phone}`} className="glass block p-6">
          <Phone className="size-4 text-gold" />
          <p className="mt-3 eyebrow">Phone</p>
          <p className="mt-1 text-lg">{CONTACT.phone}</p>
        </a>

        <a href={`mailto:${CONTACT.email}`} className="glass block p-6">
          <Mail className="size-4 text-gold" />
          <p className="mt-3 eyebrow">Email</p>
          <p className="mt-1 break-all text-lg">{CONTACT.email}</p>
        </a>

        <a href={CONTACT.whatsappChat} target="_blank" rel="noreferrer" className="glass block p-6">
          <MessageCircle className="size-4 text-gold" />
          <p className="mt-3 eyebrow">WhatsApp chat</p>
          <p className="mt-1 text-lg">Message us directly</p>
        </a>

        <a href={CONTACT.whatsappGroup} target="_blank" rel="noreferrer" className="glass block p-6">
          <MessageCircle className="size-4 text-gold" />
          <p className="mt-3 eyebrow">WhatsApp group</p>
          <p className="mt-1 text-lg">Daily catalogue drops</p>
        </a>
      </div>

      <div className="glass mt-6 flex items-center gap-3 p-6 text-sm text-muted-foreground">
        <Clock className="size-4 text-gold" />
        Support hours: Monday to Saturday, 10am – 8pm IST.
      </div>
    </main>
  );
}
