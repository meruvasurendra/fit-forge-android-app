
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
    amount: "",
    unit: "quantity"
  });
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
                         "chicken breast variant 1": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 2": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 3": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 4": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 5": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 6": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 7": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 8": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 9": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 10": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 11": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 12": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 13": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 14": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 15": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 16": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 17": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 18": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 19": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 20": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 21": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 22": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 23": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 24": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 25": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 26": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 27": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 28": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 29": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 30": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 31": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 32": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 33": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 34": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 35": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 36": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 37": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 38": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 39": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 40": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 41": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 42": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 43": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 44": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 45": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 46": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 47": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 48": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 49": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 50": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 51": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 52": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 53": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 54": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 55": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 56": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 57": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 58": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 59": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 60": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 61": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 62": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 63": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 64": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 65": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 66": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 67": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 68": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 69": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 70": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 71": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 72": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 73": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 74": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 75": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 76": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 77": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 78": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 79": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 80": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 81": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 82": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 83": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 84": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 85": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 86": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 87": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 88": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 89": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 90": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 91": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 92": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 93": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 94": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 95": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 96": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 97": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 98": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 99": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 100": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 101": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 102": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 103": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 104": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 105": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 106": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 107": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 108": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 109": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 110": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 111": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 112": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 113": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 114": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 115": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 116": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 117": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 118": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 119": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 120": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 121": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 122": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 123": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 124": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 125": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 126": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 127": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 128": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 129": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 130": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 131": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 132": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 133": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 134": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 135": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 136": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 137": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 138": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 139": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 140": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 141": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 142": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 143": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 144": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 145": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 146": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 147": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 148": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 149": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 150": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 151": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 152": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 153": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 154": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 155": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 156": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 157": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 158": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 159": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 160": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 161": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 162": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 163": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 164": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 165": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 166": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 167": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 168": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 169": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 170": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 171": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 172": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 173": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 174": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 175": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 176": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 177": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 178": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 179": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 180": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 181": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 182": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 183": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 184": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 185": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 186": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 187": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 188": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 189": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 190": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 191": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 192": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 193": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 194": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 195": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 196": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 197": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 198": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 199": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 200": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 201": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 202": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 203": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 204": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 205": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 206": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 207": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 208": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 209": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 210": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 211": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 212": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 213": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 214": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 215": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 216": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 217": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 218": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 219": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 220": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 221": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 222": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 223": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 224": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 225": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 226": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 227": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 228": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 229": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 230": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 231": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 232": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 233": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 234": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 235": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 236": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 237": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 238": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 239": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 240": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 241": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 242": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 243": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 244": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 245": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 246": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 247": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 248": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 249": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 250": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 251": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 252": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 253": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 254": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 255": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 256": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 257": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 258": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 259": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 260": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 261": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 262": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 263": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 264": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 265": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 266": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 267": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 268": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 269": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 270": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 271": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 272": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 273": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 274": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 275": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 276": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 277": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 278": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 279": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 280": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 281": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 282": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 283": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 284": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 285": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 286": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 287": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 288": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 289": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 290": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 291": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 292": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 293": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 294": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 295": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 296": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 297": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 298": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 299": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 300": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 301": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 302": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 303": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 304": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 305": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 306": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 307": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 308": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 309": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 310": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 311": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 312": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 313": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 314": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 315": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 316": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 317": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 318": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 319": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 320": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 321": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 322": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 323": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 324": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 325": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 326": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 327": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 328": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 329": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 330": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 331": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 332": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 333": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 334": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 335": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 336": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 337": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 338": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 339": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 340": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 341": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 342": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 343": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 344": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 345": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 346": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 347": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 348": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 349": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 350": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 351": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 352": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 353": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 354": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 355": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 356": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 357": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 358": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 359": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 360": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 361": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 362": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 363": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 364": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 365": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 366": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 367": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 368": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 369": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 370": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 371": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 372": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 373": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 374": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 375": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 376": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 377": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 378": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 379": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 380": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 381": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 382": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 383": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 384": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 385": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 386": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 387": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 388": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 389": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 390": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 391": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 392": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 393": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 394": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 395": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 396": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 397": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 398": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 399": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 400": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 401": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 402": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 403": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 404": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 405": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 406": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 407": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 408": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 409": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 410": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 411": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 412": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 413": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 414": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 415": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 416": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 417": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 418": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 419": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 420": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 421": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 422": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 423": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 424": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 425": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 426": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 427": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 428": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 429": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 430": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 431": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 432": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 433": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 434": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 435": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 436": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 437": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 438": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 439": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 440": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 441": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 442": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 443": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 444": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 445": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 446": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 447": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 448": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 449": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 450": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 451": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 452": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 453": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 454": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 455": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 456": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 457": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 458": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 459": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 460": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 461": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 462": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 463": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 464": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 465": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 466": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 467": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 468": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 469": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 470": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 471": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 472": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 473": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 474": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 475": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 476": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 477": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 478": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 479": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 480": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 481": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 482": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 483": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 484": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 485": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 486": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 487": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 488": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 489": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 490": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 491": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 492": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 493": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 494": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 495": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 496": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 497": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 498": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 499": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 500": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 501": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 502": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 503": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 504": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 505": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 506": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 507": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 508": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 509": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 510": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 511": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 512": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 513": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 514": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 515": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 516": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 517": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 518": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 519": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 520": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 521": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 522": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 523": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 524": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 525": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 526": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 527": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 528": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 529": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 530": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 531": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 532": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 533": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 534": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 535": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 536": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 537": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 538": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 539": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 540": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 541": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 542": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 543": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 544": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 545": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 546": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 547": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 548": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 549": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 550": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 551": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 552": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 553": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 554": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 555": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 556": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 557": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 558": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 559": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 560": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 561": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 562": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 563": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 564": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 565": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 566": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 567": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 568": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 569": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 570": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 571": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 572": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 573": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 574": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 575": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 576": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 577": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 578": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 579": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 580": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 581": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 582": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 583": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 584": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 585": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 586": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 587": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 588": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 589": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 590": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 591": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 592": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 593": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 594": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 595": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 596": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 597": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 598": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 599": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 600": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 601": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 602": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 603": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 604": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 605": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 606": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 607": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 608": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 609": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 610": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 611": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 612": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 613": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 614": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 615": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 616": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 617": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 618": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 619": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 620": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 621": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 622": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 623": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 624": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 625": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 626": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 627": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 628": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 629": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 630": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 631": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 632": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 633": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 634": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 635": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 636": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 637": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 638": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 639": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 640": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 641": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 642": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 643": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 644": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 645": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 646": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 647": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 648": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 649": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 650": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 651": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 652": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 653": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 654": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 655": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 656": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 657": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 658": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 659": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 660": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 661": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 662": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 663": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 664": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 665": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 666": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 667": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 668": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 669": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 670": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 671": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 672": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 673": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 674": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 675": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 676": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 677": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 678": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 679": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 680": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 681": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 682": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 683": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 684": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 685": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 686": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 687": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 688": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 689": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 690": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 691": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 692": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 693": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 694": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 695": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 696": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 697": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 698": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 699": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 700": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 701": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 702": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 703": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 704": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 705": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 706": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 707": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 708": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 709": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 710": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 711": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 712": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 713": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 714": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 715": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 716": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 717": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 718": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 719": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 720": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 721": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 722": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 723": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 724": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 725": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 726": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 727": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 728": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 729": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 730": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 731": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 732": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 733": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 734": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 735": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 736": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 737": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 738": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 739": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 740": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 741": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 742": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 743": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 744": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 745": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 746": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 747": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 748": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 749": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 750": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 751": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 752": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 753": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 754": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 755": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 756": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 757": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 758": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 759": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 760": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 761": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 762": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 763": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 764": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 765": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 766": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 767": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 768": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 769": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 770": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 771": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 772": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 773": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 774": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 775": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 776": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 777": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 778": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 779": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 780": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 781": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 782": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 783": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 784": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 785": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 786": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 787": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 788": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 789": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 790": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 791": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 792": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 793": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 794": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 795": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 796": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 797": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 798": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 799": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 800": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 801": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 802": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 803": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 804": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 805": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 806": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 807": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 808": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 809": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 810": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 811": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 812": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 813": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 814": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 815": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 816": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 817": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 818": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 819": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 820": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 821": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 822": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 823": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 824": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 825": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 826": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 827": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 828": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 829": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 830": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 831": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 832": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 833": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 834": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 835": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 836": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 837": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 838": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 839": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 840": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 841": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 842": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 843": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 844": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 845": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 846": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 847": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 848": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 849": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 850": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 851": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 852": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 853": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 854": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 855": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 856": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 857": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 858": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 859": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 860": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 861": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 862": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 863": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 864": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 865": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 866": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 867": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 868": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 869": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 870": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 871": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 872": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 873": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 874": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 875": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 876": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 877": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 878": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 879": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 880": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 881": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 882": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 883": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 884": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 885": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 886": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 887": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 888": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 889": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 890": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 891": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 892": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 893": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 894": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 895": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 896": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 897": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 898": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 899": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 900": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 901": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 902": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 903": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 904": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 905": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 906": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 907": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 908": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 909": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 910": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 911": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 912": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 913": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 914": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 915": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 916": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 917": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 918": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 919": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 920": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 921": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 922": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 923": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 924": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 925": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 926": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 927": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 928": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 929": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 930": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 931": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 932": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 933": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 934": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 935": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 936": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 937": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 938": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 939": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 940": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 941": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 942": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 943": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 944": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 945": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 946": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 947": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 948": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 949": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 950": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 951": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 952": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 953": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 954": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 955": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 956": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 957": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 958": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 959": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 960": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 961": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 962": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 963": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 964": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 965": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 966": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 967": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 968": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 969": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 970": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 971": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 972": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 973": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 974": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 975": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 976": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 977": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 978": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 979": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 980": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 981": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 982": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 983": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 984": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 985": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 986": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 987": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 988": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 989": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 990": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         },
                         "chicken breast variant 991": {
                           "calories": 165,
                           "protein": 31,
                           "carbs": 0,
                           "fats": 3.6,
                           "per100g": true
                         },
                         "rice variant 992": {
                           "calories": 130,
                           "protein": 2.7,
                           "carbs": 28,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "banana variant 993": {
                           "calories": 89,
                           "protein": 1.1,
                           "carbs": 23,
                           "fats": 0.3,
                           "per100g": true
                         },
                         "eggs variant 994": {
                           "calories": 70,
                           "protein": 6,
                           "carbs": 0.6,
                           "fats": 5,
                           "per100g": false
                         },
                         "bread variant 995": {
                           "calories": 80,
                           "protein": 4,
                           "carbs": 14,
                           "fats": 1,
                           "per100g": false
                         },
                         "apple variant 996": {
                           "calories": 52,
                           "protein": 0.3,
                           "carbs": 14,
                           "fats": 0.2,
                           "per100g": false
                         },
                         "oats variant 997": {
                           "calories": 389,
                           "protein": 16.9,
                           "carbs": 66,
                           "fats": 6.9,
                           "per100g": true
                         },
                         "milk variant 998": {
                           "calories": 42,
                           "protein": 3.4,
                           "carbs": 5,
                           "fats": 1,
                           "per100g": true
                         },
                         "beef variant 999": {
                           "calories": 250,
                           "protein": 26,
                           "carbs": 0,
                           "fats": 15,
                           "per100g": true
                         },
                         "salmon variant 1000": {
                           "calories": 208,
                           "protein": 20,
                           "carbs": 0,
                           "fats": 13,
                           "per100g": true
                         }
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
            amount: foodData.per100g ? "100" : "1",
            unit: foodData.per100g ? "weight" : "quantity"
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
    if (!selectedFood || !newFood.amount) return;

    let multiplier = 1;
    const amount = parseFloat(newFood.amount);

    if (newFood.unit === "weight") {
      multiplier = amount / 100; // Per 100g
    } else {
      multiplier = amount; // Per piece/quantity
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
      amount: parseFloat(newFood.amount),
      unit: newFood.unit,
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

    setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "", amount: "", unit: "quantity" });
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="food-name">Food Item</Label>
                  <Input
                    id="food-name"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    placeholder="Enter food name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newFood.amount}
                    onChange={(e) => setNewFood({ ...newFood, amount: e.target.value })}
                    onBlur={calculateMacros}
                    placeholder={newFood.unit === "weight" ? "100" : "1"}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Unit</Label>
                  <Select
                    value={newFood.unit}
                    onValueChange={(value) => setNewFood({ ...newFood, unit: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quantity">Quantity (pieces)</SelectItem>
                      <SelectItem value="weight">Weight (grams)</SelectItem>
                    </SelectContent>
                  </Select>
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
                    placeholder="0"
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
                    placeholder="0"
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
                    placeholder="0"
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
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
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
                        {food.amount} {food.unit === "weight" ? "g" : "pc(s)"} • {food.timestamp}
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
