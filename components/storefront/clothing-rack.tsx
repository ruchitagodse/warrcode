"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { money, type Product } from "@/lib/catalog";
import { rackIndex, rackItems, rackPose } from "@/lib/rack";
import { reducedMotion } from "./motion";

type Drag = { id: number; startX: number; startY: number; base: number; lastX: number; lastTime: number; velocity: number; moved: boolean; step: number };

function RackArrow({ previous = false }: { previous?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d={previous ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"}/></svg>;
}

function Hanger({ clip = false }: { clip?: boolean }) {
  if (clip) return <svg className="rack-hanger" aria-hidden="true" viewBox="0 0 200 106" fill="none"><path className="rack-hook" d="M100 66V28c0-5 15-6 15-15a12 12 0 0 0-23-4"/><path className="rack-wood" d="M25 72h150"/><path className="rack-hook" d="M39 72v18h13V72m96 0v18h13V72"/></svg>;
  return <svg className="rack-hanger" aria-hidden="true" viewBox="0 0 200 106" fill="none"><path className="rack-hook" d="M100 39V28c0-5 15-6 15-15a12 12 0 0 0-23-4"/><path className="rack-wood" d="M100 39 15 79q-9 8 3 10h164q12-2 3-10L100 39Z"/><path className="rack-crossbar" d="M18 89h164"/></svg>;
}

export function ClothingRack({ open }: { open: (product: Product) => void }) {
  const overviewPosition = (rackItems.length - 1) / 2;
  const [position, setPosition] = useState(overviewPosition);
  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const current = useRef(overviewPosition);
  const frame = useRef(0);
  const suppressClick = useRef(false);
  const swings = useRef<Animation[]>([]);
  const active = rackIndex(position, rackItems.length);
  const featured = rackItems[active].product;

  useEffect(() => () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    swings.current.forEach(animation => animation.cancel());
  }, []);

  function settle(velocity: number) {
    swings.current.forEach(animation => animation.cancel());
    swings.current = [];
    if (reducedMotion()) return;
    const angle = Math.max(-3.5, Math.min(3.5, velocity * 3));
    if (Math.abs(angle) < .15) return;
    stage.current?.querySelectorAll<HTMLElement>(".rack-swing").forEach((element, index) => {
      if (!element.animate) return;
      const amplitude = angle * (1 - index * .1);
      swings.current.push(element.animate([
        { transform: `rotate(${amplitude}deg)` },
        { transform: `rotate(${-amplitude * .5}deg)`, offset: .4 },
        { transform: `rotate(${amplitude * .18}deg)`, offset: .73 },
        { transform: "rotate(0deg)" },
      ], { duration: 850, easing: "ease-out" }));
    });
  }

  function navigate(direction: number) {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    current.current = rackIndex(Math.round(current.current) + direction, rackItems.length);
    setExpanded(true);
    setPosition(current.current);
    settle(direction * .6);
  }

  function start(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    suppressClick.current = false;
    drag.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, base: current.current, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, moved: false, step: event.currentTarget.clientWidth < 650 ? (expanded ? 165 : 86) : (expanded ? 240 : Math.min(190, event.currentTarget.clientWidth / 7)) };
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (!gesture.moved) {
      // Leave vertical touch scrolling entirely to the browser.
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { drag.current = null; return; }
      if (Math.abs(dx) < 7) return;
      gesture.moved = true;
      swings.current.forEach(animation => animation.cancel());
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const now = event.timeStamp;
    gesture.velocity = gesture.velocity * .5 + ((event.clientX - gesture.lastX) / Math.max(8, now - gesture.lastTime)) * .5;
    gesture.lastX = event.clientX;
    gesture.lastTime = now;
    current.current = Math.max(0, Math.min(rackItems.length - 1, gesture.base - dx / gesture.step));
    if (!frame.current) frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      setPosition(current.current);
    });
    event.preventDefault();
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!gesture.moved) return;
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    suppressClick.current = true;
    const velocity = event.timeStamp - gesture.lastTime > 100 ? 0 : gesture.velocity;
    const momentum = cancelled ? 0 : Math.max(-.4, Math.min(.4, velocity * 90 / gesture.step));
    current.current = rackIndex(current.current - momentum, rackItems.length);
    setPosition(current.current);
    setDragging(false);
    settle(velocity);
  }

  function select(index: number) {
    if (expanded && active === index) { open(rackItems[index].product); return; }
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    current.current = index;
    setExpanded(true);
    setPosition(index);
    settle(.35);
  }

  function showOverview() {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    swings.current.forEach(animation => animation.cancel());
    current.current = overviewPosition;
    setPosition(overviewPosition);
    setExpanded(false);
  }

  return <section className="clothing-rack" aria-labelledby="rack-title">
    <div className="rack-heading"><div><p className="eyebrow">THE INTERACTIVE EDIT</p><h2 id="rack-title">Shop the rack.</h2></div><p>A little movement.<br/>A piece of your identity.</p></div>
    <div className="rack-stage" data-expanded={expanded} ref={stage} role="region" aria-roledescription="carousel" aria-label="WARRCODE clothing rack. Select a garment to bring it forward. Use left and right arrow keys to browse." tabIndex={0} data-dragging={dragging} onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }} onKeyDown={event => { suppressClick.current = false; if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); navigate(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <svg className="rack-rail" aria-hidden="true" viewBox="0 0 1000 70" preserveAspectRatio="none"><path className="rack-rail-shadow" d="M-20 46 Q500-13 1020 46"/><path d="M-20 42 Q500-17 1020 42"/></svg>
      <div className="rack-floor" aria-hidden="true"/>
      {rackItems.map((item, index) => {
        const pose = rackPose(index, position, rackItems.length, expanded);
        return <button type="button" className="rack-piece" key={item.productId} tabIndex={index === active ? 0 : -1} aria-label={expanded && index === active ? `View ${item.product.name} details` : `Select ${item.product.name} on the rack`} aria-pressed={expanded && index === active} data-active={expanded && index === active} onClick={() => select(index)} onDragStart={event => event.preventDefault()} style={{ "--rack-x": pose.x, "--rack-y": `${pose.y}px`, "--rack-depth": `${pose.depth}px`, "--rack-turn": `${pose.turn}deg`, "--rack-scale": pose.scale, opacity: pose.opacity, zIndex: pose.order } as CSSProperties}>
          <span className="rack-swing"><Hanger clip={item.hanger === "clip"}/><span className="rack-garment"><Image src={item.image} alt={item.alt} fill sizes={expanded && index === active ? "(max-width: 600px) 230px, 310px" : "(max-width: 600px) 120px, 165px"} draggable={false}/></span><span className="rack-tag" aria-hidden="true"><span>{money(item.product.price)}</span><small>CAD · DEMO</small></span></span>
        </button>;
      })}
    </div>
    <div className="rack-bottom"><div className="rack-browse"><button type="button" className="rack-arrow" aria-label="Previous garment" disabled={position <= 0} onClick={() => navigate(-1)}><RackArrow previous/></button><span aria-label={expanded ? `Garment ${active + 1} of ${rackItems.length}` : `${rackItems.length} garments on the rack`}>{expanded ? `${String(active + 1).padStart(2, "0")} / ${String(rackItems.length).padStart(2, "0")}` : `${rackItems.length} PIECES`}</span><button type="button" className="rack-arrow" aria-label="Next garment" disabled={position >= rackItems.length - 1} onClick={() => navigate(1)}><RackArrow/></button></div><div className="rack-selection" aria-live="polite" aria-atomic="true">{expanded ? <><button onClick={() => open(featured)}>{featured.name}</button><span>{money(featured.price)} CAD <small>DEMO PRICE</small></span></> : <><span className="rack-overview-title">Find your everyday uniform.</span><span>Select a hanging piece to explore it.</span></>}</div><button className="text-link" onClick={() => expanded ? open(featured) : select(active)}>{expanded ? "QUICK VIEW / ADD TO BAG" : "EXPLORE A PIECE"}</button></div>
    <div className="rack-hint"><span className="rack-hint-desktop">DRAG TO BROWSE</span><span className="rack-hint-mobile">SWIPE TO BROWSE</span>{expanded ? <button className="text-link rack-reset" onClick={showOverview}>SHOW FULL RACK</button> : <span>SELECT A GARMENT TO BRING IT FORWARD</span>}</div>
  </section>;
}
