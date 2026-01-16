import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Camera, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";

const CreateJobScreen = () => {
  const navigate = useNavigate();
  const { createJob } = useApp();
  
  const [listingName, setListingName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!listingName.trim()) {
      setError("Please enter a listing name");
      return;
    }

    if (listingName.length < 3) {
      setError("Listing name must be at least 3 characters");
      return;
    }

    createJob(listingName.trim());
    navigate("/camera-permission");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-xl font-semibold">New Job</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Start a new capture</h2>
          <p className="text-muted-foreground">
            Enter the property details and we'll guide you through capturing professional-quality photos.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 bg-destructive-light rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Listing name input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Listing Name</label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., Modern Villa on Sunset Blvd"
                value={listingName}
                onChange={(e) => setListingName(e.target.value)}
                className="pl-12 h-14 bg-muted border-0 rounded-xl text-base"
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use the property address or a memorable name
            </p>
          </div>

          {/* Job type info (non-editable for now) */}
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Standard Processing</p>
                <p className="text-xs text-muted-foreground">HDR photos, virtual staging ready</p>
              </div>
              <div className="px-3 py-1 bg-primary-light text-primary text-xs font-medium rounded-full">
                Included
              </div>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Bottom action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 py-6 pb-10"
      >
        <Button
          onClick={handleSubmit}
          disabled={!listingName.trim()}
          className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover gap-2"
        >
          <Camera className="w-5 h-5" />
          Start Capture
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateJobScreen;
