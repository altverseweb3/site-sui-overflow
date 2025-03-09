import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function DAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh">
      <SiteHeader />
      <main className="container mx-auto flex-1 md:h-screen pt-6 px-2 sm:px-4">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
