
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";

const BodyMetrics = ({ user }) => {
  const [metrics, setMetrics] = useState({
    weight: parseFloat(user.weight) || 0,
    bodyFat: 0,
  });
  const [newEntry, setNewEntry] = useState({ weight: "", bodyFat: "" });
  const [weightHistory, setWeightHistory] = useState([]);
  const [bodyFatHistory, setBodyFatHistory] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedMetrics = localStorage.getItem("currentMetrics");
    const savedWeightHistory = localStorage.getItem("weightHistory");
    const savedBodyFatHistory = localStorage.getItem("bodyFatHistory");

    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
    if (savedWeightHistory) {
      setWeightHistory(JSON.parse(savedWeightHistory));
    }
    if (savedBodyFatHistory) {
      setBodyFatHistory(JSON.parse(savedBodyFatHistory));
    }
  }, []);

  const addMetrics = () => {
    if (!newEntry.weight && !newEntry.bodyFat) {
      toast({
        title: "Please enter at least one metric",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toLocaleDateString();
    const weight = newEntry.weight ? parseFloat(newEntry.weight) : metrics.weight;
    const bodyFat = newEntry.bodyFat ? parseFloat(newEntry.bodyFat) : metrics.bodyFat;

    const newMetrics = { weight, bodyFat };
    setMetrics(newMetrics);

    // Update histories
    if (newEntry.weight) {
      const newWeightHistory = [...weightHistory, { date: today, weight, bodyFat }];
      setWeightHistory(newWeightHistory);
      localStorage.setItem("weightHistory", JSON.stringify(newWeightHistory));
    }

    if (newEntry.bodyFat) {
      const newBodyFatHistory = [...bodyFatHistory, { date: today, bodyFat, weight }];
      setBodyFatHistory(newBodyFatHistory);
      localStorage.setItem("bodyFatHistory", JSON.stringify(newBodyFatHistory));
    }

    localStorage.setItem("currentMetrics", JSON.stringify(newMetrics));
    localStorage.setItem("currentWeight", weight.toString());
    
    setNewEntry({ weight: "", bodyFat: "" });

    toast({
      title: "Metrics updated! 📊",
      description: "Your progress has been recorded",
    });
  };

  const getWeightTrend = () => {
    if (weightHistory.length < 2) return null;
    const recent = weightHistory[weightHistory.length - 1].weight;
    const previous = weightHistory[weightHistory.length - 2].weight;
    return recent - previous;
  };

  const getBodyFatTrend = () => {
    if (bodyFatHistory.length < 2) return null;
    const recent = bodyFatHistory[bodyFatHistory.length - 1].bodyFat;
    const previous = bodyFatHistory[bodyFatHistory.length - 2].bodyFat;
    return recent - previous;
  };

  const weightTrend = getWeightTrend();
  const bodyFatTrend = getBodyFatTrend();

  return (
    <div className="space-y-6">
      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Weight
              {weightTrend && (
                <span className="flex items-center text-sm">
                  {weightTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(weightTrend).toFixed(1)} kg
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{metrics.weight} kg</div>
            <div className="text-sm opacity-80 mt-2">
              Goal: {parseFloat(user.weight) - 5} kg
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Body Fat %
              {bodyFatTrend && (
                <span className="flex items-center text-sm">
                  {bodyFatTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(bodyFatTrend).toFixed(1)}%
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{metrics.bodyFat}%</div>
            <div className="text-sm opacity-80 mt-2">
              {user.gender === "male" ? "Healthy: 10-20%" : "Healthy: 16-30%"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Update Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={newEntry.weight}
                onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                placeholder="e.g., 70.5"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bodyFat">Body Fat (%)</Label>
              <Input
                id="bodyFat"
                type="number"
                step="0.1"
                value={newEntry.bodyFat}
                onChange={(e) => setNewEntry({ ...newEntry, bodyFat: e.target.value })}
                placeholder="e.g., 15.5"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addMetrics}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Update Metrics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Body Fat Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bodyFatHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bodyFat"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BodyMetrics;
