import western from "@/assets/cat-western.jpg";
import indian from "@/assets/cat-indian.jpg";
import coord from "@/assets/cat-coord.jpg";
import tops from "@/assets/cat-tops.jpg";
import premiumCoord from "@/assets/premium-coord.jpg";
import detail from "@/assets/detail-1.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  category: string;
  group: "Western Wear" | "Indian Wear";
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  description: string;
  rating: number;
  reviews: number;
  tags: ("trending" | "bestseller" | "new" | "offer")[];
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const categories = [
  { name: "Western Wear", slug: "western-wear", image: western },
  { name: "Indian Wear", slug: "indian-wear", image: indian },
  { name: "Co-ord Sets", slug: "co-ord-sets", image: coord },
  { name: "Kurtis", slug: "kurtis", image: indian },
  { name: "Dresses", slug: "dresses", image: western },
  { name: "Tops", slug: "tops", image: tops },
  { name: "Plazo", slug: "plazo", image: coord },
  { name: "Bottom Wear", slug: "bottom-wear", image: tops },
  { name: "New Arrivals", slug: "new-arrivals", image: detail },
];

export const products: Product[] = [
  {
    slug: "noir-column-midi-dress",
    name: "Noir Column Midi Dress",
    price: 1299,
    mrp: 2499,
    category: "Dresses",
    group: "Western Wear",
    images: [western, tops, detail],
    colors: [
      { name: "Noir", hex: "#111111" },
      { name: "Sand", hex: "#d9c7ad" },
    ],
    sizes,
    fabric: "Poly-crepe with soft matte finish, fully lined bodice.",
    description:
      "A fluid column silhouette with a deep V neckline and jewelled buttons. Cut to skim the body and fall into a soft flare below the knee.",
    rating: 4.8,
    reviews: 214,
    tags: ["trending", "bestseller"],
  },
  {
  slug: "premium-co-ord-set",
  name: "Premium Co-ord Set",
  price: 1699,
  mrp: 3199,
    category: "Co-ord Sets",
group: "Indian Wear",
images: [premiumCoord, detail, coord],
  
    colors: [
      { name: "Teal Blue", hex: "#1e4a5f" },
      { name: "Ivory", hex: "#f3e9d9" },
    ],
    sizes,
    fabric: "Pure mul Chanderi with embroidery, handwork applique and organza dupatta.",
    description:
      "A refined Chanderi kurta set in deep teal with vibrant floral embroidery and handwork applique. Finished with a sheer organza dupatta and lace-trimmed pants.",
    rating: 4.9,
    reviews: 331,
    tags: ["bestseller", "new"],
  },
  {
    slug: "linen-co-ord-set",
    name: "Cream Linen Co-ord Set",
    price: 1499,
    mrp: 2799,
    category: "Co-ord Sets",
    group: "Western Wear",
    images: [coord, detail, western],
    colors: [
      { name: "Cream", hex: "#f0e6d6" },
      { name: "Olive", hex: "#6f7255" },
    ],
    sizes,
    fabric: "Breathable washed linen-viscose, pre-shrunk.",
    description:
      "Relaxed camp-collar shirt with a belted wide-leg trouser. An easy two-piece that reads polished on its own or apart.",
    rating: 4.7,
    reviews: 168,
    tags: ["trending", "new"],
  },
  {
    slug: "satin-palazzo-set",
    name: "Onyx Satin Palazzo Set",
    price: 1899,
    mrp: 3499,
    category: "Plazo Sets",
    group: "Indian Wear",
    images: [tops, western, detail],
    colors: [
      { name: "Onyx", hex: "#0d0d0d" },
      { name: "Champagne", hex: "#d8c49a" },
    ],
    sizes,
    fabric: "Liquid satin with a fluid drape and matte reverse.",
    description:
      "A draped cowl top with sweeping palazzo trousers — evening dressing with an effortless, modern ease.",
    rating: 4.8,
    reviews: 96,
    tags: ["offer", "trending"],
  },
  {
    slug: "sand-wrap-top",
    name: "Sand Wrap Top",
    price: 899,
    mrp: 1599,
    category: "Tops",
    group: "Western Wear",
    images: [detail, coord, indian],
    colors: [
      { name: "Sand", hex: "#dcc9ac" },
      { name: "White", hex: "#f7f5f0" },
    ],
    sizes,
    fabric: "Crinkled viscose with a tie waist.",
    description:
      "A featherlight wrap top with rolled sleeves — the quiet layer that finishes denim, trousers and skirts alike.",
    rating: 4.6,
    reviews: 142,
    tags: ["new", "offer"],
  },
  {
    slug: "ochre-anarkali-kurti",
    name: "Ochre Panelled Kurti",
    price: 1099,
    mrp: 1999,
    category: "Kurtis",
    group: "Indian Wear",
    images: [indian, coord, detail],
    colors: [
      { name: "Ochre", hex: "#c79a4b" },
      { name: "Ivory", hex: "#f2e8d8" },
    ],
    sizes,
    fabric: "Handloom-effect cotton with gold-tone piping.",
    description:
      "Panelled flare with a mandarin collar and fine gold piping. Everyday ethnic that carries into occasion wear.",
    rating: 4.7,
    reviews: 203,
    tags: ["bestseller"],
  },
  {
    slug: "tailored-wide-trouser",
    name: "Tailored Wide Trouser",
    price: 1199,
    mrp: 2199,
    category: "Trousers",
    group: "Western Wear",
    images: [tops, coord, detail],
    colors: [
      { name: "Noir", hex: "#101010" },
      { name: "Stone", hex: "#c9c2b6" },
    ],
    sizes,
    fabric: "Structured twill with a soft hand-feel.",
    description:
      "High-rise, pleated and pressed to a clean line. Built to hold shape through long days.",
    rating: 4.5,
    reviews: 88,
    tags: ["new"],
  },
  {
    slug: "gold-thread-dupatta",
    name: "Gold Thread Dupatta",
    price: 699,
    mrp: 1299,
    category: "Dupattas",
    group: "Indian Wear",
    images: [detail, indian, coord],
    colors: [
      { name: "Champagne", hex: "#dcc38c" },
      { name: "Ivory", hex: "#f4ece0" },
    ],
    sizes: ["Free Size"],
    fabric: "Sheer organza with metallic thread borders.",
    description:
      "A weightless organza drape edged in fine gold thread — the finishing note to any ethnic set.",
    rating: 4.8,
    reviews: 61,
    tags: ["offer"],
  },
];

export const byTag = (tag: Product["tags"][number]) =>
  products.filter((p) => p.tags.includes(tag));

export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const reviewsList = [
  {
    name: "Ananya S.",
    city: "Bengaluru",
    text: "The fabric feels far more expensive than the price. My kurta set fit perfectly straight out of the box.",
    rating: 5,
  },
  {
    name: "Riya M.",
    city: "Mumbai",
    text: "Ordered the linen co-ord for work — the tailoring is genuinely premium. Delivery was in three days.",
    rating: 5,
  },
  {
    name: "Sneha K.",
    city: "Delhi",
    text: "Easy returns made trying sizes stress-free. I've now bought four pieces from Eagon.",
    rating: 4,
  },
];
