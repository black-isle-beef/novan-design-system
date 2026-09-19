/**
 * Whether `href` should navigate with a plain anchor (a full URL, `mailto:`/
 * `tel:` link, same-page fragment, or protocol-relative URL) rather than
 * `routerLink`, which only understands in-app route paths.
 */
export function isExternalLink(href: string): boolean {
  return /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
}
