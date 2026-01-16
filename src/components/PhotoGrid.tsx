import { motion } from "framer-motion";
import { X, RotateCcw } from "lucide-react";

interface Photo {
  id: string;
  url: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onRemove?: (id: string) => void;
  onRetake?: (id: string) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelect?: (id: string) => void;
}

export const PhotoGrid = ({
  photos,
  onRemove,
  onRetake,
  selectable = false,
  selectedIds = [],
  onSelect,
}: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="relative aspect-square rounded-lg overflow-hidden bg-muted"
        >
          <img
            src={photo.url}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Selection overlay */}
          {selectable && (
            <button
              onClick={() => onSelect?.(photo.id)}
              className={`absolute inset-0 flex items-center justify-center transition-colors ${
                selectedIds.includes(photo.id)
                  ? "bg-primary/40"
                  : "bg-transparent"
              }`}
            >
              {selectedIds.includes(photo.id) && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">
                    {selectedIds.indexOf(photo.id) + 1}
                  </span>
                </div>
              )}
            </button>
          )}

          {/* Action buttons */}
          {(onRemove || onRetake) && !selectable && (
            <div className="absolute top-1 right-1 flex gap-1">
              {onRetake && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRetake(photo.id)}
                  className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                </motion.button>
              )}
              {onRemove && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemove(photo.id)}
                  className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </motion.button>
              )}
            </div>
          )}

          {/* Photo number */}
          <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <span className="text-white text-[10px] font-medium">{index + 1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
