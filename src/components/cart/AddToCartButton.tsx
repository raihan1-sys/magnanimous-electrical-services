"use client";
import { ShoppingBag } from "lucide-react";import { useCart } from "./CartProvider";
export function AddToCartButton({product}:{product:{id:string;name:string;slug:string;price:number;image:string}}){const {add}=useCart();return <button onClick={()=>add(product)} className="inline-flex w-full items-center justify-center gap-2 bg-blue px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue/90"><ShoppingBag size={17}/> Add to cart</button>}
