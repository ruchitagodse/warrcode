"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icon";
export function Toast({ message, dismiss }: { message: string; dismiss: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 5000); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className="cart-toast" role="status"><Icon name="check"/><span>{message}</span><button className="icon-button" aria-label="Dismiss cart notification" onClick={dismiss}><Icon name="close"/></button></div>;
}
