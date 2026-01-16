import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Pause, Download, Share2, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoPreviewScreen = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-black flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4 z-10">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Property Tour</h1>
            <p className="text-sm text-white/60">2:34</p>
          </div>
        </div>
      </div>

      {/* Video player */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Mock video (in production would use actual video) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
            alt="Video frame"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Play/Pause overlay */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayPause}
          className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </motion.button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-6 pb-10 bg-black/90 backdrop-blur-lg">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-xl gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <Maximize className="w-5 h-5" />
            Fullscreen
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-xl gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-xl gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <Share2 className="w-5 h-5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewScreen;
