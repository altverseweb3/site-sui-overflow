"use client";

import { SocialIcon } from "react-social-icons";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex h-12 items-center px-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} Altverse. All rights reserved.
        </p>

        <div className="ml-auto flex items-center gap-1">
          <SocialIcon
            url="https://discord.gg/xDMCtNJCEv"
            bgColor="#0A0A0B"
            fgColor="#A6A6A9"
            style={{ height: 36, width: 36 }}
          />

          <SocialIcon
            url="https://x.com/altverseweb3"
            bgColor="#0A0A0B"
            fgColor="#A6A6A9"
            style={{ height: 36, width: 36 }}
          />

          <SocialIcon
            url="https://t.me/altverse"
            bgColor="#0A0A0B"
            fgColor="#A6A6A9"
            style={{ height: 36, width: 36 }}
          />
        </div>
      </div>
    </footer>
  );
}
