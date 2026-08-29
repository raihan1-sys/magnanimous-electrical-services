import { Hero } from "@/components/home/Hero";
import { TrustIntro } from "@/components/home/TrustIntro";
import { Services } from "@/components/home/Services";
import { WhatNeedsFixing } from "@/components/home/WhatNeedsFixing";
import { WeFixServiceSupply } from "@/components/home/WeFixServiceSupply";
import { ShopPreview } from "@/components/home/ShopPreview";
import { WhyMagnanimous } from "@/components/home/WhyMagnanimous";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIntro />
      <Services />
      <WhatNeedsFixing />
      <WeFixServiceSupply />
      <ShopPreview />
      <WhyMagnanimous />
      <ContactCTA />
    </>
  );
}
