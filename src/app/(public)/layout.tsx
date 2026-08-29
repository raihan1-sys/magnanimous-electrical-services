import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/nav/MobileActionBar";
import { ScrollProgress } from "@/components/PremiumMotion";
import { CartProvider } from "@/components/cart/CartProvider";
import { JsonLd } from "@/components/seo/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.businessName,
          description: siteConfig.description,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "GH",
            streetAddress: "A.T.U Campus, Old Hostel",
          },
          url: "https://magnanimouselectrical.com",
        }}
      />
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </CartProvider>
  );
}