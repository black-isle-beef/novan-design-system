/** A single primary-navigation entry, optionally with a dropdown of children. */
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
}

/** A grouped column of links used by `DsFooterComponent`. */
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

/** A single collapsible entry used by `DsSidebarComponent`. */
export interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}
