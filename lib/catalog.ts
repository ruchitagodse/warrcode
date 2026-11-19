export const assets = { logo: "/images/warrcode-logo.webp", tee: "/images/code-tee.webp", coat: "/images/toronto-coat.webp", statement: "/images/statement-coat.webp", coord: "/images/espresso-coord.webp", sweatshirts: "/images/everyday-sweatshirts.webp", winter: "/images/winter-campaign.webp", brand: "/images/toronto-brand.webp" };
// Set verified client contact details here. Never route orders to an invented number.
export const brand = { whatsappNumber: "", instagramUrl: "" };
export type Category = "All" | "Men" | "Women" | "Winter";
export type Product = { id: string; name: string; type: string; price: number; image: string; categories: Category[]; color: string; swatch: string; tag?: string; description: string };
export const products: Product[] = [
  { id: "code-tee", name: "The Code Oversized Tee", type: "EVERYDAY UNIFORM", price: 48, image: assets.tee, categories: ["Men", "Women"], color: "Tobacco", swatch: "#97633e", tag: "NEW", description: "An easy silhouette with a quiet signature. The oversized tee for days you make your own." },
  { id: "city-coord", name: "The Off-Duty Co-ord", type: "TWO PIECES. ONE CODE.", price: 128, image: assets.coord, categories: ["Women", "Winter"], color: "Espresso", swatch: "#35271f", tag: "THE COMPLETE SET", description: "A coordinated high-neck top and relaxed trouser. Effortless together, individual apart." },
  { id: "toronto-coat", name: "The Toronto Wrap Coat", type: "COLD DAYS. STRONG PRESENCE.", price: 189, image: assets.coat, categories: ["Women", "Winter"], color: "Dark chocolate", swatch: "#392f2a", tag: "WINTER EDIT", description: "A longline, belted silhouette with an understated monogram. A statement for the city." },
  { id: "everyday-crew", name: "The Everyday Crew", type: "YOUR DAILY ROTATION", price: 78, image: assets.sweatshirts, categories: ["Men", "Women", "Winter"], color: "Rust / cream campaign", swatch: "#b45a29", tag: "ESSENTIAL", description: "The relaxed crewneck, styled in our rust and cream campaign. Choose your size to explore the demo." },
  { id: "statement-coat", name: "The Statement Overcoat", type: "MADE TO STAND APART", price: 198, image: assets.statement, categories: ["Women", "Winter"], color: "Chartreuse", swatch: "#a0a427", description: "A bold colour. A clean silhouette. An outer layer that brings its own energy to every street." },
];
export const sizes = ["XS", "S", "M", "L", "XL"];
export const money = (amount: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(amount);
export type BagItem = { productId: string; size: string; color: string; quantity: number };
export function orderMessage(items: BagItem[]) {
  return "Hello WARRCODE! I'd like to enquire about these items (demo prices):\n" + items.map(item => { const p = products.find(p => p.id === item.productId)!; return `${p.name} — ${item.color}, ${item.size} × ${item.quantity} — ${money(p.price * item.quantity)} CAD`; }).join("\n") + "\nPlease confirm availability, final pricing and delivery details.";
}
