import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { jobs, currentJob } = useApp();

  const job = currentJob || jobs.find(j => j.id === jobId);

  if (!job) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold truncate">{job.listingName}</h1>
            <p className="text-sm text-muted-foreground">Processing</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Animated processing icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-warning/20 border-t-warning"
            />
            
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-4 border-primary/20 border-b-primary"
            />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Enhancing Your Photos</h2>
          <p className="text-muted-foreground mb-2">
            Our AI is working its magic on your {job.photoCount} photos
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            This usually takes 15-30 minutes
          </p>

          {/* Progress steps */}
          <div className="w-full max-w-xs mx-auto space-y-4 text-left">
            {[
              { label: "Uploading photos", status: "complete" },
              { label: "HDR processing", status: "active" },
              { label: "Color correction", status: "pending" },
              { label: "Quality check", status: "pending" },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.status === "complete" 
                    ? "bg-success" 
                    : step.status === "active"
                    ? "bg-warning animate-pulse"
                    : "bg-muted"
                }`}>
                  {step.status === "complete" ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : step.status === "active" ? (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span className={`text-sm ${
                  step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Notification hint */}
          <div className="mt-8 p-4 bg-primary-light rounded-xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-primary text-left">
                We'll notify you when your photos are ready
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="px-5 py-6 pb-10">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="w-full h-14 text-base font-semibold rounded-xl"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ProcessingScreen;
