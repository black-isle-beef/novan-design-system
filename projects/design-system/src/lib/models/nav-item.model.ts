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
  /** Bootstrap Icons class name(s) for the leading glyph, e.g. `'bi bi-columns-gap'`. */
  icon?: string;
  active?: boolean;
}

/** A single entry in a `DsBreadcrumbComponent` trail. The last entry is the current page. */
export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page; preceding entries render as links. */
  href?: string;
  /** Bootstrap Icons class name(s) for a leading glyph, e.g. `'bi bi-house'`. */
  icon?: string;
}
