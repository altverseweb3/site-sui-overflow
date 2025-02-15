import { SiteHeader } from "@/components/layout/SiteHeader";

export default function DAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
