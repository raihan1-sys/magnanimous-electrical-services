"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${count} items`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-blue-bright hover:text-blue-bright"
    >
      <ShoppingBag size={18} />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[10px] font-bold text-obsidian">
          {count}
        </span>
      )}
    </Link>
  );
}