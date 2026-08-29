"use client";

import { useState } from "react";
import { saveProductAction } from "@/app/admin/actions";
import { CloudinaryImageUpload } from "@/components/admin/CloudinaryImageUpload";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function NewProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [image, setImage] = useState("");

  return (
    <form action={saveProductAction} className="max-w-3xl space-y-5">
      <h1 className="font-display text-5xl">New product</h1>

      <label className="block">
        Name
        <input
          required
          name="name"
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        Slug
        <input
          name="slug"
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        Description
        <textarea
          required
          name="description"
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
            className="mt-1 w-full border p-3"
          />
        </label>

        <label>
          Stock
          <input
            required
            type="number"
            name="stock"
            className="mt-1 w-full border p-3"
          />
        </label>
      </div>

      <label className="block">
        Category
        <select
          name="categoryId"
          defaultValue=""
          className="mt-1 w-full border p-3"
        >
          <option value="">No category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="mb-2 block">Product image</p>

        <CloudinaryImageUpload
          value={image}
          onChange={setImage}
        />

        <input
          type="hidden"
          name="image"
          value={image}
          required
        />
      </div>

      <label className="block">
        Status
        <select
          name="status"
          defaultValue="ACTIVE"
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
          className="mt-1 w-full border p-3"
        />
      </label>

      <label className="block">
        SEO description
        <textarea
          name="seoDescription"
          className="mt-1 min-h-20 w-full border p-3"
        />
      </label>

      <button
        type="submit"
        className="bg-blue px-5 py-3 font-semibold text-white"
      >
        Save product
      </button>
    </form>
  );
}