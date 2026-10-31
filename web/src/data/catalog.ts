export type Category = "tanks" | "bottles" | "pipes" | "ballers";
export type Line = "featured" | "simple" | "standard" | "catalog";
export type Shape = "bottle" | "capsule";

export interface Product {
  id: string;
  name: string;
  category: Category;
  line: Line | null;
  shape: Shape | null;
  liters: number | null;
  price: number | null;
  image: string;
}

export const SITE = {
  name: "Al-Habib Production Group",
  phoneDisplay: "+93 766 662 622",
  phoneWa: "93766662622",
  salesDisplay: "+93 701 745 543",
  salesWa: "93701745543",
  email: "contact@al-habibgroup.com",
  city: "Kabul, Afghanistan",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/share/1WCwbYNwnd/?mibextid=wwXIf" },
    { label: "TikTok", href: "https://www.tiktok.com/@alhabib_com?_r=1&_t=ZS-92reNOKSbp6" },
    { label: "YouTube", href: "https://www.youtube.com/@AlHabib-com" },
    { label: "Instagram", href: "https://www.instagram.com/alhabib_industrial_com?igsh=dWI4bm5vNThqcW44&utm_source=qr" },
    { label: "Telegram", href: "https://t.me/alhabibcompany" },
  ],
} as const;

export const SUMMARIES: Record<Category, string> = {
  tanks:
    "Plastic water tanks made in Afghanistan, engineered for strength and weather resistance, and backed by a 25-year guarantee. The current site describes them as suitable for homes, industries, and commercial use.",
  bottles:
    "Plastic bottles made in Afghanistan for water, shampoo, and industrial liquids. The current site describes them as durable and eco-friendly, and says they meet certified quality standards.",
  pipes:
    "PPRC pipes from Al-Habib Production Group. The live catalogue lists each one as “PPRC PIPE” and publishes a price, without a diameter or length in the title.",
  ballers:
    "Plastic ballers made in Afghanistan. The current site lists them for water storage, shampoo, and industrial liquids.",
};

export const LINE_LABEL: Record<Line, string> = {
  featured: "Featured",
  simple: "Simple",
  standard: "Standard",
  catalog: "General",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  tanks: "Water tank",
  bottles: "Bottle",
  pipes: "PPRC pipe",
  ballers: "Baller",
};

/** Prices are AFN, copied from al-habibgroup.com schema.org offers on 31 Oct 2026. Null means the listing had no price. */
export const CATALOG: Product[] = [
  { id: "feat-500-bottle", name: "500-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 500, price: null, image: "/img/products/thumb_1767440780_6986.jpg" },
  { id: "feat-500-capsule", name: "500-Liter Capsule Tank", category: "tanks", line: "featured", shape: "capsule", liters: 500, price: null, image: "/img/products/thumb_1767440707_6022.jpg" },
  { id: "feat-800-bottle", name: "800-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 800, price: 3800, image: "/img/products/thumb_1767440632_8835.jpg" },
  { id: "feat-1000-bottle", name: "1000-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 1000, price: 4800, image: "/img/products/thumb_1767440561_5549.jpg" },
  { id: "feat-1000-capsule", name: "1000-Liter Capsule Tank", category: "tanks", line: "featured", shape: "capsule", liters: 1000, price: null, image: "/img/products/thumb_1767440454_7202.jpg" },
  { id: "feat-1500-bottle", name: "1500-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 1500, price: null, image: "/img/products/thumb_1767440381_2431.jpg" },
  { id: "feat-1500-capsule", name: "1500-Liter Capsule Tank", category: "tanks", line: "featured", shape: "capsule", liters: 1500, price: null, image: "/img/products/thumb_1767440120_8074.jpg" },
  { id: "feat-2000-bottle", name: "2000-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 2000, price: null, image: "/img/products/thumb_1767439943_1147.jpg" },
  { id: "feat-200-bottle", name: "200-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 200, price: null, image: "/img/products/thumb_1767441861_6728.jpg" },
  { id: "feat-300-bottle", name: "300-Liter Bottle Tank", category: "tanks", line: "featured", shape: "bottle", liters: 300, price: null, image: "/img/products/thumb_1767442388_5967.jpg" },

  { id: "simple-200", name: "200L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 200, price: 840, image: "/img/products/thumb_1769423486_7860.jpg" },
  { id: "simple-300", name: "300L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 300, price: 980, image: "/img/products/thumb_1769423709_1670.jpg" },
  { id: "simple-400", name: "400L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 400, price: 1260, image: "/img/products/thumb_1769423894_6356.jpg" },
  { id: "simple-500", name: "500L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 500, price: 1540, image: "/img/products/thumb_1769424096_4316.jpg" },
  { id: "simple-600", name: "600L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 600, price: 1680, image: "/img/products/thumb_1769424410_5786.jpg" },
  { id: "simple-800", name: "800L Bottle", category: "tanks", line: "simple", shape: "bottle", liters: 800, price: 1960, image: "/img/products/thumb_1769424578_8981.jpg" },

  { id: "standard-200", name: "200-Liter Bottle Tank", category: "tanks", line: "standard", shape: "bottle", liters: 200, price: null, image: "/img/products/thumb_1768045891_8566.jpg" },

  { id: "cat-500", name: "500-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 500, price: 1680, image: "/img/products/thumb_1765780754_6415.jpg" },
  { id: "cat-600-a", name: "600-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 600, price: 1680, image: "/img/products/thumb_1765780906_9486.jpg" },
  { id: "cat-600-b", name: "600-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 600, price: 1820, image: "/img/products/thumb_1765780980_5127.jpg" },
  { id: "cat-1500", name: "1500-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 1500, price: 4900, image: "/img/products/thumb_1765781056_1421.jpg" },
  { id: "cat-1600", name: "1600-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 1600, price: 3220, image: "/img/products/thumb_1765781141_6358.jpg" },
  { id: "cat-2000", name: "2000-Liter Tank", category: "tanks", line: "catalog", shape: null, liters: 2000, price: 6300, image: "/img/products/thumb_1765781215_7232.jpg" },

  { id: "bottle-60", name: "60ml Bottle", category: "bottles", line: null, shape: null, liters: null, price: 1.9, image: "/img/products/thumb_1765784168_2058.jpg" },
  { id: "bottle-500", name: "500ml Bottle", category: "bottles", line: null, shape: null, liters: null, price: 2.2, image: "/img/products/thumb_1765784304_5097.jpg" },
  { id: "bottle-700", name: "700ml Bottle", category: "bottles", line: null, shape: null, liters: null, price: 3.4, image: "/img/products/thumb_1765784389_6631.jpg" },
  { id: "bottle-1500", name: "1.5 Liter Bottle", category: "bottles", line: null, shape: null, liters: null, price: 3.4, image: "/img/products/thumb_1765784562_4752.jpg" },
  { id: "bottle-5a", name: "5 Liter Bottle", category: "bottles", line: null, shape: null, liters: null, price: 33, image: "/img/products/thumb_1765784648_7106.jpg" },
  { id: "bottle-5b", name: "5 Liter Bottle", category: "bottles", line: null, shape: null, liters: null, price: 33, image: "/img/products/thumb_1765784710_4534.jpg" },

  { id: "pipe-224", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 224, image: "/img/products/thumb_1767615787_8082.jpg" },
  { id: "pipe-196", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 196, image: "/img/products/thumb_1767616028_7184.jpg" },
  { id: "pipe-168", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 168, image: "/img/products/thumb_1767616175_2002.jpg" },
  { id: "pipe-112", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 112, image: "/img/products/thumb_1767616475_8714.jpg" },
  { id: "pipe-126", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 126, image: "/img/products/thumb_1767616762_9824.jpg" },
  { id: "pipe-140", name: "PPRC Pipe", category: "pipes", line: null, shape: null, liters: null, price: 140, image: "/img/products/thumb_1767617546_2574.jpg" },

  { id: "baller-220", name: "220-liter baller", category: "ballers", line: null, shape: null, liters: 220, price: 1000, image: "/img/products/thumb_1767507788_6152.jpg" },
];

export const GALLERY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14].map((n) => ({
  src: `/img/gallery/img${n}.webp`,
  alt: `Al-Habib Plastic Production Gallery Image ${n}`,
}));

export function formatPrice(value: number | null, locale: "en" | "fa" | "ps", ask: string, currency: string): string {
  if (value == null) return ask;
  const digits = Number.isInteger(value) ? 0 : 2;
  const tag = locale === "fa" ? "fa-AF" : locale === "ps" ? "ps-AF" : "en-US";
  const amount = value.toLocaleString(tag, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return locale === "en" ? `${currency} ${amount}` : `${amount} ${currency}`;
}

export function productKicker(product: Product): string {
  const bits = [CATEGORY_LABEL[product.category]];
  if (product.line) bits.push(LINE_LABEL[product.line]);
  if (product.shape) bits.push(product.shape);
  return bits.join(" · ");
}

export function findProduct(id: string | undefined): Product | undefined {
  return CATALOG.find((item) => item.id === id);
}
