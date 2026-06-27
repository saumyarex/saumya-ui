import { Navbar } from "@/components/blocks/navbar";
import { HeroCentered } from "@/components/blocks/hero-centered";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { FeatureGrid } from "@/components/blocks/feature-grid";
import { BentoFeatures } from "@/components/blocks/bento-features";
import { Stats } from "@/components/blocks/stats";
import { Testimonials } from "@/components/blocks/testimonials";
import { PricingThreeTier } from "@/components/blocks/pricing-three-tier";
import { Faq } from "@/components/blocks/faq";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { Footer } from "@/components/blocks/footer";

/**
 * A complete SaaS landing page assembled from Saumya UI blocks. Reorder, remove,
 * or swap any section — every piece is an independent block you already own.
 */
export function SaasLanding() {
  return (
    <div className="bg-background">
      <Navbar />
      <main>
        <HeroCentered />
        <LogoCloud />
        <FeatureGrid />
        <BentoFeatures />
        <Stats />
        <Testimonials />
        <PricingThreeTier />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
