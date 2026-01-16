import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Job } from "@/components/JobCard";
import { JobStatus } from "@/components/ui/StatusBadge";

interface Photo {
  id: string;
  url: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: "active" | "inactive" | "trial";
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Jobs
  jobs: Job[];
  currentJob: Job | null;
  
  // Capture session
  capturedPhotos: Photo[];
  isCapturing: boolean;
  
  // Upload
  uploadProgress: { uploaded: number; total: number } | null;
  isUploading: boolean;
  
  // Network
  isOnline: boolean;
}

interface AppContextType extends AppState {
  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  
  // Job actions
  createJob: (listingName: string) => Job;
  setCurrentJob: (job: Job | null) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  
  // Capture actions
  addPhotos: (photos: Photo[]) => void;
  removePhoto: (photoId: string) => void;
  clearPhotos: () => void;
  setIsCapturing: (capturing: boolean) => void;
  
  // Upload actions
  startUpload: () => Promise<void>;
  
  // Utility
  setIsOnline: (online: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

// Mock data
const mockJobs: Job[] = [
  {
    id: "1",
    listingName: "Modern Villa on Sunset Blvd",
    status: "complete",
    photoCount: 24,
    thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "2", 
    listingName: "Downtown Loft Apartment",
    status: "processing",
    photoCount: 18,
    thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: "3",
    listingName: "Beachfront Condo",
    status: "uploading",
    photoCount: 12,
    updatedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ uploaded: number; total: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password.length >= 6) {
      setUser({
        id: "user-1",
        email,
        name: email.split("@")[0],
        subscriptionStatus: "active",
      });
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: "Invalid email or password" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentJob(null);
    setCapturedPhotos([]);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    if (email.includes("@")) {
      return { success: true };
    }
    return { success: false, error: "Please enter a valid email" };
  }, []);

  const createJob = useCallback((listingName: string) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      listingName,
      status: "queued",
      photoCount: 0,
      updatedAt: new Date(),
    };
    setJobs(prev => [newJob, ...prev]);
    setCurrentJob(newJob);
    return newJob;
  }, []);

  const updateJobStatus = useCallback((jobId: string, status: JobStatus) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status, updatedAt: new Date() } : job
      )
    );
    if (currentJob?.id === jobId) {
      setCurrentJob(prev => prev ? { ...prev, status, updatedAt: new Date() } : null);
    }
  }, [currentJob]);

  const addPhotos = useCallback((photos: Photo[]) => {
    setCapturedPhotos(prev => [...prev, ...photos]);
    if (currentJob) {
      setJobs(prev =>
        prev.map(job =>
          job.id === currentJob.id
            ? { ...job, photoCount: job.photoCount + photos.length, updatedAt: new Date() }
            : job
        )
      );
      setCurrentJob(prev => 
        prev ? { ...prev, photoCount: prev.photoCount + photos.length } : null
      );
    }
  }, [currentJob]);

  const removePhoto = useCallback((photoId: string) => {
    setCapturedPhotos(prev => prev.filter(p => p.id !== photoId));
  }, []);

  const clearPhotos = useCallback(() => {
    setCapturedPhotos([]);
  }, []);

  const startUpload = useCallback(async () => {
    if (capturedPhotos.length === 0) return;
    
    setIsUploading(true);
    const total = capturedPhotos.length;
    
    // Simulate upload progress
    for (let i = 0; i <= total; i++) {
      setUploadProgress({ uploaded: i, total });
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (currentJob) {
      updateJobStatus(currentJob.id, "processing");
    }
    
    setIsUploading(false);
    setUploadProgress(null);
    clearPhotos();
  }, [capturedPhotos, currentJob, updateJobStatus, clearPhotos]);

  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    jobs,
    currentJob,
    capturedPhotos,
    isCapturing,
    uploadProgress,
    isUploading,
    isOnline,
    login,
    logout,
    resetPassword,
    createJob,
    setCurrentJob,
    updateJobStatus,
    addPhotos,
    removePhoto,
    clearPhotos,
    setIsCapturing,
    startUpload,
    setIsOnline,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
