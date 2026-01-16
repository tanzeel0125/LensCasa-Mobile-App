import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CameraView } from "@/components/CameraView";
import { useApp } from "@/contexts/AppContext";

const CaptureScreen = () => {
  const navigate = useNavigate();
  const { capturedPhotos, addPhotos } = useApp();
  const [showCamera, setShowCamera] = useState(true);

  const handleCapture = useCallback((photos: string[]) => {
    const newPhotos = photos.map((url, i) => ({
      id: `photo-${Date.now()}-${i}`,
      url,
    }));
    addPhotos(newPhotos);
  }, [addPhotos]);

  const handleClose = () => {
    if (capturedPhotos.length > 0) {
      navigate("/capture-review");
    } else {
      navigate("/dashboard");
    }
  };

  if (showCamera) {
    return (
      <CameraView
        onCapture={handleCapture}
        onClose={handleClose}
        capturedCount={capturedPhotos.length}
      />
    );
  }

  return null;
};

export default CaptureScreen;
