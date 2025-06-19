
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";
import CalorieTracker from "@/components/CalorieTracker";
import BodyMetrics from "@/components/BodyMetrics";
import WorkoutLogger from "@/components/WorkoutLogger";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSplash, setShowSplash] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("fitnessUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    localStorage.setItem("fitnessUser", JSON.stringify(userData));
    toast({
      title: "Welcome to FitForge! 🔥",
      description: "Your fitness journey starts now - Let's forge your best self!",
    });
  };

  if (showSplash) {
    return <AnimatedSplashScreen onComplete={handleSplashComplete} />;
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/c39fd28d-6214-413d-ab66-7abee848d281.png" 
              alt="FitForge Logo" 
              className="h-16 w-auto mr-3"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}! 🔥
          </h1>
          <p className="text-blue-200">Forge your fitness destiny today</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-blue-600">Dashboard</TabsTrigger>
            <TabsTrigger value="calories" className="text-white data-[state=active]:bg-blue-600">Calories</TabsTrigger>
            <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-blue-600">Metrics</TabsTrigger>
            <TabsTrigger value="workouts" className="text-white data-[state=active]:bg-blue-600">Workouts</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard user={user} />
          </TabsContent>

          <TabsContent value="calories">
            <CalorieTracker user={user} />
          </TabsContent>

          <TabsContent value="metrics">
            <BodyMetrics user={user} />
          </TabsContent>

          <TabsContent value="workouts">
            <WorkoutLogger user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
