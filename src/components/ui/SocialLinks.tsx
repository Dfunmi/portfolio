import type { LucideIcon } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";
import type { WithClassName } from "@/types";

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SocialLinksProps extends WithClassName {
  links: SocialLinkItem[];
  size?: "sm" | "md";
}

const sizeStyles = {
  sm: { wrapper: "size-9", icon: 18 },
  md: { wrapper: "size-10", icon: 18 },
} as const;


export function SocialLinks({ links, size = "md", className }: SocialLinksProps) {
  const { wrapper, icon: iconSize } = sizeStyles[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {links.map(({ label, href, icon: Icon }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            className={cn(
              "flex items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-(--duration-fast) hover:bg-muted hover:text-foreground",
              wrapper,
              focusRing
            )}
          >
            <Icon size={iconSize} strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}
