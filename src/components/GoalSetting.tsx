
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Target, Calendar, Trophy, Plus, Edit2, Trash2 } from "lucide-react";

interface Goal {
  id: number;
  title: string;
  type: 'weight' | 'workout' | 'calorie' | 'custom';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const GoalSetting = ({ user }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    type: "weight" as const,
    target: "",
    unit: "kg",
    deadline: "",
    priority: "medium" as const
  });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedGoals = localStorage.getItem("userGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Set default goals based on user's fitness goal
      const defaultGoals = getDefaultGoals();
      setGoals(defaultGoals);
      localStorage.setItem("userGoals", JSON.stringify(defaultGoals));
    }
  }, []);

  const getDefaultGoals = (): Goal[] => {
    const baseGoals: Goal[] = [
      {
        id: 1,
        title: "Weekly Workout Target",
        type: "workout",
        target: 5,
        current: 0,
        unit: "workouts",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: "high",
        completed: false
      },
      {
        id: 2,
        title: "Daily Calorie Goal",
        type: "calorie",
        target: 2000,
        current: 0,
        unit: "calories",
        deadline: new Date().toISOString().split('T')[0],
        priority: "medium",
        completed: false
      }
    ];

    if (user.fitnessGoal === "weight-loss") {
      baseGoals.push({
        id: 3,
        title: "Weight Loss Target",
        type: "weight",
        target: parseFloat(user.weight) - 5,
        current: parseFloat(user.weight),
        unit: "kg",
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: "high",
        completed: false
      });
    }

    return baseGoals;
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      type: newGoal.type,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      priority: newGoal.priority,
      completed: false
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals));

    setNewGoal({
      title: "",
      type: "weight",
      target: "",
      unit: "kg",
      deadline: "",
      priority: "medium"
    });

    toast({
      title: "Goal added! 🎯",
      description: `${goal.title} has been set successfully`,
    });
  };

  const updateGoalProgress = (goalId: number, newCurrent: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const completed = newCurrent >= goal.target;
        return { ...goal, current: newCurrent, completed };
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals));

    const goal = updatedGoals.find(g => g.id === goalId);
    if (goal?.completed) {
      toast({
        title: "Goal Completed! 🏆",
        description: `Congratulations on achieving ${goal.title}!`,
      });
    }
  };

  const deleteGoal = (goalId: number) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals));
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Goals</p>
                <p className="text-3xl font-bold">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Completed</p>
                <p className="text-3xl font-bold">{goals.filter(g => g.completed).length}</p>
              </div>
              <Trophy className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">In Progress</p>
                <p className="text-3xl font-bold">{goals.filter(g => !g.completed).length}</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Set New Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="title">Goal Title *</Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="e.g., Lose 5kg"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Goal Type *</Label>
              <Select
                value={newGoal.type}
                onValueChange={(value: any) => setNewGoal({ ...newGoal, type: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="calorie">Calorie</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="target">Target Value *</Label>
              <Input
                id="target"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="Target number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="deadline">Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Priority</Label>
              <Select
                value={newGoal.priority}
                onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={addGoal} className="w-full">
                Add Goal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No goals set yet.</p>
              <p className="text-sm mt-2">Add your first goal above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`border-2 rounded-lg p-4 ${getPriorityColor(goal.priority)}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{goal.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {goal.type} • Priority: {goal.priority} • Deadline: {goal.deadline}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingGoal(goal)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{goal.current} / {goal.target} {goal.unit}</span>
                    </div>
                    <Progress value={getProgressPercentage(goal)} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Update progress"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          updateGoalProgress(goal.id, parseFloat(input.value) || 0);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                        if (input) {
                          updateGoalProgress(goal.id, parseFloat(input.value) || 0);
                          input.value = '';
                        }
                      }}
                    >
                      Update
                    </Button>
                  </div>

                  {goal.completed && (
                    <div className="mt-2 p-2 bg-green-100 rounded text-green-700 text-sm font-medium">
                      🏆 Goal Completed! Congratulations!
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSetting;
