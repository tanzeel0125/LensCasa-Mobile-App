import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image, Video, Download, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { useApp } from "@/contexts/AppContext";

const mockPhotos = [
  {
    id: "1",
    before: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=60&sat=-100",
    after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90",
  },
  {
    id: "2",
    before: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=60&sat=-100",
    after: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90",
  },
  {
    id: "3",
    before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=60&sat=-100",
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90",
  },
];

const mockVideos = [
  { id: "1", thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", title: "Property Tour" },
  { id: "2", thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", title: "Exterior Walkthrough" },
];

const CompletedJobScreen = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { jobs, currentJob } = useApp();
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const job = currentJob || jobs.find(j => j.id === jobId);

  if (!job) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold truncate">{job.listingName}</h1>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-success">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-5 mb-4 h-12 bg-muted rounded-xl p-1">
          <TabsTrigger 
            value="photos" 
            className="flex-1 h-full rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Image className="w-4 h-4" />
            Photos ({mockPhotos.length})
          </TabsTrigger>
          <TabsTrigger 
            value="videos" 
            className="flex-1 h-full rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Video className="w-4 h-4" />
            Videos ({mockVideos.length})
          </TabsTrigger>
        </TabsList>

        {/* Photos tab */}
        <TabsContent value="photos" className="flex-1 px-5 pb-4 mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Before/After slider */}
            <BeforeAfterSlider
              beforeImage={mockPhotos[selectedPhotoIndex].before}
              afterImage={mockPhotos[selectedPhotoIndex].after}
            />

            {/* Thumbnail selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {mockPhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-offset-2 ring-offset-background transition-all ${
                    selectedPhotoIndex === index ? "ring-primary" : "ring-transparent"
                  }`}
                >
                  <img
                    src={photo.after}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Videos tab */}
        <TabsContent value="videos" className="flex-1 px-5 pb-4 mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {mockVideos.map((video) => (
              <motion.button
                key={video.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/video/${video.id}`)}
                className="w-full relative aspect-video rounded-xl overflow-hidden bg-muted"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">{video.title}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Bottom action */}
      <div className="px-5 py-4 pb-8 border-t border-border">
        <Button
          className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover gap-2"
        >
          <Download className="w-5 h-5" />
          Download All Media
        </Button>
      </div>
    </div>
  );
};

export default CompletedJobScreen;
