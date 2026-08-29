"use client";

import { useState } from "react";
import Link from "next/link";
import { saveProductAction } from "@/app/admin/actions";
import { CloudinaryImageUpload } from "@/components/admin/CloudinaryImageUpload";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  status?: "ACTIVE" | "DRAFT" | "ARCHIVED";
  categoryId?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

type Props = {
  categories: Category[];
  product?: Product;
};

export function ProductForm({ categories, product }: Props) {
  const [image, setImage] = useState(product?.image || "");

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker={product ? "PRODUCT CATALOG — EDIT" : "PRODUCT CATALOG — NEW"}
        title={product ? "Edit product" : "New product"}
        description={
          product
            ? "Update the details for this product. Changes go live immediately."
            : "Add a new product to the catalogue. It will appear on the public shop when saved."
        }
        actions={
          <Link href="/admin/products" className="admin-btn admin-btn-ghost">
            Back to products
          </Link>
        }
      />

      <form action={saveProductAction} className="space-y-5">
        {product?.id && <input type="hidden" name="id" value={product.id} />}

        <div className="admin-card space-y-5 p-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Name
            </span>
            <input
              required
              name="name"
              defaultValue={product?.name || ""}
              placeholder="e.g. Heavy-duty Blender"
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Slug
            </span>
            <input
              name="slug"
              defaultValue={product?.slug || ""}
              placeholder="auto-generated from name"
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Description
            </span>
            <textarea
              required
              name="description"
              defaultValue={product?.description || ""}
              placeholder="What is this product, and what is it used for?"
              className="admin-input"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Price (GHS)
              </span>
              <input
                required
                type="number"
                min="0"
                name="price"
                defaultValue={product?.price ?? ""}
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Stock
              </span>
              <input
                required
                type="number"
                min="0"
                name="stock"
                defaultValue={product?.stock ?? ""}
                className="admin-input"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Category
            </span>
            <select
              name="categoryId"
              defaultValue={product?.categoryId || ""}
              className="admin-input"
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-white/40">
              Choose the category this product belongs to.
            </p>
          </label>

          <div>
            <p className="mb-2 text-sm font-medium text-white/70">
              Product image
            </p>
            <CloudinaryImageUpload value={image} onChange={setImage} />
            <input type="hidden" name="image" value={image} required />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Status
            </span>
            <select
              name="status"
              defaultValue={product?.status || "ACTIVE"}
              className="admin-input"
            >
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
            </select>
          </label>
        </div>

        <div className="admin-card space-y-5 p-6">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Search optimisation
          </p>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              SEO title
            </span>
            <input
              name="seoTitle"
              defaultValue={product?.seoTitle || ""}
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              SEO description
            </span>
            <textarea
              name="seoDescription"
              defaultValue={product?.seoDescription || ""}
              className="admin-input"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="admin-btn admin-btn-primary">
            {product ? "Save changes" : "Save product"}
          </button>
          <Link href="/admin/products" className="admin-btn admin-btn-ghost px-5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}