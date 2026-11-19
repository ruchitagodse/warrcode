export function Icon({ name }: { name: "search" | "bag" | "menu" | "close" | "plus" | "minus" | "check" }) {
  const paths = { search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>, bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>, menu: <path d="M3 7h18M3 16h18"/>, close: <path d="m5 5 14 14M19 5 5 19"/>, plus: <path d="M12 5v14M5 12h14"/>, minus: <path d="M5 12h14"/>, check: <path d="m5 12 4 4L19 6"/> };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
