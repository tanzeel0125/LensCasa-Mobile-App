import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Screens
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import DashboardScreen from "./pages/DashboardScreen";
import CreateJobScreen from "./pages/CreateJobScreen";
import CameraPermissionScreen from "./pages/CameraPermissionScreen";
import CaptureScreen from "./pages/CaptureScreen";
import CaptureReviewScreen from "./pages/CaptureReviewScreen";
import UploadScreen from "./pages/UploadScreen";
import ProcessingScreen from "./pages/ProcessingScreen";
import CompletedJobScreen from "./pages/CompletedJobScreen";
import VideoPreviewScreen from "./pages/VideoPreviewScreen";
import ProfileScreen from "./pages/ProfileScreen";
import BillingScreen from "./pages/BillingScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/create-job" element={<CreateJobScreen />} />
            <Route path="/camera-permission" element={<CameraPermissionScreen />} />
            <Route path="/capture" element={<CaptureScreen />} />
            <Route path="/capture-review" element={<CaptureReviewScreen />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/job/:jobId/processing" element={<ProcessingScreen />} />
            <Route path="/job/:jobId/complete" element={<CompletedJobScreen />} />
            <Route path="/video/:videoId" element={<VideoPreviewScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/billing" element={<BillingScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
