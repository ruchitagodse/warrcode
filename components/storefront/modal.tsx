"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./icon";
// Adapts PROSPERA's native dialog pattern for focus containment and focus return.
export function Modal({ title, close, children, drawer = false }: { title: string; close: () => void; children: React.ReactNode; drawer?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { dialog?.close(); document.body.style.overflow = previous; }; }, []);
  return <dialog ref={ref} className={`modal ${drawer ? "drawer" : ""}`} aria-label={title} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><div className="modal-inner"><button className="icon-button modal-close" aria-label={`Close ${title}`} onClick={close}><Icon name="close"/></button>{children}</div></dialog>;
}
