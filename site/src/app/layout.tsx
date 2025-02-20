import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Altverse",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { color-scheme: light; }
              :root.dark { color-scheme: dark; }
              
              :root:not([data-theme-loaded]) {
                visibility: hidden;
              }
            `,
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('altverse-storage-ui');
                if (stored) {
                  const data = JSON.parse(stored);
                  if (data.state?.theme === 'dark' || (!data.state?.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
                document.documentElement.setAttribute('data-theme-loaded', 'true');
              } catch (e) {
                document.documentElement.setAttribute('data-theme-loaded', 'true');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background">
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
