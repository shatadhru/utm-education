import { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  iconColor?: string;
};

export interface NavGroup {
  type: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  items?: NavItem[];
}
