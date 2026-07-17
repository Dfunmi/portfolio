import { Github, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks, type SocialLinkItem } from "@/components/ui/SocialLinks";
import { siteConfig, socialLinks } from "@/config/site";

const footerLinks: SocialLinkItem[] = [
  { label: "GitHub", href: socialLinks.github, icon: Github },
  { label: "Email", href: socialLinks.email, icon: Mail },
];

/**
 * Static Server Component — no client JS shipped. Purely presentational,
 * reads the same site config as the Navbar so links never drift out of sync.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container size="full">
        <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {siteConfig.author.name}. All rights reserved.
          </p>

          <SocialLinks links={footerLinks} size="sm" />
        </div>
      </Container>
    </footer>
  );
}
