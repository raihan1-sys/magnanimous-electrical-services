"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function Confirmation() {
  const { clear } = useCart();

  return (
    <main className="grid min-h-[70vh] place-items-center bg-off-white px-5">
      <div className="max-w-xl text-center">
        <CheckCircle2 className="mx-auto text-blue" size={58} />

        <p className="mt-6 font-mono text-xs text-blue">
          ORDER RECEIVED
        </p>

        <h1 className="mt-3 font-display text-5xl">
          Order received.
        </h1>

        <p className="mt-5 text-obsidian/60">
          Your order has been received successfully. Payment will be made
          separately through Mobile Money after your order is confirmed.
        </p>

        <p className="mt-4 text-sm text-obsidian/50">
          Please check WhatsApp for the order details and Mobile Money
          payment instructions.
        </p>

        <Link
          href="/shop"
          onClick={clear}
          className="mt-8 inline-block bg-obsidian px-6 py-4 text-white"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}