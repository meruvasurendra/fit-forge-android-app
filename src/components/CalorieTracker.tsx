
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Upload, Calculator } from "lucide-react";

const CalorieTracker = ({ user }) => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayMacros, setTodayMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [foodEntries, setFoodEntries] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" });
  const [foodQuantity, setFoodQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("weight"); // "weight" or "count"
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const calorieGoal = 2000;
  const macroGoals = { protein: 150, carbs: 250, fats: 67 };

  useEffect(() => {
    const saved = localStorage.getItem("todayCalories");
    const savedMacros = localStorage.getItem("todayMacros");
    const savedEntries = localStorage.getItem("foodEntries");
    
    if (saved) {
      setTodayCalories(parseInt(saved));
    }
    if (savedMacros) {
      setTodayMacros(JSON.parse(savedMacros));
    }
    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        // Here you would integrate with an image recognition API
        // For now, we'll simulate the process
        analyzeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock response - in real app, this would come from an AI service
      setNewFood({
        name: "Mixed Salad Bowl",
        calories: "280",
        protein: "15",
        carbs: "25",
        fats: "18"
      });
      setIsAnalyzing(false);
      toast({
        title: "Image analyzed! 📸",
        description: "Nutritional info has been estimated",
      });
    }, 2000);
  };

  const calculateMacrosFromName = () => {
    if (!newFood.name || !foodQuantity) {
      toast({
        title: "Please enter food name and quantity",
        variant: "destructive",
      });
      return;
    }

    // Enhanced food database with count-based items
    const mockNutrition = {
      // Weight-based foods (per 100g)
      "chicken breast": { calories: 165, protein: 31, carbs: 0, fats: 3.6, unit: "weight" },
      "brown rice": { calories: 112, protein: 2.6, carbs: 23, fats: 0.9, unit: "weight" },
      "apple": { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, unit: "weight" },
      "banana": { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, unit: "weight" },
      "salmon": { calories: 208, protein: 25, carbs: 0, fats: 12, unit: "weight" },
      
      // Count-based foods (per piece/item)
      "egg": { calories: 70, protein: 6, carbs: 0.6, fats: 5, unit: "count" },
      "slice of bread": { calories: 80, protein: 3, carbs: 15, fats: 1, unit: "count" },
      "medium apple": { calories: 95, protein: 0.5, carbs: 25, fats: 0.3, unit: "count" },
      "medium banana": { calories: 105, protein: 1.3, carbs: 27, fats: 0.4, unit: "count" },
    };

    const foodKey = newFood.name.toLowerCase();
    const nutrition = mockNutrition[foodKey];
    
    if (!nutrition) {
      // Default estimation
      const defaultNutrition = { calories: 100, protein: 5, carbs: 20, fats: 3, unit: "weight" };
      const quantity = parseFloat(foodQuantity);
      const multiplier = quantityType === "weight" ? quantity / 100 : quantity;
      
      setNewFood({
        name: newFood.name,
        calories: Math.round(defaultNutrition.calories * multiplier).toString(),
        protein: Math.round(defaultNutrition.protein * multiplier).toString(),
        carbs: Math.round(defaultNutrition.carbs * multiplier).toString(),
        fats: Math.round(defaultNutrition.fats * multiplier).toString()
      });
    } else {
      // Use database nutrition
      const quantity = parseFloat(foodQuantity);
      let multiplier;
      
      if (nutrition.unit === "count") {
        multiplier = quantity; // Direct multiplication for count-based items
        setQuantityType("count");
      } else {
        multiplier = quantity / 100; // Per 100g for weight-based items
        setQuantityType("weight");
      }

      setNewFood({
        name: newFood.name,
        calories: Math.round(nutrition.calories * multiplier).toString(),
        protein: Math.round(nutrition.protein * multiplier).toString(),
        carbs: Math.round(nutrition.carbs * multiplier).toString(),
        fats: Math.round(nutrition.fats * multiplier).toString()
      });
    }

    const unitText = quantityType === "count" ? "pieces" : "grams";
    toast({
      title: "Macros calculated! 🧮",
      description: `Based on ${foodQuantity} ${unitText} of ${newFood.name}`,
    });
  };

  const addFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "Please fill in food name and calories",
        variant: "destructive",
      });
      return;
    }

    const calories = parseInt(newFood.calories);
    const protein = parseInt(newFood.protein) || 0;
    const carbs = parseInt(newFood.carbs) || 0;
    const fats = parseInt(newFood.fats) || 0;

    const entry = {
      id: Date.now(),
      name: newFood.name,
      calories,
      protein,
      carbs,
      fats,
      time: new Date().toLocaleTimeString(),
    };

    const newEntries = [...foodEntries, entry];
    const newTotal = todayCalories + calories;
    const newMacros = {
      protein: todayMacros.protein + protein,
      carbs: todayMacros.carbs + carbs,
      fats: todayMacros.fats + fats
    };

    setFoodEntries(newEntries);
    setTodayCalories(newTotal);
    setTodayMacros(newMacros);
    setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    setFoodWeight("");
    setSelectedImage(null);

    // Save to localStorage
    localStorage.setItem("todayCalories", newTotal.toString());
    localStorage.setItem("todayMacros", JSON.stringify(newMacros));
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));

    toast({
      title: "Food added! 🍎",
      description: `Added ${calories} calories and macros`,
    });
  };

  const removeFood = (id) => {
    const entryToRemove = foodEntries.find(entry => entry.id === id);
    const newEntries = foodEntries.filter(entry => entry.id !== id);
    const newTotal = todayCalories - entryToRemove.calories;
    const newMacros = {
      protein: todayMacros.protein - entryToRemove.protein,
      carbs: todayMacros.carbs - entryToRemove.carbs,
      fats: todayMacros.fats - entryToRemove.fats
    };

    setFoodEntries(newEntries);
    setTodayCalories(newTotal);
    setTodayMacros(newMacros);

    localStorage.setItem("todayCalories", newTotal.toString());
    localStorage.setItem("todayMacros", JSON.stringify(newMacros));
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));

    toast({
      title: "Food removed",
      description: `Removed ${entryToRemove.calories} calories`,
    });
  };

  const caloriesRemaining = calorieGoal - todayCalories;

  return (
    <div className="space-y-6">
      {/* Calorie & Macro Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Today's Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-2xl font-bold">{todayCalories}</div>
                <div className="opacity-80">Consumed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{calorieGoal}</div>
                <div className="opacity-80">Goal</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{caloriesRemaining}</div>
                <div className="opacity-80">Remaining</div>
              </div>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${Math.min((todayCalories / calorieGoal) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Today's Macros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-lg font-bold">{todayMacros.protein}g</div>
                <div className="opacity-80">Protein</div>
                <div className="text-xs">Goal: {macroGoals.protein}g</div>
              </div>
              <div>
                <div className="text-lg font-bold">{todayMacros.carbs}g</div>
                <div className="opacity-80">Carbs</div>
                <div className="text-xs">Goal: {macroGoals.carbs}g</div>
              </div>
              <div>
                <div className="text-lg font-bold">{todayMacros.fats}g</div>
                <div className="opacity-80">Fats</div>
                <div className="text-xs">Goal: {macroGoals.fats}g</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Food with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Food & Calculate Macros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="image">Image Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input
                    id="food-name"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    placeholder="e.g., Chicken breast, Egg"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="food-quantity">Quantity</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="food-quantity"
                      type="number"
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
                      placeholder="e.g., 150g or 2 pieces"
                    />
                    <Button
                      onClick={calculateMacrosFromName}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Calculator className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter weight (grams) or count (pieces) based on food type
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                    placeholder="150"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newFood.protein}
                    onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                    placeholder="25"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newFood.carbs}
                    onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                    placeholder="30"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fats">Fats (g)</Label>
                  <Input
                    id="fats"
                    type="number"
                    value={newFood.fats}
                    onChange={(e) => setNewFood({ ...newFood, fats: e.target.value })}
                    placeholder="10"
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                    Upload a photo of your meal
                  </span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-sm text-gray-500 mt-2">
                  AI will analyze the image and estimate nutritional values
                </p>
              </div>
              
              {isAnalyzing && (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Analyzing image...</p>
                </div>
              )}
              
              {selectedImage && !isAnalyzing && newFood.name && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Analysis Complete!</h4>
                  <p className="text-sm text-green-700">
                    Detected: <strong>{newFood.name}</strong> - {newFood.calories} calories
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={addFood}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Add Food
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Food List with Macro Details */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {foodEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No food entries yet today.</p>
              <p className="text-sm mt-2">Start tracking your nutrition above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {foodEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-lg">{entry.name}</div>
                      <div className="text-sm text-gray-500 mb-2">{entry.time}</div>
                      
                      {/* Enhanced Macro Display */}
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="bg-red-100 px-3 py-2 rounded-lg text-center">
                          <div className="font-bold text-red-600">{entry.calories}</div>
                          <div className="text-xs text-red-500">Calories</div>
                        </div>
                        <div className="bg-purple-100 px-3 py-2 rounded-lg text-center">
                          <div className="font-bold text-purple-600">{entry.protein}g</div>
                          <div className="text-xs text-purple-500">Protein</div>
                        </div>
                        <div className="bg-blue-100 px-3 py-2 rounded-lg text-center">
                          <div className="font-bold text-blue-600">{entry.carbs}g</div>
                          <div className="text-xs text-blue-500">Carbs</div>
                        </div>
                        <div className="bg-amber-100 px-3 py-2 rounded-lg text-center">
                          <div className="font-bold text-amber-600">{entry.fats}g</div>
                          <div className="text-xs text-amber-500">Fats</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFood(entry.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
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
