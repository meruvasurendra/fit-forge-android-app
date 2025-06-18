
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const CalorieTracker = ({ user }) => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", calories: "" });
  const { toast } = useToast();

  const calorieGoal = 2000; // This could be calculated based on user data

  useEffect(() => {
    const saved = localStorage.getItem("todayCalories");
    const savedEntries = localStorage.getItem("foodEntries");
    
    if (saved) {
      setTodayCalories(parseInt(saved));
    }
    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  const addFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const calories = parseInt(newFood.calories);
    const entry = {
      id: Date.now(),
      name: newFood.name,
      calories: calories,
      time: new Date().toLocaleTimeString(),
    };

    const newEntries = [...foodEntries, entry];
    const newTotal = todayCalories + calories;

    setFoodEntries(newEntries);
    setTodayCalories(newTotal);
    setNewFood({ name: "", calories: "" });

    // Save to localStorage
    localStorage.setItem("todayCalories", newTotal.toString());
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));

    toast({
      title: "Food added! 🍎",
      description: `Added ${calories} calories`,
    });
  };

  const removeFood = (id) => {
    const entryToRemove = foodEntries.find(entry => entry.id === id);
    const newEntries = foodEntries.filter(entry => entry.id !== id);
    const newTotal = todayCalories - entryToRemove.calories;

    setFoodEntries(newEntries);
    setTodayCalories(newTotal);

    // Save to localStorage
    localStorage.setItem("todayCalories", newTotal.toString());
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));

    toast({
      title: "Food removed",
      description: `Removed ${entryToRemove.calories} calories`,
    });
  };

  const caloriesRemaining = calorieGoal - todayCalories;

  return (
    <div className="space-y-6">
      {/* Calorie Summary */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Today's Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{todayCalories}</div>
              <div className="text-sm opacity-80">Consumed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{calorieGoal}</div>
              <div className="text-sm opacity-80">Goal</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{caloriesRemaining}</div>
              <div className="text-sm opacity-80">Remaining</div>
            </div>
          </div>
          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${Math.min((todayCalories / calorieGoal) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Food */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Food
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="food-name">Food Name</Label>
              <Input
                id="food-name"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                placeholder="e.g., Apple, Chicken breast"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="food-calories">Calories</Label>
              <Input
                id="food-calories"
                type="number"
                value={newFood.calories}
                onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                placeholder="e.g., 150"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addFood}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Add Food
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {foodEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No food entries yet today.</p>
              <p className="text-sm mt-2">Start tracking your calories above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {foodEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-sm text-gray-500">{entry.time}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-green-600">
                      {entry.calories} cal
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFood(entry.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default CalorieTracker;
