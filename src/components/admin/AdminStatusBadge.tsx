import type { ReactNode } from "react";

export type BadgeTone =
  | "steel"
  | "blue"
  | "lime"
  | "amber"
  | "green"
  | "red"
  | "purple";

const toneClass: Record<BadgeTone, string> = {
  steel: "admin-status--steel",
  blue: "admin-status--blue",
  lime: "admin-status--lime",
  amber: "admin-status--amber",
  green: "admin-status--green",
  red: "admin-status--red",
  purple: "admin-status--purple",
};

export const orderStatusTone: Record<string, BadgeTone> = {
  PENDING: "steel",
  PROCESSING: "blue",
  READY: "amber",
  SHIPPED: "purple",
  COMPLETED: "green",
  CANCELLED: "red",
};

export const paymentStatusTone: Record<string, BadgeTone> = {
  PENDING: "amber",
  PAID: "green",
  FAILED: "red",
  CANCELLED: "red",
  REFUNDED: "steel",
};

export const postStatusTone: Record<string, BadgeTone> = {
  DRAFT: "steel",
  PUBLISHED: "lime",
};

export const productStatusTone: Record<string, BadgeTone> = {
  DRAFT: "steel",
  ACTIVE: "green",
  ARCHIVED: "amber",
};

export function AdminBadge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: ReactNode;
}) {
  return <span className={`admin-status ${toneClass[tone]}`}>{children}</span>;
}