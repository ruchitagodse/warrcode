import { products } from "./catalog";

// Photo-derived presentation cutouts. Quick view retains the original supplied
// photography and the same catalogue IDs, prices, sizes and order flow.
export const rackItems = [
  { productId: "cream-crew", image: "/images/rack/cream-crew.webp", alt: "Cream WARRCODE crewneck cutout derived from the supplied hanger photograph" },
  { productId: "rust-crew", image: "/images/rack/rust-crew-cutout.webp", alt: "Rust WARRCODE crewneck cutout derived from the supplied hanger campaign" },
  { productId: "code-tee", image: "/images/rack/tobacco-tee.webp", alt: "Tobacco WARRCODE tee cutout derived from the supplied streetwear photograph" },
].map(item => ({ ...item, product: products.find(product => product.id === item.productId)! }));

export function rackIndex(position: number, count: number) {
  return ((Math.round(position) % count) + count) % count;
}

export function rackPose(index: number, position: number, count: number) {
  const angle = (index - position) * Math.PI * 2 / count;
  const focus = (Math.cos(angle) + 1) / 2;
  return {
    x: Number(Math.sin(angle).toFixed(5)),
    depth: Number((-100 * (1 - focus)).toFixed(2)),
    y: Number((20 * (1 - focus)).toFixed(2)),
    turn: Number((-12 * Math.sin(angle)).toFixed(2)),
    scale: Number((0.84 + 0.16 * focus).toFixed(4)),
    opacity: Number((0.84 + 0.16 * focus).toFixed(4)),
    order: Math.round(focus * 10) + 1,
  };
}
