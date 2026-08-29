export interface Product {
  id: string;
  name: string;
  category: 
    | 'laptops' 
    | 'irons' 
    | 'blenders' 
    | 'kettles' 
    | 'extensions' 
    | 'power-banks' 
    | 'bluetooth-speakers' 
    | 'fans' 
    | 'rice-cookers';
  price: string;
  originalPrice?: string;
  description: string;
  image: string;
  inStock?: boolean;
}

export const products: Product[] = [
  // --- RICE COOKERS ---
  {
    id: "rice-cooker-1",
    name: "Esodora Stainless Steel Rice Cooker (Model ED-001)",
    category: "rice-cookers",
    price: "GH₵ 350",
    originalPrice: "GH₵ 380",
    description: "Stainless steel inner pot. Features rice cooking, keep/warm, and steaming modes.",
    image: "/images/products/rice-cookers/rice-cooker-1.jpeg",
    inStock: true,
  },
  {
    id: "rice-cooker-2",
    name: "Ajayb UK 2-in-1 Mini Rice Cooker & Warmer (2.2L / 900W)",
    category: "rice-cookers",
    price: "GH₵ 320",
    originalPrice: "GH₵ 350",
    description: "Ideal for 3 cups of rice. Features a stainless steel inner pot and glass lid.",
    image: "/images/products/rice-cookers/rice-cooker-2.jpeg",
    inStock: true,
  },
  {
    id: "rice-cooker-3",
    name: "Miyako Magic Warmer Plus (MCM-512 C)",
    category: "rice-cookers",
    price: "GH₵ 340",
    originalPrice: "GH₵ 360",
    description: "Pink multipurpose rice cooker with Nanoal non-stick/stainless inner pot.",
    image: "/images/products/rice-cookers/rice-cooker-3.jpeg",
    inStock: true,
  },
  {
    id: "rice-cooker-4",
    name: "Cosmos 3-in-1 Penanak Nasi (CRJ-3232)",
    category: "rice-cookers",
    price: "GH₵ 350",
    originalPrice: "GH₵ 380",
    description: "3-in-1 rice cooker, warmer, and steamer with decorative pattern.",
    image: "/images/products/rice-cookers/rice-cooker-4.jpeg",
    inStock: true,
  },
  {
    id: "rice-cooker-5",
    name: "Continental Mini Electric Rice Cooker",
    category: "rice-cookers",
    price: "GH₵ 280",
    originalPrice: "GH₵ 320",
    description: "Compact mini rice cooker designed for 2 cups of rice with stainless steel inner pot.",
    image: "/images/products/rice-cookers/rice-cooker-5.jpeg",
    inStock: true,
  },

  // --- BLENDERS ---
  {
    id: "blender-1",
    name: "Slivers Criest High-Speed Commercial Blender (SC-1589A - 5500W)",
    category: "blenders",
    price: "GH₵ 250",
    originalPrice: "GH₵ 280",
    description: "Heavy-duty 5500W motor with multi-function speed controls and dry mill attachment.",
    image: "/images/products/blenders/blender-1.jpeg",
    inStock: true,
  },
  {
    id: "blender-2",
    name: "Avelon 2-in-1 Blender & Grinder (AL-101)",
    category: "blenders",
    price: "GH₵ 220",
    originalPrice: "GH₵ 250",
    description: "Features an unbreakable PC jar, adjustable 2-speed pulse, stainless steel blades, and grinder cup.",
    image: "/images/products/blenders/blender-2.jpeg",
    inStock: true,
  },
  {
    id: "blender-3",
    name: "Binatone 2-in-1 Electric Blender with Mill",
    category: "blenders",
    price: "GH₵ 250",
    description: "Compact matte black design with clear blending jar, pulse control, and dedicated spice/nut grinder mill.",
    image: "/images/products/blenders/blender-3.jpeg",
    inStock: true,
  },

  // --- EXTENSION BOARDS / POWER STRIPS ---
  {
    id: "extension-1",
    name: "TENGRENG TP-178 Heavy Duty Extension Board (10A 250V)",
    category: "extensions",
    price: "GH₵ 120",
    description: "High-capacity multi-socket extension board with individual switches. Suitable for high loads like irons, laptop chargers, and phones.",
    image: "/images/products/extensions/extension-1.jpeg",
    inStock: true,
  },
  {
    id: "extension-2",
    name: "Newman 5-Way Multi-Socket Extension Board (Color Series)",
    category: "extensions",
    price: "GH₵ 90",
    description: "5-socket universal extension strip featuring individual power switches and indicator lights.",
    image: "/images/products/extensions/extension-2.jpeg",
    inStock: true,
  },
  {
    id: "extension-3",
    name: "Newman Modern Wooden-Grain Multi-Socket Extension Board",
    category: "extensions",
    price: "GH₵ 65",
    originalPrice: "GH₵ 70",
    description: "Stylish wooden texture finish multi-plug extension board with master power switch.",
    image: "/images/products/extensions/extension-3.jpeg",
    inStock: true,
  },
  {
    id: "extension-4",
    name: "Newman Compact 3-Way Extension Board (NO. 217 - 10A 250V)",
    category: "extensions",
    price: "GH₵ 40",
    description: "Compact 3-gang power strip with master power switch, perfect for daily home or office use.",
    image: "/images/products/extensions/extension-4.jpeg",
    inStock: true,
  },

  // --- POWER BANKS ---
  {
    id: "powerbank-1",
    name: "New Age 30,000mAh Fast Charging Power Bank (22.5W PD+QC)",
    category: "power-banks",
    price: "GH₵ 350",
    description: "High-capacity 30,000mAh power bank featuring 22.5W fast charging, LED digital display, integrated carry strap, and multiple USB/Type-C ports.",
    image: "/images/products/power-banks/power-bank-1.jpeg",
    inStock: true,
  },
  {
    id: "powerbank-2",
    name: "Vorrence 10,000mAh Slim Power Bank (DP09)",
    category: "power-banks",
    price: "GH₵ 250",
    description: "Compact 10,000mAh portable power bank designed to charge multiple devices simultaneously.",
    image: "/images/products/power-banks/power-bank-2.jpeg",
    inStock: true,
  },

  // --- AUDIO & SPEAKERS ---
  {
    id: "speaker-1",
    name: "Portable RGB Bluetooth Speaker",
    category: "bluetooth-speakers",
    price: "GH₵ 75",
    description: "Compact wireless speaker with multi-color RGB ring lighting, durable mesh exterior, and attached lanyard strap.",
    image: "/images/products/bluetooth-speakers/speaker-1.jpeg",
    inStock: true,
  },
  {
    id: "speaker-2",
    name: "WAF Multimedia Home System Speaker (MS-5031BT)",
    category: "bluetooth-speakers",
    price: "GH₵ 450",
    description: "High-power home theater sound system featuring a main subwoofer unit with 3 satellite mini speakers, Bluetooth support, and USB/SD reader.",
    image: "/images/products/bluetooth-speakers/speaker-2.jpeg",
    inStock: true,
  },

  // --- IRONS ---
  {
    id: "iron-1",
    name: "Philips Classic Heavy Duty Dry Iron",
    category: "irons",
    price: "GH₵ 220",
    description: "Heavy-duty dry iron with aluminum soleplate, ergonomic handle, and precise temperature control dial.",
    image: "/images/products/irons/iron-1.jpeg",
    inStock: true,
  },
  {
    id: "iron-2",
    name: "Royal Deluxe Dry Iron (YPF-2003A)",
    category: "irons",
    price: "GH₵ 130",
    description: "Lightweight dry iron with adjustable temperature control dial. Available in 2-pin (GH₵ 130) and 3-pin (GH₵ 150) plug variants.",
    image: "/images/products/irons/iron-2.jpeg",
    inStock: true,
  },

  // --- KETTLES ---
  {
    id: "kettle-1",
    name: "LED Glass Electric Kettle (Suntai / Sinbo / Keda)",
    category: "kettles",
    price: "GH₵ 230",
    originalPrice: "GH₵ 250",
    description: "Illuminated glass body electric kettle with LED indicator light. Available in bulk stock.",
    image: "/images/products/kettles/kettle-1.jpeg",
    inStock: true,
  },
  {
    id: "kettle-2",
    name: "Visioneer 2.0L Stainless Steel Electric Kettle",
    category: "kettles",
    price: "GH₵ 80",
    description: "Durable 2.0-liter stainless steel body kettle featuring a 360-degree swivel base and automatic shut-off safety function.",
    image: "/images/products/kettles/kettle-2.jpeg",
    inStock: true,
  },
  {
    id: "kettle-3",
    name: "Elgin Matte Black Stainless Steel Electric Kettle",
    category: "kettles",
    price: "GH₵ 150",
    description: "Sleek matte black stainless steel electric kettle with ergonomic handle and indicator light.",
    image: "/images/products/kettles/kettle-3.jpeg",
    inStock: true,
  },
  {
    id: "kettle-4",
    name: "Ailyons 2.2L Electric Water Kettle (Black/Red Trim)",
    category: "kettles",
    price: "GH₵ 150",
    description: "Generous 2.2-liter capacity electric kettle with rapid boil feature, heat-resistant handle, and red accent trim.",
    image: "/images/products/kettles/kettle-4.jpeg",
    inStock: true,
  },
  {
    id: "kettle-5",
    name: "Ailyons 2.2L Modern Cream Electric Kettle",
    category: "kettles",
    price: "GH₵ 150",
    description: "Large 2.2-liter capacity cordless electric kettle in an elegant cream and rose gold finish with fast boiling mechanism.",
    image: "/images/products/kettles/kettle-5.jpeg",
    inStock: true,
  },

  // --- FANS & ACCESSORIES ---
  {
    id: "fan-1",
    name: "Orient Electric Wall Fan",
    category: "fans",
    price: "GH₵ 300",
    description: "Wall-mounted electric fan featuring durable metal protective grill, 3-blade design, and push-button control panel.",
    image: "/images/products/fans/fan-1.jpeg",
    inStock: true,
  },
  {
    id: "fan-2",
    name: "5-Blade Replacement Fan Blade Set",
    category: "fans",
    price: "GH₵ 50",
    description: "Universal 5-blade replacement fan blades for standing and wall fans. Available in blue, translucent blue, and black variants.",
    image: "/images/products/fans/fan-2.jpeg",
    inStock: true,
  },
  {
    id: "fan-3",
    name: "D&H 5-Blade Standing Fan (Orange Blades)",
    category: "fans",
    price: "GH₵ 250",
    description: "Adjustable height standing pedestal fan with high-visibility 5-blade orange propeller, sturdy circular base, and black mesh guard. Price negotiable (only 1 available).",
    image: "/images/products/fans/fan-3.jpeg",
    inStock: true,
  },
  {
    id: "fan-4",
    name: "Weyon 18\" 2-in-1 Standing Fan (WY-F180C05)",
    category: "fans",
    price: "GH₵ 400",
    description: "Heavy-duty 18-inch 2-in-1 standing fan with super quiet motor, energy-saving design, and 3 speed level controls.",
    image: "/images/products/fans/fan-5.jpeg",
    inStock: true,
  },

  // --- LAPTOPS ---
  {
    id: "laptop-1",
    name: "Dell Latitude Business Laptop (Intel vPro)",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude with Intel vPro platform and Windows 11. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-1.jpeg",
    inStock: true,
  },
  {
    id: "laptop-2",
    name: "Dell Latitude Business Laptop",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude business laptop. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-2.jpeg",
    inStock: true,
  },
  {
    id: "laptop-3",
    name: "Dell Latitude Laptop (Intel Core i5, Fingerprint Reader)",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude with Intel Core i5 processor and fingerprint reader. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-3.jpeg",
    inStock: true,
  },
  {
    id: "laptop-4",
    name: "Dell Latitude Business Laptop",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude business laptop. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-4.jpeg",
    inStock: true,
  },
  {
    id: "laptop-5",
    name: "Dell Latitude Business Laptop",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude business laptop. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-5.jpeg",
    inStock: true,
  },
  {
    id: "laptop-6",
    name: "Dell Latitude Business Laptop",
    category: "laptops",
    price: "Contact for price",
    description: "Refurbished Dell Latitude business laptop. Stock and specs vary — message us for current units in the shop.",
    image: "/images/products/laptops/laptop-6.jpeg",
    inStock: true,
  },
];