import { ImageWidget } from "apps/admin/widgets.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";

export interface Logo {
  img?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  link?: string;
}

export interface Social {
  href?: string;
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "WhatsApp";
}

export interface Link {
  label?: string;
  href?: string;
  icon?: AvailableIcons | Symbol;
}

export interface Symbol {
  alt?: string;
  src?: ImageWidget;
  width?: number;
  height?: number;
}
