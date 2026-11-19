import Image from "next/image";
import { money, type Product } from "@/lib/catalog";
import { Icon } from "./icon";
export function ProductCard({ product, open }: { product: Product; open: (product: Product) => void }) {
  return <article className="product-card"><div className="product-photo"><button className="product-image-button" onClick={() => open(product)} aria-label={`View ${product.name}`}><Image src={product.image} alt={`${product.name} — ${product.color}`} fill sizes="(max-width: 600px) 48vw, (max-width: 1000px) 45vw, 24vw"/></button>{product.tag && <span className="product-tag">{product.tag}</span>}<button className="quick-add" onClick={() => open(product)} aria-label={`Choose size and add ${product.name} to bag`}><Icon name="plus"/></button><button className="quick-view" onClick={() => open(product)}>QUICK VIEW / ADD TO BAG</button></div><div className="product-meta"><h3><button onClick={() => open(product)}>{product.name}</button></h3><span>{money(product.price)} <small>CAD</small></span></div><div className="product-sub"><span>{product.color}</span><span className="swatch" style={{ backgroundColor: product.swatch }} aria-label={product.color}/></div></article>;
}
