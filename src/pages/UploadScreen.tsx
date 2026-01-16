import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, WifiOff, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadProgress } from "@/components/ProgressBar";
import { useApp } from "@/contexts/AppContext";

type UploadState = "uploading" | "complete" | "error" | "offline";

const UploadScreen = () => {
  const navigate = useNavigate();
  const { capturedPhotos, uploadProgress, startUpload, isOnline, currentJob } = useApp();
  const [state, setState] = useState<UploadState>("uploading");

  useEffect(() => {
    if (!isOnline) {
      setState("offline");
      return;
    }

    // Start upload automatically
    const upload = async () => {
      try {
        await startUpload();
        setState("complete");
      } catch (error) {
        setState("error");
      }
    };

    upload();
  }, []);

  const handleRetry = () => {
    setState("uploading");
    startUpload().then(() => setState("complete")).catch(() => setState("error"));
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const renderContent = () => {
    switch (state) {
      case "uploading":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Animated upload icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Upload className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">Uploading Photos</h2>
            <p className="text-muted-foreground mb-8">
              You can leave the app — uploads will continue in the background
            </p>

            {/* Progress */}
            {uploadProgress && (
              <div className="w-full max-w-xs mx-auto">
                <UploadProgress
                  uploaded={uploadProgress.uploaded}
                  total={uploadProgress.total}
                />
              </div>
            )}

            {/* Background indicator */}
            <div className="mt-8 p-4 bg-primary-light rounded-xl">
              <p className="text-sm text-primary">
                📱 Uploads continue even when you close the app
              </p>
            </div>
          </motion.div>
        );

      case "complete":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-8 bg-success-light rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-success" />
            </motion.div>

            <h2 className="text-xl font-semibold mb-2">Upload Complete!</h2>
            <p className="text-muted-foreground mb-2">
              {capturedPhotos.length} photos uploaded successfully
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              We're now processing your photos. This usually takes 15-30 minutes.
            </p>

            {/* Job info */}
            {currentJob && (
              <div className="p-4 bg-muted rounded-xl mb-8 text-left">
                <p className="text-sm font-medium">{currentJob.listingName}</p>
                <p className="text-xs text-muted-foreground">Processing started</p>
              </div>
            )}

            <Button
              onClick={handleContinue}
              className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-destructive-light rounded-full flex items-center justify-center">
              <X className="w-12 h-12 text-destructive" />
            </div>

            <h2 className="text-xl font-semibold mb-2">Upload Failed</h2>
            <p className="text-muted-foreground mb-8">
              Some files couldn't be uploaded. Please check your connection and try again.
            </p>

            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retry Upload
              </Button>
              <Button
                onClick={handleContinue}
                variant="outline"
                className="w-full h-14 text-base font-semibold rounded-xl"
              >
                Continue to Dashboard
              </Button>
            </div>
          </motion.div>
        );

      case "offline":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-warning-light rounded-full flex items-center justify-center">
              <WifiOff className="w-12 h-12 text-warning" />
            </div>

            <h2 className="text-xl font-semibold mb-2">You're Offline</h2>
            <p className="text-muted-foreground mb-4">
              Your photos are saved and will upload automatically when you're back online.
            </p>

            <div className="p-4 bg-muted rounded-xl mb-8">
              <p className="text-sm">
                <strong>{capturedPhotos.length}</strong> photos waiting to upload
              </p>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover"
            >
              Continue to Dashboard
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col items-center justify-center px-8">
      {renderContent()}
    </div>
  );
};

export default UploadScreen;
