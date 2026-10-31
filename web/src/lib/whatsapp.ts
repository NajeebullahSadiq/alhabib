import { SITE } from "../data/catalog.ts";

export function waLink(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function orderLink(text: string): string {
  return waLink(SITE.salesWa, text);
}

export function generalLink(text = "Salaam"): string {
  return waLink(SITE.phoneWa, text);
}
