"use client";

import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function CloudinaryImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        }
        options={{
          resourceType: "image",
          maxFileSize: 5000000,
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
        onOpen={() => setUploading(true)}
        onClose={() => setUploading(false)}
        onSuccess={(result) => {
          const info = result.info;

          if (
            typeof info === "object" &&
            info !== null &&
            "secure_url" in info
          ) {
            const url = String(
              (info as { secure_url?: string }).secure_url || ""
            );

            if (url) {
              onChange(url);
            }
          }

          setUploading(false);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={uploading}
            className="admin-btn admin-btn-ghost"
          >
            {uploading
              ? "Uploading..."
              : value
              ? "Change product image"
              : "Upload product image"}
          </button>
        )}
      </CldUploadWidget>

      {value && (
        <>
          <div className="relative h-48 w-48 overflow-hidden border border-white/[0.12] bg-[#0a0e14]">
            <Image
              src={value}
              alt="Product preview"
              fill
              className="object-contain p-3"
            />
          </div>

          <p className="break-all text-xs text-white/40">
            {value}
          </p>

          <p className="text-xs text-green-400">
            ✓ Image uploaded successfully
          </p>
        </>
      )}
    </div>
  );
}
