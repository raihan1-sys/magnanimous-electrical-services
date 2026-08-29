"use server";

import { prisma } from "@/lib/db";
import {
  requireAdmin,
  verifyPassword,
  createAdminSession,
  destroyAdminSession,
} from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function loginAction(form: FormData) {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    redirect("/admin/login?error=Invalid%20email%20or%20password");
  }

  await createAdminSession({
    id: user.id,
    email: user.email,
  });

  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function saveProductAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");
  const title = String(form.get("name") || "").trim();

  if (!title) {
    throw new Error("Product name is required");
  }

  const requestedSlug = String(form.get("slug") || "").trim();
  const baseSlug = slugify(requestedSlug || title);

  let slug = baseSlug;
  let count = 2;

  while (
    await prisma.product.findFirst({
      where: {
        slug,
        ...(id ? { NOT: { id } } : {}),
      },
    })
  ) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const categoryId =
    String(form.get("categoryId") || "").trim() || null;

  const data = {
    name: title,
    slug,
    description: String(form.get("description") || ""),
    price: Number(form.get("price") || 0),
    stock: Number(form.get("stock") || 0),
    image: String(form.get("image") || ""),
    categoryId,
    status:
      String(form.get("status")) === "DRAFT"
        ? ("DRAFT" as const)
        : ("ACTIVE" as const),
    seoTitle: String(form.get("seoTitle") || "") || null,
    seoDescription: String(form.get("seoDescription") || "") || null,
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data,
    });
  } else {
    await prisma.product.create({
      data,
    });
  }

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath("/admin/categories");

  redirect("/admin/products");
}

export async function deleteProductAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");

  if (!id) {
    throw new Error("Product ID is required");
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath("/admin/categories");

  redirect("/admin/products");
}

export async function saveCategoryAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");
  const name = String(form.get("name") || "").trim();

  if (!name) {
    throw new Error("Category name is required");
  }

  const requestedSlug = String(form.get("slug") || "").trim();
  const baseSlug = slugify(requestedSlug || name);

  if (!baseSlug) {
    throw new Error("A valid category slug is required");
  }

  let slug = baseSlug;
  let count = 2;

  while (
    await prisma.category.findFirst({
      where: {
        slug,
        ...(id ? { NOT: { id } } : {}),
      },
    })
  ) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const data = {
    name,
    slug,
    description:
      String(form.get("description") || "").trim() || null,
  };

  if (id) {
    await prisma.category.update({
      where: { id },
      data,
    });
  } else {
    await prisma.category.create({
      data,
    });
  }

  revalidatePath("/shop");
  revalidatePath("/blog");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/blog");

  redirect("/admin/categories");
}

export async function deleteCategoryAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");

  if (!id) {
    throw new Error("Category ID is required");
  }

  const [productCount, postCount] = await Promise.all([
    prisma.product.count({
      where: { categoryId: id },
    }),
    prisma.post.count({
      where: { categoryId: id },
    }),
  ]);

  if (productCount > 0 || postCount > 0) {
    throw new Error(
      "Cannot delete this category while products or posts are assigned to it. Remove the category from those items first."
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/shop");
  revalidatePath("/blog");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/blog");

  redirect("/admin/categories");
}

export async function savePostAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");
  const title = String(form.get("title") || "").trim();

  if (!title) {
    throw new Error("Post title is required");
  }

  const requestedSlug = String(form.get("slug") || "").trim();
  const baseSlug = slugify(requestedSlug || title);

  let slug = baseSlug;
  let count = 2;

  while (
    await prisma.post.findFirst({
      where: {
        slug,
        ...(id ? { NOT: { id } } : {}),
      },
    })
  ) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const categoryId =
    String(form.get("categoryId") || "").trim() || null;

  const status =
    String(form.get("status")) === "PUBLISHED"
      ? ("PUBLISHED" as const)
      : ("DRAFT" as const);

  const data = {
    title,
    slug,
    excerpt: String(form.get("excerpt") || ""),
    content: String(form.get("content") || ""),
    featuredImage:
      String(form.get("featuredImage") || "") || null,
    authorName:
      String(form.get("authorName") || "").trim() ||
      "Magnanimous Electrical Services",
    seoTitle:
      String(form.get("seoTitle") || "") || null,
    seoDescription:
      String(form.get("seoDescription") || "") || null,
    categoryId,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
  };

  if (id) {
    const existing = await prisma.post.findUnique({
      where: { id },
      select: {
        publishedAt: true,
      },
    });

    await prisma.post.update({
      where: { id },
      data: {
        ...data,
        publishedAt:
          status === "PUBLISHED"
            ? existing?.publishedAt ?? new Date()
            : null,
      },
    });
  } else {
    await prisma.post.create({
      data,
    });
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/categories");

  redirect("/admin/blog");
}

export async function deletePostAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");

  if (!id) {
    throw new Error("Post ID is required");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/categories");

  redirect("/admin/blog");
}

export async function updateOrderAction(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") || "");

  const orderStatus = String(form.get("orderStatus") || "") as
    | "PENDING"
    | "PROCESSING"
    | "READY"
    | "SHIPPED"
    | "COMPLETED"
    | "CANCELLED";

  if (!id) {
    throw new Error("Order ID is required");
  }

  const validStatuses = [
    "PENDING",
    "PROCESSING",
    "READY",
    "SHIPPED",
    "COMPLETED",
    "CANCELLED",
  ];

  if (!validStatuses.includes(orderStatus)) {
    throw new Error("Invalid order status");
  }

  await prisma.order.update({
    where: { id },
    data: {
      orderStatus,
      events: {
        create: {
          type: "STATUS_UPDATED",
          message: `Order status changed to ${orderStatus}`,
        },
      },
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);

  redirect("/admin/orders");
}