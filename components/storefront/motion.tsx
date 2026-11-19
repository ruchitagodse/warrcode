"use client";

import { useEffect, useRef } from "react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/catalog";

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Content is visible by default (including without JS). Only observed elements
// receive a pending state, and keyboard focus always reveals them immediately.
function observeReveals(elements: HTMLElement[]) {
  if (reducedMotion() || !("IntersectionObserver" in window)) return () => {};
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).dataset.revealState = "visible";
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
  elements.forEach(element => {
    element.dataset.revealState = "pending";
    observer.observe(element);
  });
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealAll = () => {
    if (!preference.matches) return;
    elements.forEach(element => { element.dataset.revealState = "visible"; });
    observer.disconnect();
  };
  preference.addEventListener("change", revealAll);
  return () => {
    observer.disconnect();
    preference.removeEventListener("change", revealAll);
    elements.forEach(element => { delete element.dataset.revealState; });
  };
}

export function MotionEffects() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-heading, .category-card, .winter-photo, .winter-copy, .story-copy, .story-photo, .social-grid > button, .contact-strip"
    ));
    targets.forEach(element => {
      element.dataset.reveal = element.matches(".category-card, .winter-photo, .story-photo, .social-grid > button") ? "image" : "up";
      const siblings = element.parentElement?.querySelectorAll(".category-card, .social-grid > button");
      const index = siblings ? Array.from(siblings).indexOf(element) : 0;
      element.style.setProperty("--reveal-delay", `${Math.max(0, index) * 65}ms`);
    });
    const stopReveals = observeReveals(targets);
    const header = document.querySelector<HTMLElement>(".header");
    const announcement = document.querySelector(".announcement");
    const headerObserver = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      if (header) header.dataset.scrolled = String(!entry.isIntersecting);
    }) : null;
    if (announcement) headerObserver?.observe(announcement);

    // A single scheduled frame, one geometry read, transform-only writes.
    // Touch devices and reduced-motion users receive the static composition.
    const winter = document.querySelector<HTMLElement>(".winter-feature");
    const image = winter?.querySelector<HTMLElement>(".winter-photo img");
    const desktop = window.matchMedia("(min-width: 851px) and (pointer: fine)");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!winter || !image || !inView || !desktop.matches || preference.matches) return;
      const rect = winter.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
      image.style.setProperty("--parallax-y", `${(progress * -14).toFixed(2)}px`);
    };
    const schedule = () => {
      if (inView && desktop.matches && !preference.matches && !frame) frame = window.requestAnimationFrame(update);
    };
    const reset = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (image) image.style.removeProperty("--parallax-y");
      if (winter) winter.dataset.parallax = String(inView && desktop.matches && !preference.matches);
      schedule();
    };
    const winterObserver = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      reset();
    }) : null;
    if (winter) winterObserver?.observe(winter);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    desktop.addEventListener("change", reset);
    preference.addEventListener("change", reset);
    return () => {
      stopReveals();
      headerObserver?.disconnect();
      winterObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", reset);
      preference.removeEventListener("change", reset);
      if (frame) window.cancelAnimationFrame(frame);
      image?.style.removeProperty("--parallax-y");
    };
  }, []);
  return null;
}

export function ProductGrid({ products, open, layout = "four" }: { products: Product[]; open: (product: Product) => void; layout?: "three" | "four" }) {
  const ref = useRef<HTMLDivElement>(null);
  const signature = products.map(product => product.id).join("|");
  useEffect(() => {
    const cards = Array.from(ref.current?.querySelectorAll<HTMLElement>(".product-card") ?? []);
    cards.forEach((card, index) => {
      card.dataset.reveal = "up";
      card.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });
    return observeReveals(cards);
  }, [signature]);
  return <div ref={ref} className={`product-grid${layout === "three" ? " three" : ""}`}>
    {products.map(product => <ProductCard key={product.id} product={product} open={open} layout={layout}/>)}
  </div>;
}

// Remove from React state immediately. A non-interactive visual copy supplies
// the exit animation, so checkout/counts never wait for an animation timer.
export function removeWithMotion(element: HTMLElement | null, remove: () => void) {
  const layer = element?.closest("dialog")?.querySelector<HTMLElement>(".motion-exit-layer");
  if (!element || !layer || reducedMotion() || !element.animate) { remove(); return; }
  const rect = element.getBoundingClientRect();
  const origin = layer.getBoundingClientRect();
  const siblings = Array.from(element.parentElement?.querySelectorAll<HTMLElement>(".bag-item") ?? [])
    .filter(sibling => sibling !== element).map(sibling => ({ element: sibling, top: sibling.getBoundingClientRect().top }));
  const ghost = element.cloneNode(true) as HTMLElement;
  ghost.inert = true;
  ghost.setAttribute("aria-hidden", "true");
  ghost.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
  Object.assign(ghost.style, { position: "absolute", top: `${rect.top - origin.top}px`, left: `${rect.left - origin.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, margin: "0", animation: "none" });
  layer.append(ghost);
  const exit = ghost.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: "translateX(12px)" }], { duration: 180, easing: "ease-out", fill: "forwards" });
  exit.finished.then(() => ghost.remove(), () => ghost.remove());
  remove();
  window.requestAnimationFrame(() => {
    if (reducedMotion()) return;
    siblings.filter(sibling => sibling.element.isConnected).forEach(sibling => {
      const offset = sibling.top - sibling.element.getBoundingClientRect().top;
      if (Math.abs(offset) > 1) sibling.element.animate([{ transform: `translateY(${offset}px)` }, { transform: "translateY(0)" }], { duration: 240, easing: "cubic-bezier(.22,1,.36,1)" });
    });
  });
}
