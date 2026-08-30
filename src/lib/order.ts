import crypto from "crypto";
import { prisma } from "@/lib/db";

export function orderNumber() {
  return `MES-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;
}

export async function markOrderPaid(reference: string) {
  const order = await prisma.order.findUnique({
    where: { paymentReference: reference },
    include: { items: true },
  });

  if (!order) return null;

  if (order.paymentStatus === "PAID") return order;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        orderStatus:
          order.orderStatus === "PENDING"
            ? "PROCESSING"
            : order.orderStatus,
        paidAt: new Date(),
        events: {
          create: {
            type: "PAYMENT_VERIFIED",
            message: "Mobile Money payment confirmed",
          },
        },
      },
    });

    return updated;
  });
}