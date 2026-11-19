"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./icon";
import { reducedMotion } from "./motion";

// Native focus containment remains active throughout the short exit transition.
export function Modal({ title, close, children, drawer = false }: { title: string; close: () => void; children: React.ReactNode; drawer?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closing = useRef(false);
  useEffect(() => {
    const dialog = ref.current;
    closing.current = false;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { if (timer.current) clearTimeout(timer.current); dialog?.close(); document.body.style.overflow = previous; };
  }, []);
  function dismiss() {
    if (closing.current) return;
    closing.current = true;
    if (reducedMotion()) { close(); return; }
    ref.current?.setAttribute("data-closing", "true");
    timer.current = setTimeout(close, 190);
  }
  return <dialog ref={ref} className={`modal ${drawer ? "drawer" : ""}`} aria-label={title} onCancel={event => { event.preventDefault(); dismiss(); }} onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
    <div className="modal-inner"><button className="icon-button modal-close" aria-label={`Close ${title}`} onClick={dismiss}><Icon name="close"/></button>{children}<div className="motion-exit-layer" aria-hidden="true"/></div>
  </dialog>;
}
