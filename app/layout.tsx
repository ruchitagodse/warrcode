import type { Metadata } from "next";
import "./globals.scss";
import "./motion.scss";
export const metadata: Metadata = { title: "WARRCODE — Wear Your Code.", description: "Toronto streetwear. Everyday identity. Explore WARRCODE — a frontend shopping demo with sample CAD pricing." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en-CA"><body>{children}</body></html>; }
