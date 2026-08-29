"use client";

import { useState } from "react";
import { saveProductAction } from "@/app/admin/actions";
import { CloudinaryImageUpload } from "@/components/admin/CloudinaryImageUpload";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  seoTitle: string | null;
  seoDescription: string | null;
};

export function EditProductForm({ product }: { product: Product }) {
  const [image, setImage] = useState(product.image || "");

  return (
    <form
      action={saveProductAction}
      className="max-w-3xl space-y-5"
    >
      <input
        type="hidden"
        name="id"
        value={product.id}
      />

      <h1 className="font-display text-5xl">
        Edit product
      </h1>

      <label className="block">
        Name
        <input
          required
          name="name"
          defaultValue={product.name}
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        Slug
        <input
          name="slug"
          defaultValue={product.slug}
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        Description
        <textarea
          required
          name="description"
          defaultValue={product.description}
          className="mt-1 min-h-28 w-full border p-3"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label>
          Price
          <input
            required
            type="number"
            name="price"
            defaultValue={product.price}
            className="mt-1 w-full border p-3"
          />
        </label>

        <label>
          Stock
          <input
            required
            type="number"
            name="stock"
            defaultValue={product.stock}
            className="mt-1 w-full border p-3"
          />
        </label>
      </div>

      <div>
        <p className="mb-2 block">
          Product image
        </p>

        <CloudinaryImageUpload
          value={image}
          onChange={setImage}
        />

        <input
          type="hidden"
          name="image"
          value={image}
          readOnly
        />
      </div>

      <label className="block">
        Status
        <select
          name="status"
          defaultValue={product.status}
          className="mt-1 w-full border p-3"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="DRAFT">DRAFT</option>
        </select>
      </label>

      <label className="block">
        SEO title
        <input
          name="seoTitle"
          defaultValue={product.seoTitle || ""}
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        SEO description
        <textarea
          name="seoDescription"
          defaultValue={product.seoDescription || ""}
          className="mt-1 min-h-20 w-full border p-3"
        />
      </label>

      <button
        type="submit"
        className="bg-blue px-5 py-3 text-white"
      >
        Save product
      </button>
    </form>
  );
}
