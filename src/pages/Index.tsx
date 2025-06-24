import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";
import AICalorieTracker from "@/components/AICalorieTracker";
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
import ProfileDropdown from "@/components/ProfileDropdown";

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          syncUserProfile(session.user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        syncUserProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncUserProfile = async (authUser) => {
    try {
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (!existingProfile) {
        await supabase
          .from('user_profiles')
          .insert({
            user_id: authUser.id,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            age: 25,
            weight: 70,
            height: 170,
            fitness_goal: 'general-health',
            activity_level: 'moderate'
          });
      }
    } catch (error) {
      console.error('Error syncing user profile:', error);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuthComplete = (userData) => {
    toast({
      title: "Welcome to FitForge! 🔥",
      description: "Your AI-powered fitness journey begins now!",
    });

    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = async (userData) => {
    try {
      await supabase
        .from('user_profiles')
        .update({
          name: userData.name,
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          fitness_goal: userData.fitnessGoal,
          activity_level: userData.activityLevel,
          dietary_preferences: userData.dietaryPreferences || {}
        })
        .eq('user_id', user.id);

      setUser({ ...user, ...userData });

      toast({
        title: "Profile Setup Complete! 🎉",
        description: "AI is now personalizing your fitness experience",
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error saving profile",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
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
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/b58cc98a-369c-41f7-9039-63696829d8f7.png" 
                  alt="FitForge Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Welcome back, {user.name || user.email?.split('@')[0]}! 🔥
                </h1>
                <p className="text-blue-200">AI-Powered Fitness Journey</p>
              </div>
            </div>

            <ProfileDropdown user={user} onLogout={handleLogout} onProfileClick={() => setActiveTab("profile")} />
          </div>
        </header>

        <SwipeableMenuGrid activeTab={activeTab} onTabChange={setActiveTab} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard">
            <Dashboard user={user} />
          </TabsContent>

          <TabsContent value="calories">
            <AICalorieTracker user={user} />
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