import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const MobileLayout = ({ 
  children, 
  className = "",
  animate = true 
}: MobileLayoutProps) => {
  const content = (
    <div className={`min-h-screen w-full max-w-md mx-auto bg-background relative overflow-hidden ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  );
};

interface ScreenProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Screen = ({ children, className = "", noPadding = false }: ScreenProps) => (
  <div 
    className={`flex flex-col min-h-screen ${noPadding ? "" : "px-5 pt-12 pb-6"} ${className}`}
  >
    {children}
  </div>
);

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export const Header = ({ 
  title, 
  subtitle,
  leftAction, 
  rightAction,
  transparent = false 
}: HeaderProps) => (
  <div className={`flex items-center justify-between h-14 ${transparent ? "" : "bg-background"}`}>
    <div className="w-12 flex justify-start">
      {leftAction}
    </div>
    <div className="flex-1 text-center">
      {title && <h1 className="text-subtitle font-semibold">{title}</h1>}
      {subtitle && <p className="text-caption">{subtitle}</p>}
    </div>
    <div className="w-12 flex justify-end">
      {rightAction}
    </div>
  </div>
);

export const BottomSafeArea = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border px-5 py-4 pb-8 ${className}`}>
    {children}
  </div>
);
