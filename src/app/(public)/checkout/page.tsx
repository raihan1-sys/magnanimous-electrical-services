"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ghs } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const customer = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
    };

    const shipping = {
      name: String(form.get("shippingName") || "").trim(),
      phone: String(form.get("shippingPhone") || "").trim(),
      address: String(form.get("address") || "").trim(),
      city: String(form.get("city") || "").trim(),
    };

    const notes = String(form.get("notes") || "").trim();

    try {
      /*
       * Create the order in our database.
       * Payment is NOT taken online.
       */
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          customer,
          shipping,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create your order.");
      }

      /*
       * Build the WhatsApp message.
       */
      const orderLines = data.items
  .map(
    (item: {
      productName: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }) =>
      `• ${item.productName} × ${item.quantity} — ${ghs(item.lineTotal)}`
  )
  .join("\n");

      
const message = `Hello Magnanimous Electrical Services,

I'd like to place an order.

ORDER
${orderLines}

Total: ${ghs(total)}

CUSTOMER
Name: ${customer.name}
Phone: ${customer.phone}
Email: ${customer.email}

DELIVERY / COLLECTION
Recipient: ${shipping.name}
Phone: ${shipping.phone}
Address: ${shipping.address}
City: ${shipping.city}

${notes ? `Notes: ${notes}\n\n` : ""}Order number: ${data.orderNumber}

MOBILE MONEY PAYMENT METHOD
Network: MTN Mobile Money
Number: 0257815136
Account Name: ERIC ASARE
Amount to Pay: ${ghs(total)}

Make payment using the details above and send the payment confirmation here.

Thank you.`;

      const whatsappUrl = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your order."
      );
      setLoading(false);
    }
  }

  return (
    <main className="bg-off-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-10">
          <div>
            <p className="font-mono text-xs text-blue">
              ORDER VIA WHATSAPP
            </p>

            <h1 className="mt-3 font-display text-5xl">
              Your details.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-obsidian/55">
              Complete your details below. Your order will be sent to
              Magnanimous Electrical Services on WhatsApp. Payment will be
              made separately through Mobile Money after your order is
              confirmed.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              Name
              <input
                required
                name="name"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>

            <label>
              Phone
              <input
                required
                type="tel"
                name="phone"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="sm:col-span-2 font-display text-2xl">
              Delivery information
            </h2>

            <label>
              Recipient name
              <input
                required
                name="shippingName"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>

            <label>
              Recipient phone
              <input
                required
                type="tel"
                name="shippingPhone"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>

            <label className="sm:col-span-2">
              Address
              <textarea
                required
                name="address"
                className="mt-1 min-h-24 w-full border bg-white p-3"
              />
            </label>

            <label>
              City
              <input
                required
                name="city"
                defaultValue="Accra"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>

            <label>
              Notes
              <input
                name="notes"
                className="mt-1 w-full border bg-white p-3"
              />
            </label>
          </section>

          {error && (
            <p className="border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !items.length}
            className="bg-blue px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Preparing your WhatsApp order..."
              : "Order via WhatsApp"}
          </button>
        </form>

        <aside className="h-fit bg-obsidian p-7 text-white">
          <h2 className="font-display text-2xl">
            Order summary
          </h2>

          {items.map((item) => (
            <div
              className="mt-5 flex justify-between gap-3 text-sm"
              key={item.id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                {ghs(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="mt-8 flex justify-between border-t border-white/15 pt-5">
            <strong>Total</strong>
            <strong>{ghs(total)}</strong>
          </div>

          <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/55">
            Payment is handled directly through Mobile Money after
            your order is confirmed on WhatsApp.
          </p>
        </aside>
      </div>
    </main>
  );
}
