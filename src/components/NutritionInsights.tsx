
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Apple, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";

const NutritionInsights = ({ user }) => {
  const [nutritionData, setNutritionData] = useState({
    todayMacros: { protein: 0, carbs: 0, fats: 0, calories: 0 },
    weeklyTrends: [],
    macroGoals: { protein: 150, carbs: 250, fats: 67, calories: 2000 },
    insights: []
  });

  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = () => {
    const savedMacros = localStorage.getItem("todayMacros");
    const savedCalories = localStorage.getItem("todayCalories");
    const foodEntries = JSON.parse(localStorage.getItem("foodEntries") || "[]");

    const todayMacros = savedMacros ? JSON.parse(savedMacros) : { protein: 0, carbs: 0, fats: 0 };
    const calories = savedCalories ? parseInt(savedCalories) : 0;

    // Generate weekly trends (mock data for demo)
    const weeklyTrends = generateWeeklyTrends();
    
    // Calculate macro goals based on user data
    const macroGoals = calculateMacroGoals();
    
    // Generate insights
    const insights = generateInsights(todayMacros, calories, macroGoals);

    setNutritionData({
      todayMacros: { ...todayMacros, calories },
      weeklyTrends,
      macroGoals,
      insights
    });
  };

  const calculateMacroGoals = () => {
    // Calculate based on user's weight, activity level, and goals
    const weight = parseFloat(user.weight) || 70;
    const activityMultiplier = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    }[user.activityLevel] || 1.55;

    let baseCals = weight * 24 * activityMultiplier;

    // Adjust based on fitness goal
    if (user.fitnessGoal === 'weight-loss') {
      baseCals -= 500; // 500 cal deficit
    } else if (user.fitnessGoal === 'muscle-gain') {
      baseCals += 300; // 300 cal surplus
    }

    return {
      calories: Math.round(baseCals),
      protein: Math.round(weight * 2.2), // 2.2g per kg
      carbs: Math.round(baseCals * 0.4 / 4), // 40% of calories
      fats: Math.round(baseCals * 0.3 / 9) // 30% of calories
    };
  };

  const generateWeeklyTrends = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      protein: Math.floor(Math.random() * 50) + 100,
      carbs: Math.floor(Math.random() * 100) + 200,
      fats: Math.floor(Math.random() * 30) + 50,
      calories: Math.floor(Math.random() * 500) + 1800
    }));
  };

  const generateInsights = (macros, calories, goals) => {
    const insights = [];

    // Calorie insight
    const calorieRatio = calories / goals.calories;
    if (calorieRatio < 0.8) {
      insights.push({
        type: 'warning',
        title: 'Low Calorie Intake',
        message: `You're eating ${Math.round((1 - calorieRatio) * 100)}% below your goal. Consider adding healthy snacks.`,
        icon: AlertTriangle
      });
    } else if (calorieRatio > 1.2) {
      insights.push({
        type: 'warning',
        title: 'High Calorie Intake',
        message: `You're ${Math.round((calorieRatio - 1) * 100)}% over your calorie goal for today.`,
        icon: AlertTriangle
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Great Calorie Balance',
        message: 'Your calorie intake is on track with your goals!',
        icon: CheckCircle
      });
    }

    // Protein insight
    const proteinRatio = macros.protein / goals.protein;
    if (proteinRatio < 0.7) {
      insights.push({
        type: 'info',
        title: 'Boost Your Protein',
        message: `Add ${Math.round(goals.protein - macros.protein)}g more protein. Try Greek yogurt, eggs, or lean meat.`,
        icon: Target
      });
    }

    // Macro balance insight
    const totalMacroCalories = (macros.protein * 4) + (macros.carbs * 4) + (macros.fats * 9);
    if (totalMacroCalories > 0) {
      const proteinPercent = (macros.protein * 4) / totalMacroCalories * 100;
      const carbPercent = (macros.carbs * 4) / totalMacroCalories * 100;
      const fatPercent = (macros.fats * 9) / totalMacroCalories * 100;

      if (proteinPercent >= 25 && carbPercent <= 50 && fatPercent <= 35) {
        insights.push({
          type: 'success',
          title: 'Excellent Macro Balance',
          message: 'Your macronutrient distribution is optimal for your goals!',
          icon: CheckCircle
        });
      } else {
        insights.push({
          type: 'info',
          title: 'Macro Balance Tip',
          message: 'Aim for 25-30% protein, 40-45% carbs, and 25-30% fats for optimal results.',
          icon: Target
        });
      }
    }

    return insights;
  };

  const macroData = [
    { name: 'Protein', value: nutritionData.todayMacros.protein, goal: nutritionData.macroGoals.protein, color: '#8b5cf6' },
    { name: 'Carbs', value: nutritionData.todayMacros.carbs, goal: nutritionData.macroGoals.carbs, color: '#06b6d4' },
    { name: 'Fats', value: nutritionData.todayMacros.fats, goal: nutritionData.macroGoals.fats, color: '#f59e0b' },
  ];

  const getInsightColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-50 text-green-700';
      case 'warning': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'info': return 'border-blue-500 bg-blue-50 text-blue-700';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Overview */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="w-6 h-6" />
            Today's Nutrition Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{nutritionData.todayMacros.calories}</div>
              <div className="text-sm opacity-80">Calories</div>
              <div className="text-xs">Goal: {nutritionData.macroGoals.calories}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{nutritionData.todayMacros.protein}g</div>
              <div className="text-sm opacity-80">Protein</div>
              <div className="text-xs">Goal: {nutritionData.macroGoals.protein}g</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{nutritionData.todayMacros.carbs}g</div>
              <div className="text-sm opacity-80">Carbs</div>
              <div className="text-xs">Goal: {nutritionData.macroGoals.carbs}g</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{nutritionData.todayMacros.fats}g</div>
              <div className="text-sm opacity-80">Fats</div>
              <div className="text-xs">Goal: {nutritionData.macroGoals.fats}g</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {macroData.map((macro) => (
          <Card key={macro.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{macro.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2" style={{ color: macro.color }}>
                {macro.value}g
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Goal: {macro.goal}g
              </div>
              <Progress 
                value={(macro.value / macro.goal) * 100} 
                className="h-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((macro.value / macro.goal) * 100)}% of goal
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Personalized Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nutritionData.insights.map((insight, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm mt-1">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Macro Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
              {macroData.map((macro) => (
                <div key={macro.name} className="flex items-center justify-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: macro.color }}
                  ></div>
                  <span>{macro.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={nutritionData.weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="protein" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionInsights;
