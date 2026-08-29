"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
export type CartItem={id:string;name:string;slug:string;price:number;image:string;quantity:number};
type Cart={items:CartItem[];add:(item:Omit<CartItem,"quantity">)=>void;remove:(id:string)=>void;setQuantity:(id:string,q:number)=>void;clear:()=>void;count:number;total:number};
const CartContext=createContext<Cart|null>(null);
// eslint-disable-next-line react-hooks/set-state-in-effect
export function CartProvider({children}:{children:React.ReactNode}){const [items,setItems]=useState<CartItem[]>([]);const [ready,setReady]=useState(false);useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("magnanimous-cart")||"[]"))}catch{}setReady(true)},[]);useEffect(()=>{if(ready)localStorage.setItem("magnanimous-cart",JSON.stringify(items))},[items,ready]);const value=useMemo(()=>({items,add:(item:Omit<CartItem,"quantity">)=>setItems(x=>{const found=x.find(i=>i.id===item.id);return found?x.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i):[...x,{...item,quantity:1}]}),remove:(id:string)=>setItems(x=>x.filter(i=>i.id!==id)),setQuantity:(id:string,q:number)=>setItems(x=>q<=0?x.filter(i=>i.id!==id):x.map(i=>i.id===id?{...i,quantity:Math.min(99,q)}:i)),clear:()=>setItems([]),count:items.reduce((n,i)=>n+i.quantity,0),total:items.reduce((n,i)=>n+i.price*i.quantity,0)}),[items]);return <CartContext.Provider value={value}>{children}</CartContext.Provider>}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error("useCart must be used inside CartProvider");return c}
