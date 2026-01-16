import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: "default" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const variantClasses = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
};

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export const ProgressBar = ({
  progress,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={animated ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
          className={cn("h-full rounded-full", variantClasses[variant])}
        />
      </div>
    </div>
  );
};

interface UploadProgressProps {
  uploaded: number;
  total: number;
  currentFile?: string;
}

export const UploadProgress = ({ uploaded, total, currentFile }: UploadProgressProps) => {
  const progress = total > 0 ? (uploaded / total) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Uploading {uploaded} of {total} files
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <ProgressBar progress={progress} variant="info" size="lg" animated />
      {currentFile && (
        <p className="text-xs text-muted-foreground truncate">
          {currentFile}
        </p>
      )}
    </div>
  );
};
