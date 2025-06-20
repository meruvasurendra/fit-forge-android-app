
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Dumbbell, Filter, Star, Clock, Target } from "lucide-react";

interface Exercise {
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string;
  targetMuscles: string[];
}

interface WorkoutEntry {
  id: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
  duration?: number;
}

const WorkoutLogger = ({ user }) => {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [newWorkout, setNewWorkout] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    duration: ""
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState(0);
  const { toast } = useToast();

  // Exercise database with proper typing
  const exerciseDatabase: Exercise[] = [
    { name: "Push-ups", category: "chest", difficulty: "beginner", equipment: "bodyweight", targetMuscles: ["chest", "triceps", "shoulders"] },
    { name: "Bench Press", category: "chest", difficulty: "intermediate", equipment: "barbell", targetMuscles: ["chest", "triceps", "shoulders"] },
    { name: "Incline Dumbbell Press", category: "chest", difficulty: "intermediate", equipment: "dumbbells", targetMuscles: ["chest", "shoulders"] },
    { name: "Squats", category: "legs", difficulty: "beginner", equipment: "bodyweight", targetMuscles: ["quadriceps", "glutes", "hamstrings"] },
    { name: "Deadlifts", category: "legs", difficulty: "advanced", equipment: "barbell", targetMuscles: ["hamstrings", "glutes", "back"] },
    { name: "Lunges", category: "legs", difficulty: "beginner", equipment: "bodyweight", targetMuscles: ["quadriceps", "glutes", "calves"] },
    { name: "Pull-ups", category: "back", difficulty: "intermediate", equipment: "pull-up bar", targetMuscles: ["latissimus dorsi", "biceps", "rhomboids"] },
    { name: "Bent-over Rows", category: "back", difficulty: "intermediate", equipment: "barbell", targetMuscles: ["latissimus dorsi", "rhomboids", "middle trapezius"] },
    { name: "Lat Pulldowns", category: "back", difficulty: "beginner", equipment: "cable machine", targetMuscles: ["latissimus dorsi", "biceps"] },
    { name: "Shoulder Press", category: "shoulders", difficulty: "intermediate", equipment: "dumbbells", targetMuscles: ["deltoids", "triceps"] },
    { name: "Lateral Raises", category: "shoulders", difficulty: "beginner", equipment: "dumbbells", targetMuscles: ["lateral deltoids"] },
    { name: "Bicep Curls", category: "arms", difficulty: "beginner", equipment: "dumbbells", targetMuscles: ["biceps"] },
    { name: "Tricep Dips", category: "arms", difficulty: "intermediate", equipment: "bodyweight", targetMuscles: ["triceps", "chest"] },
    { name: "Planks", category: "core", difficulty: "beginner", equipment: "bodyweight", targetMuscles: ["core", "shoulders"] },
    { name: "Russian Twists", category: "core", difficulty: "intermediate", equipment: "bodyweight", targetMuscles: ["obliques", "core"] },
    { name: "Mountain Climbers", category: "cardio", difficulty: "intermediate", equipment: "bodyweight", targetMuscles: ["core", "legs", "shoulders"] },
    { name: "Burpees", category: "cardio", difficulty: "advanced", equipment: "bodyweight", targetMuscles: ["full body"] },
    { name: "Jump Rope", category: "cardio", difficulty: "beginner", equipment: "jump rope", targetMuscles: ["calves", "shoulders"] }
  ];

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    const savedWeeklyCount = localStorage.getItem("workoutsThisWeek");

    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
    if (savedWeeklyCount) {
      setWorkoutsThisWeek(parseInt(savedWeeklyCount));
    }
  }, []);

  // Get exercises based on user's fitness goal and level
  const getPersonalizedSuggestions = (): Exercise[] => {
    const userGoal = user.fitnessGoal;
    const userLevel = user.activityLevel;

    let suggestions = exerciseDatabase;

    // Filter by difficulty based on activity level
    if (userLevel === "low") {
      suggestions = suggestions.filter(ex => ex.difficulty === "beginner");
    } else if (userLevel === "moderate") {
      suggestions = suggestions.filter(ex => ex.difficulty === "beginner" || ex.difficulty === "intermediate");
    }

    // Filter by goal
    if (userGoal === "lose-weight") {
      suggestions = suggestions.filter(ex => 
        ex.category === "cardio" || 
        ex.category === "legs" || 
        ex.name.toLowerCase().includes("burpee") ||
        ex.name.toLowerCase().includes("mountain")
      );
    } else if (userGoal === "gain-muscle") {
      suggestions = suggestions.filter(ex => 
        ex.category === "chest" || 
        ex.category === "back" || 
        ex.category === "arms" || 
        ex.category === "shoulders" ||
        ex.equipment === "barbell" ||
        ex.equipment === "dumbbells"
      );
    } else if (userGoal === "build-endurance") {
      suggestions = suggestions.filter(ex => 
        ex.category === "cardio" || 
        ex.category === "core" ||
        ex.equipment === "bodyweight"
      );
    }

    return suggestions.slice(0, 6); // Return top 6 suggestions
  };

  // Filter exercises based on selected filters
  const getFilteredExercises = (): Exercise[] => {
    let filtered = exerciseDatabase;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((exercise: Exercise) => exercise.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((exercise: Exercise) => exercise.difficulty === selectedDifficulty);
    }

    return filtered;
  };

  const addWorkout = () => {
    if (!newWorkout.exercise || !newWorkout.sets || !newWorkout.reps) {
      toast({
        title: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const workout: WorkoutEntry = {
      id: Date.now(),
      exercise: newWorkout.exercise,
      sets: parseInt(newWorkout.sets),
      reps: parseInt(newWorkout.reps),
      weight: parseFloat(newWorkout.weight) || 0,
      duration: parseFloat(newWorkout.duration) || 0,
      date: new Date().toLocaleDateString()
    };

    const newWorkouts = [...workouts, workout];
    const newWeeklyCount = workoutsThisWeek + 1;

    setWorkouts(newWorkouts);
    setWorkoutsThisWeek(newWeeklyCount);

    localStorage.setItem("workouts", JSON.stringify(newWorkouts));
    localStorage.setItem("workoutsThisWeek", newWeeklyCount.toString());

    setNewWorkout({ exercise: "", sets: "", reps: "", weight: "", duration: "" });

    toast({
      title: "Workout logged! 💪",
      description: `${workout.exercise} - ${workout.sets} sets x ${workout.reps} reps`,
    });
  };

  const categories = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const personalizedSuggestions = getPersonalizedSuggestions();
  const filteredExercises = getFilteredExercises();

  return (
    <div className="space-y-6">
      {/* Weekly Progress */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{workoutsThisWeek}</div>
            <div className="text-sm opacity-80">Workouts this week</div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Suggested for You
          </CardTitle>
          <p className="text-sm text-gray-600">
            Based on your goal: {user.fitnessGoal?.replace("-", " ").toUpperCase()} and activity level: {user.activityLevel?.toUpperCase()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalizedSuggestions.map((exercise: Exercise) => (
              <div
                key={exercise.name}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setNewWorkout({ ...newWorkout, exercise: exercise.name })}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{exercise.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2 capitalize">
                  {exercise.category} • {exercise.equipment}
                </div>
                <div className="text-xs text-gray-500">
                  Targets: {exercise.targetMuscles.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Exercise Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Difficulty</Label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {filteredExercises.map((exercise: Exercise) => (
              <div
                key={exercise.name}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setNewWorkout({ ...newWorkout, exercise: exercise.name })}
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-sm">{exercise.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {exercise.category}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Workout */}
      <Card>
        <CardHeader>
          <CardTitle>Log Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="exercise">Exercise *</Label>
              <Input
                id="exercise"
                value={newWorkout.exercise}
                onChange={(e) => setNewWorkout({ ...newWorkout, exercise: e.target.value })}
                placeholder="e.g., Push-ups"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sets">Sets *</Label>
              <Input
                id="sets"
                type="number"
                value={newWorkout.sets}
                onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                placeholder="3"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reps">Reps *</Label>
              <Input
                id="reps"
                type="number"
                value={newWorkout.reps}
                onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                placeholder="12"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.5"
                value={newWorkout.weight}
                onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })}
                placeholder="50"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addWorkout} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Log Workout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          {workouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No workouts logged yet.</p>
              <p className="text-sm mt-2">Start by logging your first exercise above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.slice(-5).reverse().map((workout) => (
                <div key={workout.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{workout.exercise}</h4>
                    <span className="text-sm text-gray-500">{workout.date}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">{workout.sets}</div>
                      <div className="text-xs text-blue-500">Sets</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">{workout.reps}</div>
                      <div className="text-xs text-green-500">Reps</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-purple-600">{workout.weight}</div>
                      <div className="text-xs text-purple-500">Weight (kg)</div>
                    </div>
                    {workout.duration > 0 && (
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-orange-600">{workout.duration}</div>
                        <div className="text-xs text-orange-500">Minutes</div>
                      </div>
                    )}
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

export default WorkoutLogger;
