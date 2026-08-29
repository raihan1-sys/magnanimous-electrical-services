"use client";

import { deleteProductAction } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProductAction}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this product? This cannot be undone."
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="admin-btn admin-btn-danger px-2.5 py-2 text-xs"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </form>
  );
}
