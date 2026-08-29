import { PrismaClient, ProductStatus, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../src/data/products";
import { articles } from "../src/data/articles";
import { slugify } from "../src/lib/format";
const prisma=new PrismaClient();
const categories=["laptops","irons","blenders","kettles","extensions","power-banks","bluetooth-speakers","fans","rice-cookers"];
const money=(v:string)=>Number(v.replace(/[^0-9]/g,""));
async function main(){
 const email=process.env.ADMIN_EMAIL||"admin@example.com";const password=process.env.ADMIN_PASSWORD||"change-this-before-production";
 await prisma.adminUser.upsert({where:{email},update:{passwordHash:await bcrypt.hash(password,12)},create:{email,passwordHash:await bcrypt.hash(password,12),name:"Magnanimous Admin"}});
 const cats=new Map<string,string>();for(const name of categories){const c=await prisma.category.upsert({where:{slug:name},update:{name:name.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" ")},create:{name:name.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" "),slug:name}});cats.set(name,c.id)}
 for(const p of products){const slug = `${slugify(p.name)}-${p.id}`;await prisma.product.upsert({where:{legacyId:p.id},update:{name:p.name,slug,description:p.description,price:money(p.price),compareAtPrice:p.originalPrice?money(p.originalPrice):null,image:p.image,stock:p.inStock?20:0,status:p.inStock?ProductStatus.ACTIVE:ProductStatus.DRAFT,categoryId:cats.get(p.category)},create:{legacyId:p.id,name:p.name,slug,description:p.description,price:money(p.price),compareAtPrice:p.originalPrice?money(p.originalPrice):null,image:p.image,stock:p.inStock?20:0,status:p.inStock?ProductStatus.ACTIVE:ProductStatus.DRAFT,categoryId:cats.get(p.category)}})}
 for(const a of articles){const catSlug=slugify(a.category);const cat=await prisma.category.upsert({where:{slug:catSlug},update:{},create:{name:a.category,slug:catSlug}});await prisma.post.upsert({where:{slug:a.slug},update:{title:a.title,excerpt:a.excerpt,content:JSON.stringify(a.content),authorName:"Magnanimous Electrical Services",status:PostStatus.PUBLISHED,publishedAt:new Date(a.publishedAt),categoryId:cat.id},create:{title:a.title,slug:a.slug,excerpt:a.excerpt,content:JSON.stringify(a.content),authorName:"Magnanimous Electrical Services",status:PostStatus.PUBLISHED,publishedAt:new Date(a.publishedAt),categoryId:cat.id}})}
}
main().then(()=>prisma.$disconnect()).catch(async e=>{console.error(e);await prisma.$disconnect();process.exit(1)})
