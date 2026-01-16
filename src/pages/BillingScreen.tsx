import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, CreditCard, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const BillingScreen = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");

  const plans = {
    monthly: { price: 49, period: "month", savings: null },
    annual: { price: 39, period: "month", savings: "Save 20%" },
  };

  const features = [
    "Unlimited photo processing",
    "HDR enhancement",
    "Virtual staging ready",
    "Video walkthroughs",
    "Priority processing",
  ];

  const transactions = [
    { id: "1", type: "Subscription", date: "Jan 15, 2026", amount: "$49.00", status: "Paid" },
    { id: "2", type: "Subscription", date: "Dec 15, 2025", amount: "$49.00", status: "Paid" },
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsProcessing(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-background flex flex-col">
      <div className="flex-shrink-0 px-5 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-xl font-semibold">Billing</h1>
        </div>
      </div>

      <div className="flex-1 px-5 pb-8 space-y-6">
        {/* Plan selector */}
        <div className="p-4 bg-primary-light rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-primary" />
            <span className="font-semibold">Choose Your Plan</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(["monthly", "annual"] as const).map((plan) => (
              <button key={plan} onClick={() => setSelectedPlan(plan)} className={`p-4 rounded-xl text-left transition-all ${selectedPlan === plan ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-background"}`}>
                <p className="font-semibold">${plans[plan].price}/mo</p>
                <p className="text-xs opacity-80 capitalize">{plan}</p>
                {plans[plan].savings && <span className="text-xs bg-secondary px-2 py-0.5 rounded-full mt-2 inline-block text-secondary-foreground">{plans[plan].savings}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center">
                <Check className="w-3 h-3 text-success" />
              </div>
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </div>

        {/* Transaction history */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Billing History</span>
          </div>
          <div className="space-y-2">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div>
                  <p className="text-sm font-medium">{t.type}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{t.amount}</p>
                  <p className="text-xs text-success">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 pb-8 border-t border-border">
        <Button onClick={handleSubscribe} disabled={isProcessing} className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover">
          {isProcessing ? <LoadingSpinner size="sm" className="border-primary-foreground/20 border-t-primary-foreground" /> : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
};

export default BillingScreen;
