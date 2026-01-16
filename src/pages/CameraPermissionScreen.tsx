import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraPermissionScreen = () => {
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    
    // Simulate permission request
    // In production, would use Capacitor camera permission API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRequesting(false);
    navigate("/capture");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Close button */}
      <div className="flex-shrink-0 px-5 pt-12">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <X className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-28 h-28 rounded-3xl bg-primary-light flex items-center justify-center mb-8"
        >
          <Camera className="w-14 h-14 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold mb-3">Camera Access Required</h1>
          <p className="text-muted-foreground mb-8">
            LensCasa needs access to your camera to capture high-quality photos of your property listings.
          </p>
        </motion.div>

        {/* Permission benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full space-y-3 mb-8"
        >
          {[
            { icon: Camera, text: "Capture HDR bracket photos" },
            { icon: Shield, text: "Photos stay on your device until uploaded" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-muted rounded-xl text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 py-6 pb-10"
      >
        <Button
          onClick={handleRequestPermission}
          disabled={isRequesting}
          className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover"
        >
          {isRequesting ? "Requesting..." : "Allow Camera Access"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          You can change this later in your device settings
        </p>
      </motion.div>
    </div>
  );
};

export default CameraPermissionScreen;
