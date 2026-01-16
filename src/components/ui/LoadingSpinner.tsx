import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => (
  <div
    className={cn(
      "rounded-full border-primary/20 border-t-primary animate-spin",
      sizeClasses[size],
      className
    )}
  />
);

export const LoadingScreen = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <LoadingSpinner size="lg" />
    <p className="text-muted-foreground text-sm">{message}</p>
  </div>
);

export const LoadingOverlay = ({ message }: { message?: string }) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner size="lg" />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  </div>
);
