
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChefHat, Calendar, Leaf, AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react";

interface MealEntry {
  id: string;
  day: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories: number;
  isVegetarian: boolean;
}

interface DietSuggestion {
  original: string;
  alternative: string;
  reason: string;
  calories: number;
  isVegetarian: boolean;
}

const SmartDietPlanner = ({ user }) => {
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  const [newMeal, setNewMeal] = useState({
    day: '',
    mealType: 'breakfast' as const,
    food: '',
    calories: ''
  });
  const [suggestions, setSuggestions] = useState<DietSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  useEffect(() => {
    const savedMeals = localStorage.getItem('userMealEntries');
    if (savedMeals) {
      setMealEntries(JSON.parse(savedMeals));
    }
  }, []);

  const addMeal = () => {
    if (!newMeal.day || !newMeal.food || !newMeal.calories) {
      toast({
        title: "Please fill in all meal details",
        variant: "destructive",
      });
      return;
    }

    const meal: MealEntry = {
      id: Date.now().toString(),
      day: newMeal.day,
      mealType: newMeal.mealType,
      food: newMeal.food,
      calories: parseInt(newMeal.calories),
      isVegetarian: isVegetarianFood(newMeal.food)
    };

    const updatedMeals = [...mealEntries, meal];
    setMealEntries(updatedMeals);
    localStorage.setItem('userMealEntries', JSON.stringify(updatedMeals));

    setNewMeal({
      day: '',
      mealType: 'breakfast',
      food: '',
      calories: ''
    });

    toast({
      title: "Meal added! 🍽️",
      description: "Your meal has been logged successfully",
    });
  };

  const deleteMeal = (mealId: string) => {
    const updatedMeals = mealEntries.filter(meal => meal.id !== mealId);
    setMealEntries(updatedMeals);
    localStorage.setItem('userMealEntries', JSON.stringify(updatedMeals));
  };

  const isVegetarianFood = (food: string): boolean => {
    const nonVegKeywords = [
      'chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna', 'meat', 'lamb', 
      'turkey', 'bacon', 'ham', 'sausage', 'prawns', 'shrimp', 'crab'
    ];
    return !nonVegKeywords.some(keyword => 
      food.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const isVegOnlyDay = (day: string): boolean => {
    return user.dietaryPreferences?.vegOnlyDays?.includes(day) || false;
  };

  const analyzeMealsAndSuggest = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const newSuggestions = generateSuggestions();
      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete! 🧠",
        description: `Generated ${newSuggestions.length} personalized suggestions`,
      });
    }, 2000);
  };

  const generateSuggestions = (): DietSuggestion[] => {
    const suggestions: DietSuggestion[] = [];
    const foodDatabase = {
      // Breakfast alternatives
      'oats': { alternatives: ['quinoa porridge', 'chia pudding', 'smoothie bowl'], calories: [150, 200, 250] },
      'bread': { alternatives: ['whole grain toast', 'avocado toast', 'protein pancakes'], calories: [180, 220, 280] },
      'cereal': { alternatives: ['granola', 'muesli', 'overnight oats'], calories: [160, 190, 170] },
      
      // Lunch alternatives
      'rice': { alternatives: ['quinoa', 'brown rice', 'cauliflower rice'], calories: [220, 240, 50] },
      'pasta': { alternatives: ['zucchini noodles', 'whole wheat pasta', 'shirataki noodles'], calories: [30, 200, 20] },
      'sandwich': { alternatives: ['wrap', 'salad bowl', 'lettuce wraps'], calories: [280, 200, 150] },
      
      // Dinner alternatives
      'chicken': { alternatives: ['tofu', 'tempeh', 'lentil patty'], calories: [150, 180, 200] },
      'beef': { alternatives: ['black bean burger', 'mushroom steak', 'jackfruit'], calories: [180, 100, 120] },
      'fish': { alternatives: ['algae protein', 'chickpea salad', 'walnut crusted eggplant'], calories: [160, 180, 200] }
    };

    // Analyze patterns and generate suggestions
    mealEntries.forEach(meal => {
      const mealDay = meal.day;
      const isVegDay = isVegOnlyDay(mealDay);
      
      // Check if non-veg food on veg-only day
      if (isVegDay && !meal.isVegetarian) {
        const vegAlternatives = findVegetarianAlternative(meal.food);
        if (vegAlternatives) {
          suggestions.push({
            original: `${meal.food} on ${mealDay}`,
            alternative: vegAlternatives.food,
            reason: `${mealDay} is marked as vegetarian-only day`,
            calories: vegAlternatives.calories,
            isVegetarian: true
          });
        }
      }

      // General nutritional alternatives
      Object.keys(foodDatabase).forEach(key => {
        if (meal.food.toLowerCase().includes(key)) {
          const alternatives = foodDatabase[key];
          const randomIndex = Math.floor(Math.random() * alternatives.alternatives.length);
          const alternative = alternatives.alternatives[randomIndex];
          const calories = alternatives.calories[randomIndex];
          
          if ((!isVegDay || isVegetarianFood(alternative)) && alternative !== meal.food) {
            suggestions.push({
              original: meal.food,
              alternative: alternative,
              reason: 'Similar nutritional profile with variety',
              calories: calories,
              isVegetarian: isVegetarianFood(alternative)
            });
          }
        }
      });
    });

    // Remove duplicates and limit to top 10
    const uniqueSuggestions = suggestions.filter((suggestion, index, self) =>
      index === self.findIndex(s => s.original === suggestion.original && s.alternative === suggestion.alternative)
    );

    return uniqueSuggestions.slice(0, 10);
  };

  const findVegetarianAlternative = (food: string) => {
    const alternatives = {
      'chicken': { food: 'grilled tofu', calories: 150 },
      'beef': { food: 'black bean patty', calories: 180 },
      'fish': { food: 'tempeh', calories: 160 },
      'salmon': { food: 'walnut crusted portobello', calories: 140 },
      'turkey': { food: 'lentil loaf', calories: 170 },
      'bacon': { food: 'coconut bacon', calories: 90 },
      'ham': { food: 'mushroom ham', calories: 80 }
    };

    for (const [key, value] of Object.entries(alternatives)) {
      if (food.toLowerCase().includes(key)) {
        return value;
      }
    }
    return null;
  };

  const getMealsByDay = (day: string) => {
    return mealEntries.filter(meal => meal.day === day);
  };

  const getDayCalories = (day: string) => {
    return getMealsByDay(day).reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-6 h-6" />
            Smart Diet Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-90">
            Log your regular meals and get personalized alternatives based on your dietary preferences.
            {user.dietaryPreferences?.vegOnlyDays?.length > 0 && (
              <span className="block mt-2 text-sm">
                🌱 Vegetarian days: {user.dietaryPreferences.vegOnlyDays.join(', ')}
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Add New Meal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Log Your Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Day</Label>
              <Select
                value={newMeal.day}
                onValueChange={(value) => setNewMeal({ ...newMeal, day: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>
                      {day} {isVegOnlyDay(day) && '🌱'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Meal Type</Label>
              <Select
                value={newMeal.mealType}
                onValueChange={(value: any) => setNewMeal({ ...newMeal, mealType: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="food">Food Item</Label>
              <Input
                id="food"
                value={newMeal.food}
                onChange={(e) => setNewMeal({ ...newMeal, food: e.target.value })}
                placeholder="e.g., Chicken rice"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                placeholder="300"
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={addMeal} className="mt-4 w-full md:w-auto">
            Add Meal
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Meal Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {daysOfWeek.map(day => (
              <div key={day} className={`border rounded-lg p-4 ${isVegOnlyDay(day) ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">
                    {day} {isVegOnlyDay(day) && <Leaf className="inline w-4 h-4 text-green-600" />}
                  </h4>
                  <span className="text-sm text-gray-600">
                    {getDayCalories(day)} cal
                  </span>
                </div>
                <div className="space-y-1">
                  {getMealsByDay(day).map(meal => (
                    <div key={meal.id} className="flex items-center justify-between text-sm">
                      <span className={`${!meal.isVegetarian && isVegOnlyDay(day) ? 'text-red-600' : 'text-gray-700'}`}>
                        {meal.mealType}: {meal.food}
                        {!meal.isVegetarian && isVegOnlyDay(day) && <AlertCircle className="inline w-3 h-3 ml-1" />}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMeal(meal.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  {getMealsByDay(day).length === 0 && (
                    <span className="text-gray-400 text-sm">No meals logged</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={analyzeMealsAndSuggest} 
            disabled={mealEntries.length === 0 || isAnalyzing}
            className="mt-4 w-full md:w-auto"
          >
            {isAnalyzing ? 'Analyzing...' : 'Get Smart Suggestions'}
          </Button>
        </CardContent>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Personalized Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">Replace:</span>
                        <span className="font-semibold">{suggestion.original}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">With:</span>
                        <span className="font-semibold text-green-600">{suggestion.alternative}</span>
                        {suggestion.isVegetarian && <Leaf className="w-4 h-4 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600">{suggestion.reason}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{suggestion.calories} cal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartDietPlanner;
