import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check, Zap, ZapOff } from "lucide-react";

interface CameraViewProps {
  onCapture: (photos: string[]) => void;
  onClose: () => void;
  capturedCount: number;
}

export const CameraView = ({ onCapture, onClose, capturedCount }: CameraViewProps) => {
  const [isLevelGuideOn, setIsLevelGuideOn] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [levelStatus, setLevelStatus] = useState<"good" | "adjust">("good");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated level detection
  const checkLevel = useCallback(() => {
    // In real app, this would use device motion sensors
    setLevelStatus(Math.random() > 0.3 ? "good" : "adjust");
  }, []);

  const handleCapture = async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    setShowFlash(true);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Simulate capture delay (in real app, would capture 3 bracketed JPGs)
    setTimeout(() => {
      setShowFlash(false);
      // Return mock captured photos (3 exposure brackets)
      const mockPhotos = [
        `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80`,
      ];
      onCapture(mockPhotos);
      setIsCapturing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera Viewport */}
      <div className="flex-1 relative">
        {/* Mock camera feed - in production would use actual camera */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="Camera preview"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Flash overlay */}
        <AnimatePresence>
          {showFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Level Guide Overlay */}
        {isLevelGuideOn && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
            </div>
            
            {/* Horizon line */}
            <motion.div 
              className={`absolute left-4 right-4 top-1/2 h-0.5 rounded-full ${
                levelStatus === "good" ? "bg-success" : "bg-warning"
              }`}
              animate={{ 
                rotate: levelStatus === "good" ? 0 : (Math.random() - 0.5) * 4 
              }}
            />

            {/* Level indicator */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  levelStatus === "good" 
                    ? "bg-success/90 text-success-foreground" 
                    : "bg-warning/90 text-warning-foreground"
                }`}
              >
                {levelStatus === "good" ? "Level is good" : "Adjust angle"}
              </motion.div>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
            <span className="text-white text-sm font-medium">
              {capturedCount} photos
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLevelGuideOn(!isLevelGuideOn)}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            {isLevelGuideOn ? (
              <Zap className="w-5 h-5 text-primary" />
            ) : (
              <ZapOff className="w-5 h-5 text-white/60" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="bg-black/90 backdrop-blur-lg px-6 py-8 pb-12">
        <div className="flex items-center justify-center gap-16">
          {/* Shutter button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            disabled={isCapturing}
            className="relative"
          >
            {/* Outer ring */}
            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
              {/* Inner button */}
              <motion.div
                animate={{ scale: isCapturing ? 0.85 : 1 }}
                className="w-16 h-16 rounded-full bg-white"
              />
            </div>
          </motion.button>
        </div>

        <p className="text-center text-white/60 text-xs mt-4">
          Tap to capture · Hold phone level
        </p>
      </div>
    </div>
  );
};
