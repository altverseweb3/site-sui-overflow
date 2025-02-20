import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";

const features = [
  {
    name: "Swap & Bridge Across Chains",
    description:
      "Swap and bridge intra-chain and cross-chain at the best market rates. Instant and faster-than-finality operations powered by Wormhole.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 md:row-span-1",
  },
  {
    name: "Completely Decentralized",
    description: "No central entities. Fully smart-contract based.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1 md:col-span-2 md:row-span-1",
  },
  {
    name: "Earn",
    description:
      "Access top-yielding protocols for farming, lending, and borrowing locally and across chains.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1 md:col-span-2 md:row-span-1",
  },
  {
    name: "Cross-Chain & Cross-Environment",
    description:
      "Access Ethereum, Solana, Sui, and other popular L1s/L2s and associated protocols seamlessly.",
    href: "/",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 md:row-span-1",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-4 py-3">
        <div className="flex flex-col items-center">
          <Button variant="outline" size="sm" className="mb-6 mt-4 md:mt-0">
            Learn More
          </Button>

          <div className="text-center mb-6">
            <h1 className="text-4xl font-normal mb-4">
              Altverse: The Unified Crypto Interface
            </h1>
            <Link href="/swap">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>

          <BentoGrid className="w-full grid-cols-1 md:grid-cols-5 gap-6 md:auto-rows-[min(340px,33vh)]">
            {features.map((feature) => (
              <BentoCard
                key={feature.name}
                {...feature}
                Icon={() => null}
                background={null}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}
