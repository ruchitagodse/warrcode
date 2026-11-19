export const assets = {
  logo: "/images/warrcode-logo.webp", tee: "/images/code-tee.webp", coat: "/images/toronto-coat.webp",
  statement: "/images/statement-coat.webp", coord: "/images/espresso-coord.webp", sweatshirts: "/images/everyday-sweatshirts.webp",
  winter: "/images/winter-campaign.webp", brand: "/images/toronto-brand.webp",
  men: "/images/men-burgundy-campaign.webp", women: "/images/women-checker-campaign.webp",
  burgundy: "/images/burgundy-long-sleeve.webp", checkerNavy: "/images/checker-navy-ochre.webp",
  checkerCharcoal: "/images/checker-charcoal.webp", checkerPlum: "/images/checker-plum.webp",
  rust: "/images/rust-crew.webp", cream: "/images/cream-crew.webp", trousers: "/images/espresso-trousers.webp",
};
// Only verified client contact details belong here. Empty values use local previews.
export const brand = { whatsappNumber: "", instagramUrl: "" };
export const demoShippingThreshold = 150;
export type Category = "All" | "Men" | "Women" | "Winter";
export type Product = {
  id: string; name: string; type: string; price: number; image: string; alt: string;
  categories: Category[]; color: string; swatch: string; tag?: string; description: string;
  edit?: "arrival" | "bestseller"; colors?: { name: string; hex: string; image: string; alt: string }[];
};
const crewColors = [
  { name: "Rust", hex: "#b45a29", image: assets.rust, alt: "Rust WARRCODE crewneck sweatshirt on a hanger" },
  { name: "Cream", hex: "#ded4b8", image: assets.cream, alt: "Cream WARRCODE crewneck sweatshirt on a hanger" },
];
// All names, prices, sizes and categories below are demo merchandising, not a verified stock list.
// Checker tees and crewnecks are separate photographed colourways, not different garment designs.
export const products: Product[] = [
  { id: "burgundy-long-sleeve", name: "The Burgundy Long-Sleeve", type: "THE NEW ROTATION", price: 68, image: assets.burgundy, alt: "Male model in a burgundy WARRCODE long-sleeve top and dark trousers", categories: ["Men", "Winter"], color: "Burgundy", swatch: "#712c31", tag: "NEW", edit: "arrival", description: "A long-sleeve silhouette in burgundy, as shown in the supplied men's campaign. Demo styling and price; composition and fit are unconfirmed." },
  { id: "checker-navy", name: "The Checker Tee — Navy", type: "THE CHECKER EDIT", price: 54, image: assets.checkerNavy, alt: "Woman wearing a navy and ochre checkerboard WARRCODE tee", categories: ["Women"], color: "Navy / ochre", swatch: "#354354", tag: "NEW COLOURWAY", edit: "arrival", description: "Navy and ochre checks from the supplied Toronto campaign. A photographed colourway in the demo checker edit; materials and measurements await confirmation." },
  { id: "checker-charcoal", name: "The Checker Tee — Charcoal", type: "THE CHECKER EDIT", price: 54, image: assets.checkerCharcoal, alt: "Woman wearing a charcoal and black checkerboard WARRCODE tee", categories: ["Women"], color: "Charcoal / black", swatch: "#393b3b", tag: "NEW COLOURWAY", edit: "arrival", description: "The charcoal and black checkerboard colourway pictured in the supplied group campaign. Sample name and pricing; the final product specification is pending." },
  { id: "checker-plum", name: "The Checker Tee — Plum", type: "THE CHECKER EDIT", price: 54, image: assets.checkerPlum, alt: "Woman wearing a plum and orange checkerboard WARRCODE tee", categories: ["Women"], color: "Plum / orange", swatch: "#652f5a", tag: "NEW COLOURWAY", edit: "arrival", description: "Plum and orange checks, shown on the right of the supplied women's campaign. This is a demo colourway listing with unconfirmed sizing and composition." },
  { id: "code-tee", name: "The Code Oversized Tee", type: "EVERYDAY UNIFORM", price: 48, image: assets.tee, alt: "Woman styling a tobacco WARRCODE oversized tee with cream cargo trousers", categories: ["Women"], color: "Tobacco", swatch: "#97633e", tag: "DEMO FAVOURITE", edit: "bestseller", description: "The tobacco tee from the supplied streetwear portrait. Sample merchandising only; the oversized styling is visible in the photograph, and exact fit is unconfirmed." },
  { id: "city-coord", name: "The Off-Duty Co-ord", type: "TWO PIECES. ONE CODE.", price: 128, image: assets.coord, alt: "Woman wearing an espresso high-neck top and matching relaxed trousers", categories: ["Women", "Winter"], color: "Espresso", swatch: "#35271f", tag: "DEMO FAVOURITE", edit: "bestseller", description: "A matching espresso outfit with contrast side stripes, as photographed. Set contents, materials and measurements require brand confirmation." },
  { id: "toronto-coat", name: "The Toronto Wrap Coat", type: "THE WINTER EDIT", price: 189, image: assets.coat, alt: "Woman in a dark chocolate belted WARRCODE coat at Toronto City Hall", categories: ["Women", "Winter"], color: "Dark chocolate", swatch: "#392f2a", tag: "DEMO FAVOURITE", edit: "bestseller", description: "The longline belted coat pictured in Toronto. The demo price and name are illustrative; no warmth rating or material claim is made." },
  { id: "rust-crew", name: "The Everyday Crew — Rust", type: "THE CREW COLOURWAYS", price: 78, image: assets.rust, alt: crewColors[0].alt, categories: ["Men", "Women", "Winter"], color: "Rust", swatch: "#b45a29", colors: crewColors, description: "The rust crewneck photographed on the campaign rail. This demo colourway shares a garment design with the cream crew; final sizing and materials are pending." },
  { id: "cream-crew", name: "The Everyday Crew — Cream", type: "THE CREW COLOURWAYS", price: 78, image: assets.cream, alt: crewColors[1].alt, categories: ["Men", "Women", "Winter"], color: "Cream", swatch: "#ded4b8", colors: crewColors, description: "The cream crewneck from the supplied rail campaign. A separate photographed colourway, with sample pricing and no confirmed composition or fit measurements." },
  { id: "statement-coat", name: "The Statement Overcoat", type: "MADE TO STAND APART", price: 198, image: assets.statement, alt: "Woman wearing a chartreuse WARRCODE overcoat on a city pavement", categories: ["Women", "Winter"], color: "Chartreuse", swatch: "#a0a427", description: "The chartreuse longline coat shown in the supplied street portrait. Exact composition, availability and garment measurements are awaiting confirmation." },
  { id: "espresso-trousers", name: "The Off-Duty Trouser", type: "THE CO-ORD SEPARATES", price: 64, image: assets.trousers, alt: "Espresso relaxed trousers with a cream side stripe, cropped from the supplied co-ord photograph", categories: ["Women", "Winter"], color: "Espresso", swatch: "#35271f", description: "The trousers visible in the supplied espresso outfit. This separate listing is a demo concept; separate purchase availability has not been confirmed by WARRCODE." },
];
export const newArrivals = products.filter(p => p.edit === "arrival");
export const bestSellers = products.filter(p => p.edit === "bestseller");
export const sizes = ["XS", "S", "M", "L", "XL"];
export const money = (amount: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(amount);
export type BagItem = { productId: string; size: string; color: string; quantity: number };
export function bagProduct(item: BagItem) { const product = products.find(p => p.id === item.productId)!; const variant = product.colors?.find(c => c.name === item.color); return { ...product, image: variant?.image ?? product.image, alt: variant?.alt ?? product.alt }; }
export function orderMessage(items: BagItem[]) {
  return "Hello WARRCODE! I'd like to enquire about these items (demo prices):\n" + items.map(item => { const p = bagProduct(item); return `${p.name} — ${item.color}, ${item.size} × ${item.quantity} — ${money(p.price * item.quantity)} CAD`; }).join("\n") + "\nPlease confirm availability, final pricing and delivery details.";
}
