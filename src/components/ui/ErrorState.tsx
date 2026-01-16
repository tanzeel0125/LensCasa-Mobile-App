import { Button } from "@/components/ui/button";
import { AlertCircle, WifiOff, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  type?: "network" | "general" | "session";
  title?: string;
  message?: string;
  onRetry?: () => void;
  onLogin?: () => void;
}

export const ErrorState = ({
  type = "general",
  title,
  message,
  onRetry,
  onLogin,
}: ErrorStateProps) => {
  const getContent = () => {
    switch (type) {
      case "network":
        return {
          icon: <WifiOff className="w-16 h-16 text-muted-foreground/40" />,
          title: title || "No Connection",
          message: message || "Please check your internet connection and try again.",
          action: onRetry ? { label: "Retry", onClick: onRetry } : undefined,
        };
      case "session":
        return {
          icon: <AlertCircle className="w-16 h-16 text-warning/60" />,
          title: title || "Session Expired",
          message: message || "Your session has expired. Please log in again.",
          action: onLogin ? { label: "Log In", onClick: onLogin } : undefined,
        };
      default:
        return {
          icon: <AlertCircle className="w-16 h-16 text-destructive/40" />,
          title: title || "Something went wrong",
          message: message || "An unexpected error occurred. Please try again.",
          action: onRetry ? { label: "Try Again", onClick: onRetry } : undefined,
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="mb-6">{content.icon}</div>
      <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
      <p className="text-muted-foreground mb-8 max-w-xs">{content.message}</p>
      {content.action && (
        <Button onClick={content.action.onClick} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {content.action.label}
        </Button>
      )}
    </div>
  );
};

export const NetworkOfflineBanner = () => (
  <div className="bg-warning-light text-warning px-4 py-3 flex items-center gap-3">
    <WifiOff className="w-5 h-5 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">You're offline</p>
      <p className="text-xs opacity-80">Some features may be unavailable</p>
    </div>
  </div>
);
