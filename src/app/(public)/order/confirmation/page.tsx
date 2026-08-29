"use client";

import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

function ConfirmationContent() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const { clear } = useCart();

  const [state, setState] = useState<"loading" | "paid" | "failed">("loading");
  const [message, setMessage] = useState(
    "Verifying your Paystack transaction securely…"
  );

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!reference) {
      setState("failed");
      setMessage("No payment reference was supplied.");
      return;
    }

    fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "PAID") {
          clear();
          setState("paid");
          setMessage(
            `Payment verified. Order ${d.orderNumber} is now being processed.`
          );
        } else {
          setState("failed");
          setMessage(
            d.error || `Payment status: ${d.status || "not confirmed"}`
          );
        }
      })
      .catch(() => {
        setState("failed");
        setMessage(
          "We could not verify the payment right now. Please contact us with your reference."
        );
      });
  }, [reference, clear]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const Icon =
    state === "paid"
      ? CheckCircle2
      : state === "failed"
        ? AlertCircle
        : LoaderCircle;

  return (
    <main className="grid min-h-[70vh] place-items-center bg-off-white px-5">
      <div className="max-w-xl text-center">
        <Icon
          className={`mx-auto ${
            state === "paid"
              ? "text-blue"
              : state === "failed"
                ? "text-red-600"
                : "animate-spin text-blue"
          }`}
          size={58}
        />

        <p className="mt-6 font-mono text-xs text-blue">
          PAYMENT CONFIRMATION
        </p>

        <h1 className="mt-3 font-display text-5xl">
          {state === "paid"
            ? "Payment verified."
            : state === "failed"
              ? "Payment not confirmed."
              : "Checking payment."}
        </h1>

        <p className="mt-5 text-obsidian/60">{message}</p>

        {reference && (
          <p className="mt-3 font-mono text-xs text-obsidian/40">
            Reference: {reference}
          </p>
        )}

        <Link
          href="/shop"
          className="mt-8 inline-block bg-obsidian px-6 py-4 text-white"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default function Confirmation() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[70vh] place-items-center bg-off-white px-5">
          <div className="text-center">
            <LoaderCircle
              className="mx-auto animate-spin text-blue"
              size={58}
            />
            <p className="mt-6 font-mono text-xs text-blue">
              PAYMENT CONFIRMATION
            </p>
            <h1 className="mt-3 font-display text-5xl">
              Checking payment.
            </h1>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}