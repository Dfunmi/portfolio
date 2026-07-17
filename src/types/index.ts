import type { ReactNode } from "react";

/** A single item in the primary site navigation. */
export interface NavItem {
  label: string;
  href: string;
}

/** Props shared by every component that wraps page-level content. */
export interface WithChildren {
  children: ReactNode;
}

/** Props shared by every component that accepts a style override. */
export interface WithClassName {
  className?: string;
}
