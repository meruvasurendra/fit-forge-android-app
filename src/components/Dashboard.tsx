
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState({
    todayCalories: 0,
    calorieGoal: 2000,
    currentWeight: parseFloat(user.weight) || 0,
    targetWeight: parseFloat(user.weight) - 5 || 0,
    workoutsThisWeek: 0,
    workoutGoal: 5,
  });

  const [weightData, setWeightData] = useState([]);
  const [calorieData, setCalorieData] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const savedCalories = localStorage.getItem("todayCalories");
    const savedWeight = localStorage.getItem("currentWeight");
    const savedWorkouts = localStorage.getItem("workoutsThisWeek");
    const savedWeightData = localStorage.getItem("weightData");
    const savedCalorieData = localStorage.getItem("calorieData");

    if (savedCalories) {
      setDashboardData(prev => ({ ...prev, todayCalories: parseInt(savedCalories) }));
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
    }
  }, []);

  const calorieProgress = (dashboardData.todayCalories / dashboardData.calorieGoal) * 100;
  const workoutProgress = (dashboardData.workoutsThisWeek / dashboardData.workoutGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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
                💡 <strong>Tip:</strong> Consistency is key. Even small daily efforts compound into amazing results!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
