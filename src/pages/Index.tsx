
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

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("fitnessUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    localStorage.setItem("fitnessUser", JSON.stringify(userData));
    toast({
      title: "Welcome to FitTrack! 🎉",
      description: "Your fitness journey starts now!",
    });
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! 💪
          </h1>
          <p className="text-gray-600">Let's crush your fitness goals today</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
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
