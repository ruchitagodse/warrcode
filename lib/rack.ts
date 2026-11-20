import { products, type Product } from "./catalog";

type RackAsset = {
  productId: string;
  image: string;
  alt: string;
  hanger?: "clip";
};

export type RackItem = RackAsset & { product: Product };

// Photo-derived presentation cutouts. Quick view retains the original supplied
// photography and the same catalogue IDs, prices, sizes and order flow.
const rackAssets: RackAsset[] = [
  { productId: "cream-crew", image: "/images/rack/cream-crew.webp", alt: "Cream WARRCODE crewneck cutout derived from the supplied hanger photograph" },
  { productId: "rust-crew", image: "/images/rack/rust-crew-cutout.webp", alt: "Rust WARRCODE crewneck cutout derived from the supplied hanger campaign" },
  { productId: "burgundy-long-sleeve", image: "/images/rack/burgundy-long-sleeve.webp", alt: "Burgundy WARRCODE long-sleeve display cutout derived from the supplied campaign" },
  { productId: "code-tee", image: "/images/rack/tobacco-tee.webp", alt: "Tobacco WARRCODE tee cutout derived from the supplied streetwear photograph" },
  { productId: "statement-coat", image: "/images/rack/statement-coat.webp", alt: "Chartreuse WARRCODE overcoat display cutout derived from the supplied street portrait" },
  { productId: "espresso-trousers", image: "/images/rack/espresso-trousers.webp", alt: "Espresso contrast-stripe trousers display cutout derived from the supplied co-ord photograph", hanger: "clip" },
];

export const rackItems: RackItem[] = rackAssets.map(item => ({
  ...item,
  product: products.find(product => product.id === item.productId)!,
}));

export function rackIndex(position: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.round(position)));
}

// A straight rail: neighbouring garments stay in order rather than orbiting.
// Overview gives every piece equal weight; selection brings one piece forward.
export function rackPose(index: number, position: number, count: number, expanded: boolean = false) {
  const offset = index - Math.max(0, Math.min(count - 1, position));
  const focus = expanded ? Math.max(0, 1 - Math.abs(offset)) : 0;
  return {
    x: Number(offset.toFixed(5)),
    depth: expanded ? Number((-35 * (1 - focus)).toFixed(2)) : 0,
    y: Number(Math.min(30, offset * offset * 3.3).toFixed(2)),
    turn: Number(Math.max(-7, Math.min(7, offset * 2)).toFixed(2)),
    scale: Number((0.52 + 0.48 * focus).toFixed(4)),
    opacity: expanded ? Number((0.85 + 0.15 * focus).toFixed(4)) : 1,
    order: expanded ? Math.round(focus * 10) + 2 : count - index,
  };
}
