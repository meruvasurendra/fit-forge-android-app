
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const Dashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState({
    todayCalories: 0,
    calorieGoal: 2000,
    currentWeight: parseFloat(user.weight) || 0,
    targetWeight: parseFloat(user.weight) - 5 || 0,
    workoutsThisWeek: 0,
    workoutGoal: 5,
  });

  const [todayMacros, setTodayMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [weightData, setWeightData] = useState([]);
  const [calorieData, setCalorieData] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [activeGoals, setActiveGoals] = useState([]);

  const macroGoals = { protein: 150, carbs: 250, fats: 67 };

  useEffect(() => {
    // Load data from localStorage
    const savedCalories = localStorage.getItem("todayCalories");
    const savedMacros = localStorage.getItem("todayMacros");
    const savedWeight = localStorage.getItem("currentWeight");
    const savedWorkouts = localStorage.getItem("workoutsThisWeek");
    const savedWeightData = localStorage.getItem("weightData");
    const savedCalorieData = localStorage.getItem("calorieData");
    const savedGoals = localStorage.getItem("userGoals");

    if (savedCalories) {
      setDashboardData(prev => ({ ...prev, todayCalories: parseInt(savedCalories) }));
    }
    if (savedMacros) {
      setTodayMacros(JSON.parse(savedMacros));
    }
    if (savedWeight) {
      setDashboardData(prev => ({ ...prev, currentWeight: parseFloat(savedWeight) }));
    }
    if (savedWorkouts) {
      setDashboardData(prev => ({ ...prev, workoutsThisWeek: parseInt(savedWorkouts) }));
    }
    if (savedWeightData) {
      setWeightData(JSON.parse(savedWeightData));
    }
    if (savedCalorieData) {
      setCalorieData(JSON.parse(savedCalorieData));
    } else {
      // Generate sample weekly calorie data
      setCalorieData([
        { day: 'Mon', calories: 1850 },
        { day: 'Tue', calories: 2100 },
        { day: 'Wed', calories: 1950 },
        { day: 'Thu', calories: 2200 },
        { day: 'Fri', calories: 1800 },
        { day: 'Sat', calories: 2300 },
        { day: 'Sun', calories: 2000 }
      ]);
    }

    // Load goals for dashboard display
    if (savedGoals) {
      const goals = JSON.parse(savedGoals);
      setActiveGoals(goals.filter(goal => !goal.completed).slice(0, 3));
    }

    // Set recent achievements
    setRecentAchievements([
      { title: "7-Day Streak", icon: "🔥", date: "Today" },
      { title: "Goal Achieved", icon: "🎯", date: "2 days ago" },
      { title: "New PR", icon: "💪", date: "1 week ago" }
    ]);
  }, []);

  const calorieProgress = (dashboardData.todayCalories / dashboardData.calorieGoal) * 100;
  const workoutProgress = (dashboardData.workoutsThisWeek / dashboardData.workoutGoal) * 100;

  // Prepare macro data for pie chart
  const macroData = [
    { name: 'Protein', value: todayMacros.protein, color: '#8b5cf6' },
    { name: 'Carbs', value: todayMacros.carbs, color: '#06b6d4' },
    { name: 'Fats', value: todayMacros.fats, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {dashboardData.todayCalories}
            </div>
            <div className="text-sm opacity-80">
              Goal: {dashboardData.calorieGoal} cal
            </div>
            <Progress 
              value={calorieProgress} 
              className="mt-2 bg-blue-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {todayMacros.protein}g
            </div>
            <div className="text-sm opacity-80">
              Goal: {macroGoals.protein}g
            </div>
            <Progress 
              value={(todayMacros.protein / macroGoals.protein) * 100} 
              className="mt-2 bg-purple-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {dashboardData.currentWeight} kg
            </div>
            <div className="text-sm opacity-80">
              Target: {dashboardData.targetWeight} kg
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {dashboardData.workoutsThisWeek}
            </div>
            <div className="text-sm opacity-80">
              Goal: {dashboardData.workoutGoal} workouts
            </div>
            <Progress 
              value={workoutProgress} 
              className="mt-2 bg-orange-400"
            />
          </CardContent>
        </Card>
      </div>

      {/* Active Goals & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {activeGoals.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No active goals. Set some in the Goals tab!</p>
            ) : (
              <div className="space-y-3">
                {activeGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{goal.title}</h4>
                      <span className="text-sm text-gray-500">{Math.round((goal.current / goal.target) * 100)}%</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    <div className="text-sm text-gray-600 mt-1">
                      {goal.current} / {goal.target} {goal.unit}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Macros</CardTitle>
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
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Protein</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span>Carbs</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Fats</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fitness Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Fitness Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Goal: {user.fitnessGoal?.replace("-", " ").toUpperCase()}
            </h3>
            <p className="text-gray-600 mb-4">
              Keep pushing towards your goal! Every step counts.
            </p>
            <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg">
              <p className="text-sm">
                💡 <strong>Tip:</strong> Balance your macros: aim for 30% protein, 40% carbs, and 30% fats for optimal results!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
