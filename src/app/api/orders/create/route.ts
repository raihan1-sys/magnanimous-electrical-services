import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { orderNumber } from "@/lib/order";

const schema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),

  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
  }),

  shipping: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
  }),

  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const ids = body.items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            id: {
              in: ids,
            },
          },
          {
            legacyId: {
              in: ids,
            },
          },
        ],
        status: "ACTIVE",
      },
    });

    if (products.length !== new Set(ids).size) {
      return NextResponse.json(
        {
          error: "One or more products are unavailable.",
        },
        {
          status: 400,
        }
      );
    }

    let subtotal = 0;

    const items = body.items.map((item) => {
      const product = products.find(
        (p) =>
          p.id === item.productId ||
          p.legacyId === item.productId
      );

      if (!product) {
        throw new Error("Product not found.");
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} is unavailable in the requested quantity.`
        );
      }

      subtotal += product.price * item.quantity;

      return {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: item.quantity,
      };
    });

    const customer = await prisma.customer.upsert({
      where: {
        email: body.customer.email,
      },
      update: {
        name: body.customer.name,
        phone: body.customer.phone,
      },
      create: {
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        customerId: customer.id,
        subtotal,
        total: subtotal,
        shippingName: body.shipping.name,
        shippingPhone: body.shipping.phone,
        shippingAddress: body.shipping.address,
        shippingCity: body.shipping.city,
        notes: body.notes || null,

        items: {
          create: items,
        },

        events: {
          create: {
            type: "ORDER_CREATED",
            message: "Order created for WhatsApp + Mobile Money payment",
          },
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json({
  success: true,
  orderNumber: order.orderNumber,
  orderId: order.id,
  total: order.total,
  items: order.items.map((item) => ({
    productName: item.productName,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: item.unitPrice * item.quantity,
  })),
});
  } catch (error) {
    console.error("Order creation error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create your order.",
      },
      {
        status: 400,
      }
    );
  }
}

