## Goal
Extend Eagon Shop (keeping all existing products, design and pages) into a full retail + wholesale platform: mega menu, wholesale pricing tiers, real checkout, cart, filters, richer product pages, wholesale registration, contact/WhatsApp, and an admin dashboard.

## Approach
This is too much for one pass. I'll build it in 4 phases, each shippable, and preserve current styling (black/white/beige/gold, glassmorphism) and product data.

### Phase 1 — Catalog structure + wholesale pricing (frontend only)
- Extend the product type: `gender` (Women/Men/Kids), `category`, `wholesale` tiers (`{ minQty, price }[]`), `moq`, `stock`, `retailPrice`.
- Existing products keep their current price as retail; wholesale tiers auto-derived (10+ / 25+ / 50+ / 100+ = contact) so nothing is lost.
- Mega menu in the header: Women / Men / Kids / Sale with the exact sub-categories requested; each opens `/shop` filtered by gender + category (own page, only that category's products).
- Placeholder seed products for Men and Kids categories so those pages aren't empty (clearly marked, easy to replace with your photos).
- Filters panel upgraded: gender, price, size, color, category, New Arrival / Best Seller / Trending / Sale.
- Product page additions: quantity selector, wholesale tier table, stock status, delivery estimate, return policy, reviews block, related products (zoom/size/color already exist).
- Buttons: Add to Cart, Buy Now, Buy in Bulk, Wholesale Enquiry, Request Quotation.
- Cart: save-for-later, quantity, remove (cart already persists locally).
- Contact page + floating WhatsApp button using your phone, email and group link.

### Phase 2 — Lovable Cloud backend
Enable Cloud (database + auth + server functions), then:
- Tables: `products`, `categories`, `banners`, `orders`, `order_items`, `wholesale_accounts`, `quote_requests`, `reviews`, `user_roles` (admin role in a separate table, RLS on everything).
- Products move from the hardcoded file into the database, seeded from your current catalog so nothing disappears.
- Wholesale registration form (business name, GST optional, name, phone, email, city, state, country) → account created, wholesale prices shown automatically once approved.
- Auth: email/password sign-in for customers, wholesale accounts and admin.

### Phase 3 — Checkout + orders
- Buy Now flow: address → payment method → confirmation, with real order records.
- Shipping rules: free above ₹999, tiered charge below.
- COD works end-to-end. Razorpay/UPI/cards/net banking need a Razorpay key — I'll wire the integration and ask you for the key ID/secret at that point (stored securely, never in code).

### Phase 4 — Admin dashboard
- Protected `/admin`: create/edit/delete products, multi-image upload to Cloud storage, retail + wholesale prices, MOQ, stock, categories, banners, and order management (status updates), plus wholesale registrations and quote requests.

## Technical notes
- Stack stays TanStack Start + React + Tailwind v4 + TypeScript; Supabase-backed Lovable Cloud for data/auth/storage. (Next.js isn't used here — this stack is fixed and gives the same SSR/SEO benefits.)
- Routes added: `/shop/$gender/$category` style filtered pages via search params, `/cart`, `/checkout`, `/order/$id`, `/wholesale`, `/contact`, `/admin/*`.
- Each route gets its own SEO head metadata.
- Nothing existing is removed; only extended.

I'll start with Phase 1 unless you'd rather I enable Cloud first.
