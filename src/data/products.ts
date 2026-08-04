/**
 * Eagon Shop catalogue.
 * Every image here comes from the owner's own uploaded lookbooks (CDN assets).
 * No AI/demo imagery is used anywhere in this file.
 */

import dressBlackRuffle from "@/assets/dress-black-floral-ruffle.jpg.asset.json";
import dressBlackOff from "@/assets/dress-black-floral-offshoulder.jpg.asset.json";
import dressBlueFloral from "@/assets/dress-blue-floral-tiered.jpg.asset.json";
import dressRedFloral from "@/assets/dress-red-floral-tiered.jpg.asset.json";
import dressBluePrint from "@/assets/dress-blue-print-tiered.jpg.asset.json";

import ethnicTeal1 from "@/assets/ethnic-ivory-teal-1.jpg.asset.json";
import ethnicTeal2 from "@/assets/ethnic-ivory-teal-2.jpg.asset.json";
import ethnicTeal3 from "@/assets/ethnic-ivory-teal-3.jpg.asset.json";
import ethnicRed1 from "@/assets/ethnic-ivory-red-1.jpg.asset.json";
import ethnicRed2 from "@/assets/ethnic-ivory-red-2.jpg.asset.json";
import ethnicRed3 from "@/assets/ethnic-ivory-red-3.jpg.asset.json";
import ethnicRed4 from "@/assets/ethnic-ivory-red-4.jpg.asset.json";
import ethnicPink1 from "@/assets/ethnic-rani-pink-1.jpg.asset.json";
import ethnicPink2 from "@/assets/ethnic-rani-pink-2.jpg.asset.json";
import ethnicPink3 from "@/assets/ethnic-rani-pink-3.jpg.asset.json";
import ethnicNavy1 from "@/assets/ethnic-navy-1.jpg.asset.json";
import ethnicNavy2 from "@/assets/ethnic-navy-2.jpg.asset.json";
import ethnicChikan1 from "@/assets/ethnic-pink-chikan-1.jpg.asset.json";
import ethnicChikan2 from "@/assets/ethnic-pink-chikan-2.jpg.asset.json";

import coordTaupe from "@/assets/coord-taupe-knit.jpg.asset.json";
import coordPolo from "@/assets/coord-beige-polo.jpg.asset.json";
import coordBrown1 from "@/assets/coord-brown-1.jpg.asset.json";
import coordBrown2 from "@/assets/coord-brown-2.jpg.asset.json";
import coordPeplum from "@/assets/coord-white-peplum.jpg.asset.json";
import coordBlackFloral from "@/assets/coord-black-floral.jpg.asset.json";
import coordWhiteFloral from "@/assets/coord-white-floral.jpg.asset.json";
import coordPinkFloral from "@/assets/coord-pink-floral.jpg.asset.json";
import coordPeachFloral from "@/assets/coord-peach-floral.jpg.asset.json";

import kurti35 from "@/assets/kurti-WA0035.jpg.asset.json";
import kurti17 from "@/assets/kurti-WA0017.jpg.asset.json";
import kurti19 from "@/assets/kurti-WA0019.jpg.asset.json";
import kurti14 from "@/assets/kurti-WA0014.jpg.asset.json";

import setBeige from "@/assets/set-beige-tissue.jpg.asset.json";
import setPista from "@/assets/set-pista-green.jpg.asset.json";
import setOlive from "@/assets/set-olive-chikankari.jpg.asset.json";

import trend130 from "@/assets/trend-WA0130.jpg.asset.json";
import trend95 from "@/assets/trend-WA0095.jpg.asset.json";
import trend113 from "@/assets/trend-WA0113.jpg.asset.json";
import trend114 from "@/assets/trend-WA0114.jpg.asset.json";
import trend104 from "@/assets/trend-WA0104.jpg.asset.json";
import trend98 from "@/assets/trend-WA0098.jpg.asset.json";

import heroTunic from "@/assets/hero-purple-tunic.jpg.asset.json";

export const HERO_IMAGE = heroTunic.url;

export type Product = {
  slug: string;
  name: string;
  /** Retail (single-piece) price in ₹ */
  price: number;
  /** Wholesale per-piece price in ₹ at MOQ */
  wholesalePrice: number;
  /** Minimum order quantity for wholesale */
  moq: number;
  mrp: number;
  stock: number;
  category: string;
  group: "Western Wear" | "Indian Wear";
  gender: "Men" | "Women" | "Kids";
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  description: string;
  rating: number;
  reviews: number;
  tags: ("trending" | "bestseller" | "new" | "offer")[];
};

const sizes = ["S", "M", "L", "XL", "XXL"];
const freeSize = ["Free Size"];

export const DEFAULT_MOQ = 50;

export const products: Product[] = [
  /* ------------------------- Dresses ------------------------- */
  {
    slug: "black-floral-ruffle-maxi",
    name: "Black Floral Ruffle Maxi Dress",
    price: 899,
    wholesalePrice: 439,
    moq: DEFAULT_MOQ,
    mrp: 1799,
    stock: 240,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [dressBlackRuffle.url],
    colors: [{ name: "Black", hex: "#181616" }],
    sizes,
    fabric: "Soft georgette with full lining.",
    description:
      "Flowing black georgette maxi with a delicate floral print, ruffled shoulders and a tiered hem — an easy evening piece that packs flat.",
    rating: 4.7,
    reviews: 86,
    tags: ["new", "bestseller"],
  },
  {
    slug: "black-floral-offshoulder-maxi",
    name: "Black Floral Off-Shoulder Maxi",
    price: 949,
    wholesalePrice: 459,
    moq: DEFAULT_MOQ,
    mrp: 1899,
    stock: 210,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [dressBlackOff.url],
    colors: [{ name: "Black", hex: "#171515" }],
    sizes,
    fabric: "Printed georgette, elasticated smocked bodice.",
    description:
      "Off-shoulder maxi in an all-over botanical print with puff sleeves and a smocked bodice that flatters every size.",
    rating: 4.6,
    reviews: 64,
    tags: ["new"],
  },
  {
    slug: "blue-floral-tiered-maxi",
    name: "Blue Floral Tiered Maxi Dress",
    price: 899,
    wholesalePrice: 435,
    moq: DEFAULT_MOQ,
    mrp: 1799,
    stock: 265,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [dressBlueFloral.url],
    colors: [{ name: "Royal Blue", hex: "#2f3fa0" }],
    sizes,
    fabric: "Printed rayon crepe.",
    description:
      "Square-neck tiered maxi in a cool blue floral — frilled straps, generous flare and pockets deep enough to matter.",
    rating: 4.7,
    reviews: 72,
    tags: ["trending"],
  },
  {
    slug: "red-floral-tiered-maxi",
    name: "Red Floral Tiered Maxi Dress",
    price: 899,
    wholesalePrice: 435,
    moq: DEFAULT_MOQ,
    mrp: 1799,
    stock: 190,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [dressRedFloral.url],
    colors: [{ name: "Red", hex: "#b8262c" }],
    sizes,
    fabric: "Printed rayon crepe.",
    description:
      "A festive red floral tiered maxi with smocked back and shoulder frills — a reliable fast mover for bulk buyers.",
    rating: 4.8,
    reviews: 94,
    tags: ["bestseller", "trending"],
  },
  {
    slug: "blue-print-tiered-maxi",
    name: "Blue Abstract Print Maxi Dress",
    price: 949,
    wholesalePrice: 455,
    moq: DEFAULT_MOQ,
    mrp: 1899,
    stock: 175,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [dressBluePrint.url],
    colors: [{ name: "Cobalt", hex: "#1f56c4" }],
    sizes,
    fabric: "Printed viscose with cotton lining.",
    description:
      "Strappy tiered maxi in a bold cobalt brushstroke print — holiday-ready and quick to sell through summer.",
    rating: 4.6,
    reviews: 58,
    tags: ["new"],
  },
  {
    slug: "red-floral-ruffle-midi",
    name: "Red Floral Ruffle Midi Dress",
    price: 799,
    wholesalePrice: 385,
    moq: DEFAULT_MOQ,
    mrp: 1599,
    stock: 150,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [trend95.url],
    colors: [{ name: "Red", hex: "#c02b30" }],
    sizes,
    fabric: "Printed crepe.",
    description: "Ruffled midi in a painterly red floral — a compact silhouette that suits every height.",
    rating: 4.6,
    reviews: 44,
    tags: ["trending"],
  },
  {
    slug: "wine-jacquard-wrap-midi",
    name: "Wine Jacquard Wrap Midi Dress",
    price: 849,
    wholesalePrice: 399,
    moq: DEFAULT_MOQ,
    mrp: 1699,
    stock: 140,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [trend113.url],
    colors: [{ name: "Wine", hex: "#6d1f34" }],
    sizes,
    fabric: "Textured jacquard.",
    description: "Self-textured wrap midi in deep wine — structured enough for occasions, soft enough for all day.",
    rating: 4.7,
    reviews: 39,
    tags: ["trending"],
  },
  {
    slug: "abstract-print-tiered-mini",
    name: "Abstract Print Tiered Mini Dress",
    price: 749,
    wholesalePrice: 365,
    moq: DEFAULT_MOQ,
    mrp: 1499,
    stock: 160,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [trend114.url],
    colors: [{ name: "Multi", hex: "#8a6d5c" }],
    sizes,
    fabric: "Printed poly-crepe.",
    description: "Short tiered dress in a modern abstract print — a strong entry-price mover for boutiques.",
    rating: 4.5,
    reviews: 31,
    tags: ["trending"],
  },
  {
    slug: "mustard-wrap-maxi",
    name: "Mustard Wrap Maxi Dress",
    price: 899,
    wholesalePrice: 425,
    moq: DEFAULT_MOQ,
    mrp: 1799,
    stock: 130,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [trend104.url],
    colors: [{ name: "Mustard", hex: "#c99527" }],
    sizes,
    fabric: "Soft crepe.",
    description: "Full-length wrap maxi in warm mustard with a tie waist that fits a wide size range.",
    rating: 4.6,
    reviews: 36,
    tags: ["trending"],
  },
  {
    slug: "fuchsia-pleated-maxi",
    name: "Fuchsia Pleated Maxi Dress",
    price: 949,
    wholesalePrice: 445,
    moq: DEFAULT_MOQ,
    mrp: 1899,
    stock: 120,
    category: "Dresses",
    group: "Western Wear",
    gender: "Women",
    images: [trend98.url],
    colors: [{ name: "Fuchsia", hex: "#c22b76" }],
    sizes,
    fabric: "Pleated poly-satin.",
    description: "Column-pleated maxi in vivid fuchsia — high-impact on the rack, light in the carton.",
    rating: 4.7,
    reviews: 42,
    tags: ["trending"],
  },

  /* ------------------------- Ethnic Sets ------------------------- */
  {
    slug: "ivory-teal-embroidered-palazzo-set",
    name: "Ivory Teal Embroidered 3Pc Palazzo Set",
    price: 1699,
    wholesalePrice: 819,
    moq: DEFAULT_MOQ,
    mrp: 3299,
    stock: 180,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [ethnicTeal1.url, ethnicTeal2.url, ethnicTeal3.url],
    colors: [{ name: "Ivory Teal", hex: "#ded4c4" }],
    sizes,
    fabric: "Cotton-blend chanderi with teal thread embroidery, organza dupatta.",
    description:
      "Three-piece ivory set with a teal embroidered yoke, block-printed palazzo and matching dupatta — the studio's best-performing ethnic style.",
    rating: 4.9,
    reviews: 132,
    tags: ["bestseller"],
  },
  {
    slug: "ivory-red-embroidered-suit-set",
    name: "Ivory & Red Embroidered Suit Set",
    price: 1799,
    wholesalePrice: 869,
    moq: DEFAULT_MOQ,
    mrp: 3499,
    stock: 165,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [ethnicRed1.url, ethnicRed2.url, ethnicRed3.url, ethnicRed4.url],
    colors: [{ name: "Ivory Red", hex: "#efe6d8" }],
    sizes,
    fabric: "Cotton kurta with resham embroidery, contrast red dupatta and pants.",
    description:
      "Ivory kurta worked in fine red resham with a contrast red dupatta and straight pants — a photograph-ready festive set.",
    rating: 4.8,
    reviews: 118,
    tags: ["bestseller", "new"],
  },
  {
    slug: "rani-pink-embroidered-3pc-set",
    name: "Rani Pink Embroidered 3Pc Set",
    price: 1899,
    wholesalePrice: 899,
    moq: DEFAULT_MOQ,
    mrp: 3699,
    stock: 155,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [ethnicPink1.url, ethnicPink2.url, ethnicPink3.url],
    colors: [{ name: "Rani Pink", hex: "#c01f6a" }],
    sizes,
    fabric: "Viscose silk with zari and thread embroidery, organza dupatta.",
    description:
      "Rani pink kurta with dense floral zari work, tapered pants and a scalloped organza dupatta — wedding-season volume seller.",
    rating: 4.9,
    reviews: 146,
    tags: ["bestseller", "trending"],
  },
  {
    slug: "navy-zari-embroidered-3pc-set",
    name: "Navy Zari Embroidered 3Pc Set",
    price: 1899,
    wholesalePrice: 899,
    moq: DEFAULT_MOQ,
    mrp: 3699,
    stock: 145,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [ethnicNavy1.url, ethnicNavy2.url],
    colors: [{ name: "Navy", hex: "#1e2a5a" }],
    sizes,
    fabric: "Viscose silk with silver zari embroidery, sequinned dupatta.",
    description:
      "Deep navy set with silver zari embroidery and a sequin-flecked dupatta — the darker alternative for evening functions.",
    rating: 4.8,
    reviews: 121,
    tags: ["bestseller"],
  },
  {
    slug: "pink-chikan-print-suit-set",
    name: "Pink Chikankari Print Suit Set",
    price: 1299,
    wholesalePrice: 619,
    moq: DEFAULT_MOQ,
    mrp: 2599,
    stock: 200,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [ethnicChikan1.url, ethnicChikan2.url],
    colors: [{ name: "Blush Pink", hex: "#e2b7c6" }],
    sizes,
    fabric: "Cotton with chikankari-style print, sheer printed dupatta.",
    description:
      "Everyday cotton suit set with a soft chikankari print, mandarin placket and light printed dupatta — an easy daily-wear repeat order.",
    rating: 4.6,
    reviews: 77,
    tags: ["new"],
  },
  {
    slug: "beige-tissue-silk-3pc-set",
    name: "Woman 3Pcs Set — Beige Tissue Silk",
    price: 1599,
    wholesalePrice: 769,
    moq: DEFAULT_MOQ,
    mrp: 3199,
    stock: 135,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [setBeige.url],
    colors: [{ name: "Beige", hex: "#d9c8ac" }],
    sizes,
    fabric: "Tissue silk with sequin detailing.",
    description: "Beige tissue silk three-piece with a soft sheen — understated luxury at a wholesale price.",
    rating: 4.8,
    reviews: 68,
    tags: ["bestseller"],
  },
  {
    slug: "pista-green-embroidered-3pc-set",
    name: "Woman 3Pcs Set — Pista Green Embroidered",
    price: 1599,
    wholesalePrice: 769,
    moq: DEFAULT_MOQ,
    mrp: 3199,
    stock: 130,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [setPista.url],
    colors: [{ name: "Pista Green", hex: "#bfd0a4" }],
    sizes,
    fabric: "Cotton silk with thread embroidery.",
    description: "Pista green embroidered kurta set with dupatta — a fresh, light option for day functions.",
    rating: 4.7,
    reviews: 59,
    tags: ["bestseller"],
  },
  {
    slug: "olive-chikankari-kurta-set",
    name: "Woman 3Pcs Set — Olive Chikankari",
    price: 1499,
    wholesalePrice: 719,
    moq: DEFAULT_MOQ,
    mrp: 2999,
    stock: 125,
    category: "Ethnic Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [setOlive.url],
    colors: [{ name: "Olive", hex: "#7c7f4e" }],
    sizes,
    fabric: "Cotton chikankari with mirror accents.",
    description: "Hand-feel chikankari in olive with mirror accents — quietly premium, easy to restock.",
    rating: 4.8,
    reviews: 64,
    tags: ["bestseller"],
  },

  /* ------------------------- Kurtis ------------------------- */
  {
    slug: "pink-floral-applique-kurti-set",
    name: "Pink Floral Applique Kurti Set",
    price: 649,
    wholesalePrice: 299,
    moq: DEFAULT_MOQ,
    mrp: 1299,
    stock: 320,
    category: "Kurtis",
    group: "Indian Wear",
    gender: "Women",
    images: [kurti35.url],
    colors: [{ name: "Pink", hex: "#e4a3b8" }],
    sizes,
    fabric: "Cotton with applique florals.",
    description: "Pink kurti set with applique flowers — the lowest per-piece cost in the ethnic range.",
    rating: 4.5,
    reviews: 52,
    tags: ["new"],
  },
  {
    slug: "indigo-ajrakh-kurti-set",
    name: "Indigo Ajrakh Print Kurti Set",
    price: 649,
    wholesalePrice: 299,
    moq: DEFAULT_MOQ,
    mrp: 1299,
    stock: 300,
    category: "Kurtis",
    group: "Indian Wear",
    gender: "Women",
    images: [kurti17.url],
    colors: [{ name: "Indigo", hex: "#2f4560" }],
    sizes,
    fabric: "Cotton ajrakh print.",
    description: "Indigo ajrakh print kurti with matching pants — a year-round staple for resellers.",
    rating: 4.6,
    reviews: 48,
    tags: ["new"],
  },
  {
    slug: "mustard-floral-cotton-kurti-set",
    name: "Mustard Floral Cotton Kurti Set",
    price: 649,
    wholesalePrice: 299,
    moq: DEFAULT_MOQ,
    mrp: 1299,
    stock: 290,
    category: "Kurtis",
    group: "Indian Wear",
    gender: "Women",
    images: [kurti19.url],
    colors: [{ name: "Mustard", hex: "#cfa03a" }],
    sizes,
    fabric: "Cotton floral print.",
    description: "Mustard floral cotton kurti set — breathable, colourfast and quick to move at market prices.",
    rating: 4.5,
    reviews: 41,
    tags: ["new"],
  },
  {
    slug: "rani-pink-buti-kurti-set",
    name: "Rani Pink Buti Print Kurti Set",
    price: 649,
    wholesalePrice: 299,
    moq: DEFAULT_MOQ,
    mrp: 1299,
    stock: 280,
    category: "Kurtis",
    group: "Indian Wear",
    gender: "Women",
    images: [kurti14.url],
    colors: [{ name: "Rani Pink", hex: "#c72e78" }],
    sizes,
    fabric: "Cotton buti print.",
    description: "Rani pink buti print kurti set — festive colour at an everyday wholesale rate.",
    rating: 4.6,
    reviews: 45,
    tags: ["new"],
  },
  {
    slug: "bottle-green-chikankari-kurti",
    name: "Bottle Green Chikankari Kurti",
    price: 699,
    wholesalePrice: 329,
    moq: DEFAULT_MOQ,
    mrp: 1399,
    stock: 210,
    category: "Kurtis",
    group: "Indian Wear",
    gender: "Women",
    images: [trend130.url],
    colors: [{ name: "Bottle Green", hex: "#20463a" }],
    sizes,
    fabric: "Cotton chikankari.",
    description: "Deep green chikankari kurti styled with beige pants — a clean, modern ethnic option.",
    rating: 4.7,
    reviews: 38,
    tags: ["trending"],
  },

  /* ------------------------- Co-ord Sets ------------------------- */
  {
    slug: "taupe-knit-coord-set",
    name: "Taupe Knit Tee & Skirt Co-ord",
    price: 1199,
    wholesalePrice: 569,
    moq: DEFAULT_MOQ,
    mrp: 2399,
    stock: 170,
    category: "Co-ord Sets",
    group: "Western Wear",
    gender: "Women",
    images: [coordTaupe.url],
    colors: [{ name: "Taupe", hex: "#8b8271" }],
    sizes,
    fabric: "Ribbed cotton knit.",
    description: "Minimal ribbed knit co-ord in taupe — a travel-friendly set that photographs beautifully.",
    rating: 4.7,
    reviews: 54,
    tags: ["new", "trending"],
  },
  {
    slug: "beige-polo-knit-coord-set",
    name: "Beige Polo Knit Co-ord Set",
    price: 1299,
    wholesalePrice: 619,
    moq: DEFAULT_MOQ,
    mrp: 2599,
    stock: 160,
    category: "Co-ord Sets",
    group: "Western Wear",
    gender: "Women",
    images: [coordPolo.url],
    colors: [{ name: "Beige", hex: "#ded3bb" }],
    sizes,
    fabric: "Fine-gauge knit with collar detail.",
    description: "Collared knit top with wide-leg pants in soft beige — quiet-luxury styling, market-friendly cost.",
    rating: 4.8,
    reviews: 61,
    tags: ["new", "bestseller"],
  },
  {
    slug: "brown-shirt-trouser-coord-set",
    name: "Brown Shirt & Trouser Co-ord Set",
    price: 1349,
    wholesalePrice: 639,
    moq: DEFAULT_MOQ,
    mrp: 2699,
    stock: 155,
    category: "Co-ord Sets",
    group: "Western Wear",
    gender: "Women",
    images: [coordBrown1.url, coordBrown2.url],
    colors: [{ name: "Coffee Brown", hex: "#4e372c" }],
    sizes,
    fabric: "Poly-crepe with soft drape.",
    description: "Relaxed brown shirt with pleated wide trousers — workwear that doubles as evening dressing.",
    rating: 4.7,
    reviews: 49,
    tags: ["trending"],
  },
  {
    slug: "white-peplum-coord-set",
    name: "White Peplum Top & Trouser Co-ord",
    price: 1399,
    wholesalePrice: 659,
    moq: DEFAULT_MOQ,
    mrp: 2799,
    stock: 140,
    category: "Co-ord Sets",
    group: "Western Wear",
    gender: "Women",
    images: [coordPeplum.url],
    colors: [{ name: "White", hex: "#f3f1ec" }],
    sizes,
    fabric: "Structured cotton-blend twill.",
    description: "Sleeveless peplum top with piped trousers in crisp white — a sharp, high-margin occasion set.",
    rating: 4.8,
    reviews: 43,
    tags: ["new"],
  },
  {
    slug: "black-floral-embroidered-coord",
    name: "Black Floral Embroidered Co-ord Set",
    price: 1499,
    wholesalePrice: 709,
    moq: DEFAULT_MOQ,
    mrp: 2999,
    stock: 150,
    category: "Co-ord Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [coordBlackFloral.url],
    colors: [{ name: "Black", hex: "#1a1818" }],
    sizes,
    fabric: "Cotton with floral thread embroidery on hem.",
    description: "Black co-ord with rose embroidery along the hem — indo-western styling with strong shelf appeal.",
    rating: 4.8,
    reviews: 57,
    tags: ["bestseller", "trending"],
  },
  {
    slug: "white-floral-embroidered-coord",
    name: "White Floral Embroidered Co-ord Set",
    price: 1499,
    wholesalePrice: 709,
    moq: DEFAULT_MOQ,
    mrp: 2999,
    stock: 145,
    category: "Co-ord Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [coordWhiteFloral.url],
    colors: [{ name: "Off White", hex: "#f0ece2" }],
    sizes,
    fabric: "Cotton with floral thread embroidery on hem.",
    description: "The ivory colourway of the embroidered co-ord — a dependable pairing when buying the black.",
    rating: 4.8,
    reviews: 52,
    tags: ["bestseller"],
  },
  {
    slug: "dusty-pink-embroidered-coord",
    name: "Dusty Pink Embroidered Co-ord Set",
    price: 1549,
    wholesalePrice: 729,
    moq: DEFAULT_MOQ,
    mrp: 3099,
    stock: 135,
    category: "Co-ord Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [coordPinkFloral.url],
    colors: [{ name: "Dusty Pink", hex: "#c99aa6" }],
    sizes,
    fabric: "Chanderi-blend with rose applique and thread work.",
    description: "Dusty pink flared top and pants with rose applique — the softest seller in the embroidered range.",
    rating: 4.9,
    reviews: 66,
    tags: ["bestseller", "trending"],
  },
  {
    slug: "peach-embroidered-coord-set",
    name: "Peach Embroidered Co-ord Set",
    price: 1549,
    wholesalePrice: 729,
    moq: DEFAULT_MOQ,
    mrp: 3099,
    stock: 130,
    category: "Co-ord Sets",
    group: "Indian Wear",
    gender: "Women",
    images: [coordPeachFloral.url],
    colors: [{ name: "Peach", hex: "#f0b39c" }],
    sizes,
    fabric: "Chanderi-blend with rose applique and thread work.",
    description: "Peach colourway of the rose applique co-ord, finished with a matching dupatta.",
    rating: 4.8,
    reviews: 58,
    tags: ["bestseller"],
  },
  {
    slug: "purple-print-tunic-trouser-set",
    name: "Purple Print Tunic & Trouser Set",
    price: 1199,
    wholesalePrice: 559,
    moq: DEFAULT_MOQ,
    mrp: 2399,
    stock: 175,
    category: "Tops",
    group: "Indian Wear",
    gender: "Women",
    images: [heroTunic.url],
    colors: [{ name: "Purple", hex: "#6f5a9c" }],
    sizes,
    fabric: "Printed cotton tunic with tapered trousers.",
    description:
      "Printed purple tunic paired with teal tapered trousers — the campaign look from the current lookbook.",
    rating: 4.7,
    reviews: 71,
    tags: ["new", "trending"],
  },
];

/** Category tiles — all imagery from the owner's own lookbooks. */
export const categories = [
  { name: "Ethnic Sets", slug: "ethnic-sets", image: ethnicPink1.url },
  { name: "Co-ord Sets", slug: "co-ord-sets", image: coordPinkFloral.url },
  { name: "Dresses", slug: "dresses", image: dressRedFloral.url },
  { name: "Kurtis", slug: "kurtis", image: kurti17.url },
  { name: "Tops", slug: "tops", image: coordPeplum.url },
  { name: "New Arrivals", slug: "new-arrivals", image: coordPolo.url },
];

/** Banner slots the admin can point at any uploaded image. */
export const defaultBanners = {
  hero: heroTunic.url,
  promo: ethnicRed3.url,
};

export const byTag = (tag: Product["tags"][number], list: Product[] = products) =>
  list.filter((p) => p.tags.includes(tag));

export const findProduct = (slug: string, list: Product[] = products) =>
  list.find((p) => p.slug === slug);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const reviewsList = [
  {
    name: "Ananya S.",
    city: "Bengaluru",
    text: "Ordered 60 pieces of the ivory embroidered set. Stitching and fabric matched the samples exactly.",
    rating: 5,
  },
  {
    name: "Riya M.",
    city: "Mumbai",
    text: "Wholesale rates are genuinely competitive and the lot was dispatched within two days.",
    rating: 5,
  },
  {
    name: "Sneha K.",
    city: "Delhi",
    text: "Sizes run true and the colours are exactly as photographed. Repeat buyer for my boutique.",
    rating: 4,
  },
];

/** Sample review copy shown on product pages. */
export const freeSizeOnly = freeSize;
