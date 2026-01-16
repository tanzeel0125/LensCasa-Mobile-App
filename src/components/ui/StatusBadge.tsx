import { cn } from "@/lib/utils";

export type JobStatus = "queued" | "uploading" | "processing" | "complete" | "error";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  queued: {
    label: "Queued",
    className: "bg-muted text-muted-foreground",
  },
  uploading: {
    label: "Uploading",
    className: "bg-info-light text-info",
  },
  processing: {
    label: "Processing",
    className: "bg-warning-light text-warning",
  },
  complete: {
    label: "Complete",
    className: "bg-success-light text-success",
  },
  error: {
    label: "Error",
    className: "bg-destructive-light text-destructive",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {status === "processing" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      )}
      {status === "uploading" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      )}
      {config.label}
    </span>
  );
};
