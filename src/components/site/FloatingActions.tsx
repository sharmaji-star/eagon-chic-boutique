import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

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
            Hi! Ask us about sizing, fabric or delivery — a stylist replies within minutes.
          </p>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <input
              placeholder="Type a message…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <Send className="size-4 text-gold" />
          </div>
        </div>
      )}

      <a
        href="https://wa.me/919000000000"
        aria-label="Chat on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-300 hover:scale-105"
      >
        <MessageCircle className="size-5" />
      </a>

      <button
        type="button"
        aria-label="Open live chat"
        onClick={() => setChat((c) => !c)}
        className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
      >
        Live chat
      </button>
    </div>
  );
}
