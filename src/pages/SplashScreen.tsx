import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simulate checking auth and subscription status
    const timer = setTimeout(() => {
      setIsChecking(false);
      if (isAuthenticated) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        {/* Camera icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="12" width="40" height="28" rx="4" stroke="white" strokeWidth="3"/>
            <circle cx="24" cy="26" r="8" stroke="white" strokeWidth="3"/>
            <circle cx="24" cy="26" r="3" fill="white"/>
            <rect x="16" y="8" width="16" height="4" rx="2" fill="white"/>
            <circle cx="37" cy="18" r="2" fill="white"/>
          </svg>
        </motion.div>

        {/* Brand name */}
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          LensCasa
        </h1>
        <p className="text-white/70 text-sm">
          Real Estate Media, Perfected
        </p>
      </motion.div>

      {/* Loading indicator */}
      {isChecking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20"
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15 
                }}
                className="w-2 h-2 rounded-full bg-white"
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SplashScreen;
