import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useApp } from "@/contexts/AppContext";
import { NetworkOfflineBanner } from "@/components/ui/ErrorState";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { jobs, setCurrentJob, isOnline, user } = useApp();

  const handleJobClick = (job: typeof jobs[0]) => {
    setCurrentJob(job);
    if (job.status === "complete") {
      navigate(`/job/${job.id}/complete`);
    } else if (job.status === "processing") {
      navigate(`/job/${job.id}/processing`);
    } else if (job.status === "uploading") {
      navigate(`/job/${job.id}/upload`);
    } else {
      navigate(`/job/${job.id}`);
    }
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Offline banner */}
      {!isOnline && <NetworkOfflineBanner />}

      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Welcome back,
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-foreground"
            >
              {user?.name || "User"}
            </motion.h1>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <User className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Create button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={handleCreateJob}
            className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Job
          </Button>
        </motion.div>
      </div>

      {/* Jobs list */}
      <div className="flex-1 px-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Jobs</h2>
          <span className="text-sm text-muted-foreground">{jobs.length} total</span>
        </div>

        {jobs.length === 0 ? (
          <EmptyState
            variant="no-jobs"
            title="No jobs yet"
            description="Capture your first property photos and get stunning professional results."
            action={{
              label: "Create Your First Job",
              onClick: handleCreateJob,
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <JobCard job={job} onClick={() => handleJobClick(job)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
