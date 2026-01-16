import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Plus, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoGrid } from "@/components/PhotoGrid";
import { useApp } from "@/contexts/AppContext";
import { EmptyState } from "@/components/ui/EmptyState";

const CaptureReviewScreen = () => {
  const navigate = useNavigate();
  const { capturedPhotos, removePhoto, clearPhotos, currentJob } = useApp();

  const handleRetake = (photoId: string) => {
    removePhoto(photoId);
    // In production, would open camera for retake
  };

  const handleAddMore = () => {
    navigate("/capture");
  };

  const handleContinue = () => {
    navigate("/upload");
  };

  const handleDiscard = () => {
    clearPhotos();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/capture")}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div>
              <h1 className="text-xl font-semibold">Review Photos</h1>
              {currentJob && (
                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                  {currentJob.listingName}
                </p>
              )}
            </div>
          </div>

          {capturedPhotos.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDiscard}
              className="text-destructive text-sm font-medium flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Discard
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-4 overflow-auto">
        {capturedPhotos.length === 0 ? (
          <EmptyState
            variant="no-results"
            title="No photos captured"
            description="Start capturing photos of your property to continue."
            action={{
              label: "Open Camera",
              onClick: () => navigate("/capture"),
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Photo count */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {capturedPhotos.length} photo{capturedPhotos.length !== 1 ? "s" : ""} captured
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Tap to retake
              </span>
            </div>

            {/* Photo grid */}
            <PhotoGrid
              photos={capturedPhotos}
              onRetake={handleRetake}
            />

            {/* Tip */}
            <div className="mt-4 p-3 bg-primary-light rounded-xl">
              <p className="text-xs text-primary">
                <strong>Tip:</strong> Capture at least 15-20 photos for best results. Include all rooms, exterior, and key features.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 py-4 pb-8 bg-background border-t border-border"
      >
        <div className="flex gap-3">
          <Button
            onClick={handleAddMore}
            variant="outline"
            className="flex-1 h-14 text-base font-semibold rounded-xl gap-2"
          >
            <Plus className="w-5 h-5" />
            Add More
          </Button>
          <Button
            onClick={handleContinue}
            disabled={capturedPhotos.length === 0}
            className="flex-1 h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CaptureReviewScreen;
