import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { slugify } from "@/lib/format";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://magnanimouselectrical.com"; const staticRoutes=["","/services","/shop","/our-work","/about","/blog","/contact"]; return [
...staticRoutes.map(route=>({url:`${base}${route}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:route===""?1:.75})),
...products.map(p=>({url:`${base}/product/${slugify(p.name)}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.65})),
...articles.map(a=>({url:`${base}/blog/${a.slug}`,lastModified:new Date(a.publishedAt),changeFrequency:"monthly" as const,priority:.6}))]; }
