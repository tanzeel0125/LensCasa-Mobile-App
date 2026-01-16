import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Camera, FileX, WifiOff, Clock, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "no-jobs" | "offline" | "error" | "no-results";
}

const variantIcons = {
  default: <FileX className="w-12 h-12 text-muted-foreground/50" />,
  "no-jobs": <Camera className="w-12 h-12 text-primary/50" />,
  offline: <WifiOff className="w-12 h-12 text-muted-foreground/50" />,
  error: <AlertCircle className="w-12 h-12 text-destructive/50" />,
  "no-results": <Clock className="w-12 h-12 text-muted-foreground/50" />,
};

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  variant = "default",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="mb-4">
      {icon || variantIcons[variant]}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-xs">
      {description}
    </p>
    {action && (
      <Button onClick={action.onClick} className="w-full max-w-xs">
        {action.label}
      </Button>
    )}
  </div>
);
