import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";
import CalorieTracker from "@/components/CalorieTracker";
import BodyMetrics from "@/components/BodyMetrics";
import WorkoutLogger from "@/components/WorkoutLogger";
import GoalSetting from "@/components/GoalSetting";
import NutritionInsights from "@/components/NutritionInsights";
import SocialFeatures from "@/components/SocialFeatures";
import NotificationCenter from "@/components/NotificationCenter";
import ProfileCustomization from "@/components/ProfileCustomization";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import Auth from "@/components/Auth";
import SmartDietPlanner from "@/components/SmartDietPlanner";
import SwipeableMenuGrid from "@/components/SwipeableMenuGrid";

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("fitnessUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuthComplete = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("fitnessUser", JSON.stringify(userData));
    toast({
      title: "Welcome to FitForge!",
      description: `Welcome ${userData.name || "back"}! Your fitness journey continues.`,
    });
  };

  const handleOnboardingComplete = (userData) => {
    const completeUserData = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      loginMethod: "onboarding",
    };

    setUser(completeUserData);
    setIsAuthenticated(true);
    localStorage.setItem("fitnessUser", JSON.stringify(completeUserData));

    const savedUsers = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
    savedUsers.push(completeUserData);
    localStorage.setItem("fitforge_users", JSON.stringify(savedUsers));

    toast({
      title: "Welcome to FitForge! 🔥",
      description: "Your fitness journey starts now - Let's forge your best self!",
    });
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (showSplash) {
    return <AnimatedSplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  if (!user || !user.name || !user.age) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <img
              src="/lovable-uploads/b58cc98a-369c-41f7-9039-63696829d8f7.png"
              alt="FitForge Logo"
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Welcome back, {user.name}! 🔥
          </h1>
          <p className="text-blue-200 text-sm">Forge your fitness destiny today</p>
        </header>

        <SwipeableMenuGrid activeTab={activeTab} onTabChange={setActiveTab} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

          <TabsContent value="goals">
            <GoalSetting user={user} />
          </TabsContent>

          <TabsContent value="nutrition">
            <NutritionInsights user={user} />
          </TabsContent>

          <TabsContent value="diet-planner">
            <SmartDietPlanner user={user} />
          </TabsContent>

          <TabsContent value="social">
            <SocialFeatures user={user} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter user={user} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileCustomization user={user} onUpdateUser={handleUpdateUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
