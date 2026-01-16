import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, CreditCard, LogOut, ChevronRight, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      icon: Crown,
      label: "Subscription",
      description: user?.subscriptionStatus === "active" ? "Active" : "Not active",
      action: () => navigate("/billing"),
      accent: true,
    },
    {
      icon: CreditCard,
      label: "Billing History",
      description: "View past transactions",
      action: () => navigate("/billing"),
    },
    {
      icon: Clock,
      label: "Processing History",
      description: "View all completed jobs",
      action: () => navigate("/dashboard"),
    },
  ];

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
          <h1 className="text-xl font-semibold">Profile & Settings</h1>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate">{user?.name || "User"}</h2>
            <p className="text-sm text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
          </div>
        </motion.div>
      </div>

      {/* Menu items */}
      <div className="flex-1 px-5">
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.action}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${
                item.accent 
                  ? "bg-primary-light hover:bg-primary-light/80" 
                  : "bg-card hover:bg-muted border border-border"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                item.accent ? "bg-primary/10" : "bg-muted"
              }`}>
                <item.icon className={`w-5 h-5 ${item.accent ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 py-6 pb-10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 text-base font-semibold rounded-xl text-destructive hover:text-destructive hover:bg-destructive-light border-destructive/20 gap-2"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
