
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    fitnessGoal: "",
    activityLevel: "",
    dietaryPreferences: {
      isVegetarian: false,
      vegOnlyDays: [],
      allergies: "",
      preferredMeals: ""
    }
  });

  const steps = [
    {
      title: "Let's get to know you! 👋",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Your age"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Physical Stats 📏",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="Your height in cm"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Your weight in kg"
              className="mt-2"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Fitness Goals 🎯",
      content: (
        <div className="space-y-4">
          <div>
            <Label>Primary fitness goal</Label>
            <Select
              value={formData.fitnessGoal}
              onValueChange={(value) => setFormData({ ...formData, fitnessGoal: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="lose-fat-gain-muscle">Lose Fat and Gain Muscle</SelectItem>
                <SelectItem value="endurance">Improve Endurance</SelectItem>
                <SelectItem value="strength">Build Strength</SelectItem>
                <SelectItem value="general-fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select
              value={formData.activityLevel}
              onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (very hard exercise, physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Dietary Preferences 🍽️",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vegetarian"
              checked={formData.dietaryPreferences.isVegetarian}
              onCheckedChange={(checked) => 
                setFormData({
                  ...formData,
                  dietaryPreferences: { ...formData.dietaryPreferences, isVegetarian: !!checked }
                })
              }
            />
            <Label htmlFor="vegetarian">I follow a vegetarian diet</Label>
          </div>

          <div>
            <Label>Vegetarian-only days (optional)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={formData.dietaryPreferences.vegOnlyDays.includes(day)}
                    onCheckedChange={(checked) => {
                      const vegDays = formData.dietaryPreferences.vegOnlyDays;
                      const updatedDays = checked 
                        ? [...vegDays, day]
                        : vegDays.filter(d => d !== day);
                      setFormData({
                        ...formData,
                        dietaryPreferences: { ...formData.dietaryPreferences, vegOnlyDays: updatedDays }
                      });
                    }}
                  />
                  <Label htmlFor={day} className="text-sm">{day}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="allergies">Food allergies or restrictions</Label>
            <Input
              id="allergies"
              value={formData.dietaryPreferences.allergies}
              onChange={(e) => setFormData({
                ...formData,
                dietaryPreferences: { ...formData.dietaryPreferences, allergies: e.target.value }
              })}
              placeholder="e.g., nuts, dairy, gluten"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="preferredMeals">Favorite meals (optional)</Label>
            <Input
              id="preferredMeals"
              value={formData.dietaryPreferences.preferredMeals}
              onChange={(e) => setFormData({
                ...formData,
                dietaryPreferences: { ...formData.dietaryPreferences, preferredMeals: e.target.value }
              })}
              placeholder="e.g., rice, chicken, salads"
              className="mt-2"
            />
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Process and enhance user data based on their goal
      const enhancedData = enhanceUserData(formData);
      onComplete(enhancedData);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const enhanceUserData = (data) => {
    const weight = parseFloat(data.weight) || 70;
    const height = parseFloat(data.height) || 170;
    const age = parseInt(data.age) || 25;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (data.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    const maintenanceCalories = Math.round(bmr * (activityMultipliers[data.activityLevel] || 1.55));
    
    let targetCalories = maintenanceCalories;
    let workoutPlan = [];

    // Enhanced goal-specific calculations
    switch (data.fitnessGoal) {
      case 'weight-loss':
        targetCalories = maintenanceCalories - 500;
        workoutPlan = ['Cardio 4x/week', 'Strength 2x/week'];
        break;
      case 'muscle-gain':
        targetCalories = maintenanceCalories + 300;
        workoutPlan = ['Strength 5x/week', 'Cardio 2x/week'];
        break;
      case 'lose-fat-gain-muscle':
        // Body recomposition approach
        targetCalories = maintenanceCalories - 200; // Slight deficit
        workoutPlan = [
          'Strength training 4x/week (compound movements)',
          'HIIT cardio 3x/week (20-30 min)',
          'Active recovery 1x/week'
        ];
        break;
      case 'endurance':
        targetCalories = maintenanceCalories + 100;
        workoutPlan = ['Cardio 5x/week', 'Strength 2x/week'];
        break;
      case 'strength':
        targetCalories = maintenanceCalories + 200;
        workoutPlan = ['Strength 5x/week', 'Cardio 1x/week'];
        break;
      default:
        workoutPlan = ['Mixed training 4x/week'];
    }

    return {
      ...data,
      maintenanceCalories,
      targetCalories,
      workoutPlan,
      bmr: Math.round(bmr)
    };
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.name && formData.age && formData.gender;
      case 1:
        return formData.height && formData.weight;
      case 2:
        return formData.fitnessGoal && formData.activityLevel;
      case 3:
        return true; // Dietary preferences are optional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {steps[step].title}
          </CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= step ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {steps[step].content}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
            >
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {step === steps.length - 1 ? "Get Started!" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
