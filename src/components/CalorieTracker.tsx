import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Camera, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: 'grams' | 'count';
}

const foodDatabase: FoodItem[] = [
  { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: 'count' },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: 'count' },
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: 'grams' },
  { name: 'Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: 'grams' },
  { name: 'Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5, unit: 'count' },
];

interface FoodEntry {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const CalorieTracker = () => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [foodWeight, setFoodWeight] = useState<number>(0);
  const [foodCount, setFoodCount] = useState<number>(0);

  const handleAddFoodItem = () => {
    if (!selectedFood || (!foodWeight && !foodCount)) {
      toast.error('Please select a food item and enter weight or count');
      return;
    }

    const food = foodDatabase.find(f => f.name === selectedFood);
    if (!food) return;

    let calculatedNutrition;
    if (food.unit === 'count' && foodCount) {
      calculatedNutrition = {
        calories: food.calories * foodCount,
        protein: food.protein * foodCount,
        carbs: food.carbs * foodCount,
        fat: food.fat * foodCount,
      };
    } else if (food.unit === 'grams' && foodWeight) {
      const multiplier = foodWeight / 100;
      calculatedNutrition = {
        calories: food.calories * multiplier,
        protein: food.protein * multiplier,
        carbs: food.carbs * multiplier,
        fat: food.fat * multiplier,
      };
    } else {
      toast.error('Invalid input for selected food type');
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: selectedFood,
      quantity: food.unit === 'count' ? foodCount : foodWeight,
      unit: food.unit === 'count' ? 'pieces' : 'g',
      ...calculatedNutrition
    };

    setFoodEntries([...foodEntries, newEntry]);
    setSelectedFood('');
    setFoodCount(0);
    setFoodWeight(0);
    toast.success(`Added ${selectedFood} to your log!`);
  };

  const handleImageUpload = () => {
    toast.info('Image upload feature coming soon!');
  };

  const removeFoodEntry = (id: number) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
    toast.success('Food entry removed!');
  };

  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = foodEntries.reduce((sum, entry) => sum + entry.fat, 0);

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Food
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleImageUpload}
              variant="outline"
              className="h-20 border-dashed"
            >
              <Camera className="h-6 w-6 mr-2" />
              Upload Food Image
            </Button>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="food-select">Select Food Item</Label>
                <Select value={selectedFood} onValueChange={setSelectedFood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a food item" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodDatabase.map((food) => (
                      <SelectItem key={food.name} value={food.name}>
                        {food.name} ({food.unit === 'count' ? 'per piece' : 'per 100g'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFood && (
                <div>
                  {foodDatabase.find(f => f.name === selectedFood)?.unit === 'count' ? (
                    <div>
                      <Label htmlFor="food-count">Count</Label>
                      <Input
                        id="food-count"
                        type="number"
                        value={foodCount}
                        onChange={(e) => setFoodCount(Number(e.target.value))}
                        placeholder="Enter number of pieces"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="food-weight">Weight (grams)</Label>
                      <Input
                        id="food-weight"
                        type="number"
                        value={foodWeight}
                        onChange={(e) => setFoodWeight(Number(e.target.value))}
                        placeholder="Enter weight in grams"
                      />
                    </div>
                  )}
                </div>
              )}

              <Button onClick={handleAddFoodItem} className="w-full">
                Add Food Item
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalCalories.toFixed(0)}</div>
              <div className="text-sm text-blue-600">Calories</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalProtein.toFixed(1)}g</div>
              <div className="text-sm text-red-600">Protein</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{totalCarbs.toFixed(1)}g</div>
              <div className="text-sm text-yellow-600">Carbs</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalFat.toFixed(1)}g</div>
              <div className="text-sm text-green-600">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Entries */}
      {foodEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Food Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {foodEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-sm text-gray-600">
                      {entry.quantity} {entry.unit}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                      <span className="text-blue-600">{entry.calories.toFixed(0)} cal</span>
                      <span className="text-red-600">{entry.protein.toFixed(1)}g protein</span>
                      <span className="text-yellow-600">{entry.carbs.toFixed(1)}g carbs</span>
                      <span className="text-green-600">{entry.fat.toFixed(1)}g fat</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFoodEntry(entry.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalorieTracker;
