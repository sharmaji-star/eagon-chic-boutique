import { useState } from "react";
import { MessageCircle, X, Send, Phone, Mail, Users } from "lucide-react";
import { CONTACT } from "@/data/catalog";

export function FloatingActions() {
  const [chat, setChat] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3">
      {chat && (
        <div className="glass w-72 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Eagon Live Chat</p>
            <button type="button" aria-label="Close chat" onClick={() => setChat(false)}>
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Hi! Ask us about sizing, fabric, wholesale rates or delivery — we reply within minutes.
          </p>
          <div className="mt-3 grid gap-2 text-xs">
            <a href={`tel:+91${CONTACT.phone}`} className="flex items-center gap-2">
              <Phone className="size-3.5 text-gold" /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2">
              <Send className="size-3.5 text-gold" /> {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsappGroup}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Users className="size-3.5 text-gold" /> Join wholesale WhatsApp community
            </a>
          </div>
        </div>
      )}

      <a
        href={CONTACT.whatsappChat}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-300 hover:scale-105"
      >
        <MessageCircle className="size-5" />
      </a>

      <a
        href={`tel:+91${CONTACT.phone}`}
        aria-label={`Call ${CONTACT.phone}`}
        className="glass grid size-12 place-items-center rounded-full shadow-soft transition-transform duration-300 hover:scale-105"
      >
        <Phone className="size-5 text-gold" />
      </a>

      <a
        href={`mailto:${CONTACT.email}`}
        aria-label={`Email ${CONTACT.email}`}
        className="glass grid size-12 place-items-center rounded-full shadow-soft transition-transform duration-300 hover:scale-105"
      >
        <Mail className="size-5 text-gold" />
      </a>

      <button
        type="button"
        aria-label="Open contact card"
        onClick={() => setChat((c) => !c)}
        className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
      >
        Contact
      </button>
    </div>
  );
}
