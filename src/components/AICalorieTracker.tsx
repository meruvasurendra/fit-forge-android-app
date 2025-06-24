
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Loader2, Brain, Utensils, TrendingUp } from "lucide-react";

interface AICalorieTrackerProps {
  user: any;
}

const AICalorieTracker = ({ user }: AICalorieTrackerProps) => {
  const [newFood, setNewFood] = useState({ name: "", mealType: "breakfast" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  
  const { 
    foodEntries, 
    isLoading, 
    addFoodEntry 
  } = useRealtimeData(user.id);

  const handleAddFood = async () => {
    if (!newFood.name.trim()) {
      toast({
        title: "Please enter a food item",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      await addFoodEntry(newFood.name, newFood.mealType);
      setNewFood({ name: "", mealType: "breakfast" });
      toast({
        title: "Food analyzed! 🧠",
        description: "AI has calculated accurate nutrition data",
      });
    } catch (error) {
      toast({
        title: "Error analyzing food",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const todayEntries = foodEntries.filter(entry => {
    const today = new Date().toISOString().split('T')[0];
    return entry.date === today;
  });

  const todayStats = todayEntries.reduce((acc, entry) => ({
    calories: acc.calories + (entry.calories || 0),
    protein: acc.protein + (entry.protein || 0),
    carbs: acc.carbs + (entry.carbs || 0),
    fats: acc.fats + (entry.fats || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const mealGroups = todayEntries.reduce((groups, entry) => {
    const meal = entry.meal_type || 'other';
    if (!groups[meal]) groups[meal] = [];
    groups[meal].push(entry);
    return groups;
  }, {} as Record<string, any[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading your nutrition data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Stats Overview */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI-Powered Nutrition Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(todayStats.calories)}</div>
              <div className="text-sm opacity-80">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(todayStats.protein)}g</div>
              <div className="text-sm opacity-80">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(todayStats.carbs)}g</div>
              <div className="text-sm opacity-80">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(todayStats.fats)}g</div>
              <div className="text-sm opacity-80">Fats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Food with AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Add Food (AI Analysis)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="food-name">Food Item</Label>
              <Input
                id="food-name"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                placeholder="e.g., 2 slices of whole wheat bread with peanut butter"
                className="mt-1"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <Label>Meal Type</Label>
              <Select
                value={newFood.mealType}
                onValueChange={(value) => setNewFood({ ...newFood, mealType: value })}
                disabled={isAnalyzing}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleAddFood} 
            disabled={isAnalyzing || !newFood.name.trim()}
            className="mt-4 w-full md:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                AI Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(mealGroups).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No meals logged today</p>
              <p className="text-sm mt-2">Add your first meal above to get AI-powered nutrition analysis!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(mealGroups).map(([mealType, foods]) => (
                <div key={mealType} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 capitalize flex items-center">
                    {mealType}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({foods.reduce((sum, food) => sum + (food.calories || 0), 0)} cal)
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {foods.map((food) => (
                      <div key={food.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{food.food_name}</span>
                          {food.ai_analyzed && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              AI Analyzed
                            </span>
                          )}
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-semibold">{food.calories} cal</div>
                          <div className="text-gray-500">
                            P: {Math.round(food.protein || 0)}g | C: {Math.round(food.carbs || 0)}g | F: {Math.round(food.fats || 0)}g
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AICalorieTracker;
