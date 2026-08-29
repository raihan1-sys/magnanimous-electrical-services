import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({
  kicker,
  title,
  description,
  actions,
}: Props) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="admin-kicker">{kicker}</p>
        <h1 className="admin-title mt-3">{title}</h1>
        {description && (
          <p className="admin-description mt-3">{description}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  );
}