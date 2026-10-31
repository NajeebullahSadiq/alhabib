import { useLocation, useNavigate, useParams } from "react-router-dom";

export const LOCALES = ["en", "fa", "ps"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fa" || value === "ps";
}

export function useLocale(): Locale {
  const { locale } = useParams();
  return isLocale(locale) ? locale : "en";
}

export function usePath() {
  const locale = useLocale();
  return (to: string) => (to === "/" ? `/${locale}` : `/${locale}${to.startsWith("/") ? to : `/${to}`}`);
}

export function useSwitchLocale() {
  const location = useLocation();
  const navigate = useNavigate();
  return (next: Locale) => {
    const parts = location.pathname.split("/");
    parts[1] = next;
    navigate(`${parts.join("/")}${location.search}${location.hash}`);
  };
}
