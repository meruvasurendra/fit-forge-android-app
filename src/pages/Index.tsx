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
import GoalSetting from "@/components/GoalSetting";
import NutritionInsights from "@/components/NutritionInsights";
import SocialFeatures from "@/components/SocialFeatures";
import NotificationCenter from "@/components/NotificationCenter";
import ProfileCustomization from "@/components/ProfileCustomization";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import Auth from "@/components/Auth";
import SmartDietPlanner from "@/components/SmartDietPlanner";

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
      title: "Welcome to FitForge! 🔥",
      description: `Welcome ${userData.name || 'back'}! Your fitness journey continues.`,
    });
  };

  const handleOnboardingComplete = (userData) => {
    // Save user with additional auth info
    const completeUserData = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      loginMethod: 'onboarding'
    };
    
    setUser(completeUserData);
    setIsAuthenticated(true);
    localStorage.setItem("fitnessUser", JSON.stringify(completeUserData));
    
    // Also save to users list for future logins
    const savedUsers = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    savedUsers.push(completeUserData);
    localStorage.setItem('fitforge_users', JSON.stringify(savedUsers));
    
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

  // Show auth screen if user is not authenticated
  if (!isAuthenticated) {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  // Show onboarding if user doesn't have complete profile data
  if (!user || !user.name || !user.age) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/5075fe22-87bd-4d70-96f9-0931d4711feb.png" 
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
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6 bg-slate-800/80 border border-slate-600 rounded-lg p-1 backdrop-blur-sm">
            <TabsTrigger 
              value="dashboard" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="calories" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Calories
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="workouts" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Workouts
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Nutrition
            </TabsTrigger>
            <TabsTrigger 
              value="diet-planner" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Diet Plan
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Social
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="text-white text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/50"
            >
              Profile
            </TabsTrigger>
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
