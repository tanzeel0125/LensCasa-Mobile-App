import { motion } from "framer-motion";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { StatusBadge, JobStatus } from "@/components/ui/StatusBadge";
import { formatDistanceToNow } from "date-fns";

export interface Job {
  id: string;
  listingName: string;
  status: JobStatus;
  photoCount: number;
  thumbnailUrl?: string;
  updatedAt: Date;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-4 text-left transition-shadow hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
        {job.thumbnailUrl ? (
          <img 
            src={job.thumbnailUrl} 
            alt={job.listingName}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate mb-1">
          {job.listingName}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StatusBadge status={job.status} />
        </div>
        <p className="text-caption text-xs">
          {job.photoCount} photos · Updated {formatDistanceToNow(job.updatedAt, { addSuffix: true })}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </motion.button>
  );
};
