import { statusLabels } from "@/features/projects/schema";
export function StatusBadge({ status }: { status: keyof typeof statusLabels }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}><span aria-hidden="true" />{statusLabels[status]}</span>;
}
