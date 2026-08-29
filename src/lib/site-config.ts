// Centralized business data. Edit here — every page reads from this file.
// Do not invent facts (stats, years of experience, hours) that aren't set here.

export const siteConfig = {
  businessName: "Magnanimous Electrical Services",
  shortName: "Magnanimous",
  tagline: "Service Beyond Tools",
  phone: "025 781 5136",
  phoneHref: "tel:0257815136",
  whatsapp: "025 781 5136",
  whatsappHref: "https://wa.me/233257815136",
  email: "Aseric1444@gmail.com",
  location: "A.T.U Campus, Old Hostel",
  locationLine2: "Accra, Ghana",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Accra%20Technical%20University%20Old%20Hostel%20Accra%20Ghana",
  logo: "/images/branding/logo.png/ChatGPT Image Aug 27, 2026, 07_05_50 PM.png",
  technicianPortrait:
    "/images/branding/technician-hero.png/ChatGPT Image Aug 27, 2026, 06_57_54 PM.png",
  description:
    "Magnanimous Electrical Services repairs and services electrical appliances, motors, AC units, phones and laptops, and supplies quality electronics — based at A.T.U Campus, Old Hostel.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceCategory = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "appliance-repair",
    eyebrow: "SVC-01",
    title: "Appliance Repair",
    description:
      "Kitchen and home appliances diagnosed and repaired — not just patched, fixed properly.",
    items: ["Blenders", "Electric kettles", "Hot plates", "Rice cookers", "Irons"],
  },
  {
    id: "electrical-services",
    eyebrow: "SVC-02",
    title: "Electrical Services",
    description:
      "Wiring, sockets and general electrical faults handled safely and to code.",
    items: ["Socket & extension repairs", "Wiring faults", "General electrical troubleshooting"],
  },
  {
    id: "motor-mechanical",
    eyebrow: "SVC-03",
    title: "Motor & Mechanical",
    description: "Rewinding and mechanical repair for motors that power your equipment.",
    items: ["Motor rewinding", "Mechanical fault diagnosis"],
  },
  {
    id: "ac-cooling",
    eyebrow: "SVC-04",
    title: "AC & Cooling",
    description: "Servicing to keep air conditioners and fans running through the heat.",
    items: ["AC servicing", "Ceiling fan repairs", "Standing fan repairs"],
  },
  {
    id: "phone-laptop",
    eyebrow: "SVC-05",
    title: "Phone & Laptop Repair",
    description: "Device faults diagnosed and repaired, from hardware to power issues.",
    items: ["Phone repairs", "Laptop repairs"],
  },
];

export type WorkItem = {
  id: string;
  category: string;
  title: string;
};

// Fixing-finder — maps a visitor's problem to the right service.
export const fixingFinder = [
  { label: "Kitchen appliance", href: "/services#appliance-repair" },
  { label: "Home appliance", href: "/services#appliance-repair" },
  { label: "Fan", href: "/services#ac-cooling" },
  { label: "AC", href: "/services#ac-cooling" },
  { label: "Phone", href: "/services#phone-laptop" },
  { label: "Laptop", href: "/services#phone-laptop" },
  { label: "Motor", href: "/services#motor-mechanical" },
  { label: "Electrical issue", href: "/services#electrical-services" },
] as const;
