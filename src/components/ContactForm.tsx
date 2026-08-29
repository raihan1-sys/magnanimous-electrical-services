"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const serviceOptions = [
  "Appliance repair",
  "Electrical services",
  "Motor & mechanical",
  "AC & cooling",
  "Phone & laptop repair",
  "Shop enquiry",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: serviceOptions[0],
    device: "",
    description: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const canSend = form.name.trim() && form.phone.trim() && form.description.trim();

  const buildMessage = () =>
    [
      `Hi Magnanimous, I'd like to request a service.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      form.device ? `Device/Appliance: ${form.device}` : null,
      `Problem: ${form.description}`,
    ]
      .filter(Boolean)
      .join("\n");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        const url = `${siteConfig.whatsappHref}?text=${encodeURIComponent(buildMessage())}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className={inputClass}
            placeholder="e.g. Kwame Mensah"
          />
        </Field>
        <Field label="Phone number" required>
          <input
            required
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
            placeholder="0XX XXX XXXX"
          />
        </Field>
      </div>

      <Field label="Service needed">
        <select value={form.service} onChange={update("service")} className={inputClass}>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Device / appliance (optional)">
        <input
          value={form.device}
          onChange={update("device")}
          className={inputClass}
          placeholder="e.g. Philips blender, Dell laptop"
        />
      </Field>

      <Field label="Describe the problem" required>
        <textarea
          required
          value={form.description}
          onChange={update("description")}
          rows={4}
          className={inputClass}
          placeholder="What's happening with it?"
        />
      </Field>

      <button
        type="submit"
        disabled={!canSend}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-blue px-6 py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-blue-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MessageCircle size={16} />
        Send via WhatsApp
      </button>
      <p className="text-xs text-obsidian/45">
        This opens WhatsApp with your details filled in — nothing is sent
        until you press send there.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-sm border border-obsidian/15 bg-white px-4 py-3 text-sm text-obsidian placeholder:text-obsidian/35 focus:border-blue";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-wide text-obsidian/50">
        {label}
        {required && <span className="text-blue"> *</span>}
      </span>
      {children}
    </label>
  );
}
