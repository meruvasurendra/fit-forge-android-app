import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Camera, Apple } from "lucide-react";

const CalorieTracker = ({ user }) => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayMacros, setTodayMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [calorieGoal] = useState(2000);
  const [foodEntries, setFoodEntries] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    weight: "",
    count: ""
  });
  const [foodWeight, setFoodWeight] = useState("");
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedCalories = localStorage.getItem("todayCalories");
    const savedMacros = localStorage.getItem("todayMacros");
    const savedEntries = localStorage.getItem("foodEntries");

    if (savedCalories) {
      setTodayCalories(parseInt(savedCalories));
    }
    if (savedMacros) {
      setTodayMacros(JSON.parse(savedMacros));
    }
    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  const foodDatabase = {
    "chicken breast": { calories: 165, protein: 31, carbs: 0, fats: 3.6, unit: "weight" },
    "rice": { calories: 130, protein: 2.7, carbs: 28, fats: 0.3, unit: "weight" },
    "banana": { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, unit: "weight" },
    "eggs": { calories: 70, protein: 6, carbs: 0.6, fats: 5, unit: "count" },
    "bread": { calories: 80, protein: 4, carbs: 14, fats: 1, unit: "count" },
    "apple": { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, unit: "count" },
    "oats": { calories: 389, protein: 16.9, carbs: 66, fats: 6.9, unit: "weight" },
    "milk": { calories: 42, protein: 3.4, carbs: 5, fats: 1, unit: "weight" }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      
      // Simulate image recognition
      setTimeout(() => {
        const recognizedFood = "chicken breast";
        const foodData = foodDatabase[recognizedFood];
        
        if (foodData) {
          setNewFood({
            name: recognizedFood,
            calories: foodData.calories.toString(),
            protein: foodData.protein.toString(),
            carbs: foodData.carbs.toString(),
            fats: foodData.fats.toString(),
            weight: foodData.unit === "weight" ? "100" : "",
            count: foodData.unit === "count" ? "1" : ""
          });
          
          toast({
            title: "Food recognized! 📸",
            description: `Detected: ${recognizedFood}`,
          });
        }
      }, 2000);
    }
  };

  const calculateMacros = () => {
    const selectedFood = foodDatabase[newFood.name.toLowerCase()];
    if (!selectedFood) return;

    let multiplier = 1;
    
    if (selectedFood.unit === "weight" && newFood.weight) {
      multiplier = parseFloat(newFood.weight) / 100;
    } else if (selectedFood.unit === "count" && newFood.count) {
      multiplier = parseFloat(newFood.count);
    }

    const calculatedMacros = {
      calories: Math.round(selectedFood.calories * multiplier),
      protein: Math.round(selectedFood.protein * multiplier * 10) / 10,
      carbs: Math.round(selectedFood.carbs * multiplier * 10) / 10,
      fats: Math.round(selectedFood.fats * multiplier * 10) / 10
    };

    setNewFood(prev => ({
      ...prev,
      calories: calculatedMacros.calories.toString(),
      protein: calculatedMacros.protein.toString(),
      carbs: calculatedMacros.carbs.toString(),
      fats: calculatedMacros.fats.toString()
    }));
  };

  const addFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "Please fill in food details",
        variant: "destructive",
      });
      return;
    }

    const food = {
      id: Date.now(),
      name: newFood.name,
      calories: parseInt(newFood.calories),
      protein: parseFloat(newFood.protein) || 0,
      carbs: parseFloat(newFood.carbs) || 0,
      fats: parseFloat(newFood.fats) || 0,
      weight: newFood.weight ? parseFloat(newFood.weight) : null,
      count: newFood.count ? parseInt(newFood.count) : null,
      timestamp: new Date().toLocaleTimeString()
    };

    const newEntries = [...foodEntries, food];
    const newCalories = todayCalories + food.calories;
    const newMacros = {
      protein: todayMacros.protein + food.protein,
      carbs: todayMacros.carbs + food.carbs,
      fats: todayMacros.fats + food.fats
    };

    setFoodEntries(newEntries);
    setTodayCalories(newCalories);
    setTodayMacros(newMacros);

    localStorage.setItem("todayCalories", newCalories.toString());
    localStorage.setItem("todayMacros", JSON.stringify(newMacros));
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));

    setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "", weight: "", count: "" });
    setUploadedImage(null);
    setIsImageUpload(false);

    toast({
      title: "Food added! 🍽️",
      description: `${food.name} - ${food.calories} calories`,
    });
  };

  const removeFood = (id) => {
    const foodToRemove = foodEntries.find(food => food.id === id);
    if (!foodToRemove) return;

    const newEntries = foodEntries.filter(food => food.id !== id);
    const newCalories = todayCalories - foodToRemove.calories;
    const newMacros = {
      protein: Math.max(0, todayMacros.protein - foodToRemove.protein),
      carbs: Math.max(0, todayMacros.carbs - foodToRemove.carbs),
      fats: Math.max(0, todayMacros.fats - foodToRemove.fats)
    };

    setFoodEntries(newEntries);
    setTodayCalories(newCalories);
    setTodayMacros(newMacros);

    localStorage.setItem("todayCalories", newCalories.toString());
    localStorage.setItem("todayMacros", JSON.stringify(newMacros));
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));
  };

  const calorieProgress = (todayCalories / calorieGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="w-6 h-6" />
            Today's Nutrition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold">{todayCalories}</div>
            <div className="text-sm opacity-80">of {calorieGoal} calories</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{todayMacros.protein}g</div>
              <div className="text-xs opacity-80">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{todayMacros.carbs}g</div>
              <div className="text-xs opacity-80">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{todayMacros.fats}g</div>
              <div className="text-xs opacity-80">Fats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Food */}
      <Card>
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={!isImageUpload ? "default" : "outline"}
              onClick={() => setIsImageUpload(false)}
              size="sm"
            >
              Manual Entry
            </Button>
            <Button
              variant={isImageUpload ? "default" : "outline"}
              onClick={() => setIsImageUpload(true)}
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Image Upload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isImageUpload ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="food-image">Upload Food Image</Label>
                <Input
                  id="food-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
              </div>
              {uploadedImage && (
                <div className="text-center">
                  <img
                    src={uploadedImage}
                    alt="Uploaded food"
                    className="max-w-48 max-h-48 mx-auto rounded-lg border"
                  />
                  <p className="text-sm text-gray-600 mt-2">Analyzing image...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Food Item</Label>
                <Select
                  value={newFood.name}
                  onValueChange={(value) => {
                    setNewFood({ ...newFood, name: value });
                    const selectedFood = foodDatabase[value.toLowerCase()];
                    if (selectedFood) {
                      if (selectedFood.unit === "weight") {
                        setNewFood(prev => ({ ...prev, name: value, weight: "100", count: "" }));
                      } else {
                        setNewFood(prev => ({ ...prev, name: value, count: "1", weight: "" }));
                      }
                    }
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select food item" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(foodDatabase).map((food) => (
                      <SelectItem key={food} value={food}>
                        {food.charAt(0).toUpperCase() + food.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newFood.name && foodDatabase[newFood.name.toLowerCase()]?.unit === "weight" && (
                <div>
                  <Label htmlFor="weight">Weight (grams)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newFood.weight}
                    onChange={(e) => setNewFood({ ...newFood, weight: e.target.value })}
                    onBlur={calculateMacros}
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
              )}

              {newFood.name && foodDatabase[newFood.name.toLowerCase()]?.unit === "count" && (
                <div>
                  <Label htmlFor="count">Count</Label>
                  <Input
                    id="count"
                    type="number"
                    value={newFood.count}
                    onChange={(e) => setNewFood({ ...newFood, count: e.target.value })}
                    onBlur={calculateMacros}
                    placeholder="1"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          )}

          {(newFood.calories || newFood.protein || newFood.carbs || newFood.fats) && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Nutritional Information:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>Calories: {newFood.calories}</div>
                <div>Protein: {newFood.protein}g</div>
                <div>Carbs: {newFood.carbs}g</div>
                <div>Fats: {newFood.fats}g</div>
              </div>
            </div>
          )}

          <Button onClick={addFood} className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Food
          </Button>
        </CardContent>
      </Card>

      {/* Food Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Food Log</CardTitle>
        </CardHeader>
        <CardContent>
          {foodEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No food logged yet today.</p>
              <p className="text-sm mt-2">Add your first meal above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {foodEntries.map((food) => (
                <div key={food.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg capitalize">{food.name}</h4>
                      <div className="text-sm text-gray-500">
                        {food.weight ? `${food.weight}g` : `${food.count} piece(s)`} • {food.timestamp}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFood(food.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">{food.calories}</div>
                      <div className="text-xs text-blue-500">Calories</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-purple-600">{food.protein}g</div>
                      <div className="text-xs text-purple-500">Protein</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-orange-600">{food.carbs}g</div>
                      <div className="text-xs text-orange-500">Carbs</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">{food.fats}g</div>
                      <div className="text-xs text-green-500">Fats</div>
                    </div>
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
