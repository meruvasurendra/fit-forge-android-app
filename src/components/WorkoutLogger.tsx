
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Dumbbell, Target, Filter, Lightbulb } from "lucide-react";

const WorkoutLogger = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState({
    name: "",
    exercises: [],
  });
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  // Enhanced exercise database with categories and difficulty
  const exerciseDatabase = {
    "weight-loss": {
      beginner: [
        { name: "Walking", category: "cardio", difficulty: "beginner" },
        { name: "Bodyweight Squats", category: "strength", difficulty: "beginner" },
        { name: "Modified Push-ups", category: "strength", difficulty: "beginner" },
        { name: "Plank Hold", category: "core", difficulty: "beginner" },
        { name: "Jumping Jacks", category: "cardio", difficulty: "beginner" }
      ],
      intermediate: [
        { name: "Burpees", category: "cardio", difficulty: "intermediate" },
        { name: "Mountain Climbers", category: "cardio", difficulty: "intermediate" },
        { name: "Jump Squats", category: "strength", difficulty: "intermediate" },
        { name: "Push-ups", category: "strength", difficulty: "intermediate" },
        { name: "Russian Twists", category: "core", difficulty: "intermediate" }
      ],
      advanced: [
        { name: "HIIT Sprints", category: "cardio", difficulty: "advanced" },
        { name: "Plyometric Push-ups", category: "strength", difficulty: "advanced" },
        { name: "Single-leg Burpees", category: "cardio", difficulty: "advanced" },
        { name: "Pistol Squats", category: "strength", difficulty: "advanced" }
      ]
    },
    "muscle-gain": {
      beginner: [
        { name: "Assisted Pull-ups", category: "back", difficulty: "beginner" },
        { name: "Dumbbell Press", category: "chest", difficulty: "beginner" },
        { name: "Goblet Squats", category: "legs", difficulty: "beginner" },
        { name: "Dumbbell Rows", category: "back", difficulty: "beginner" }
      ],
      intermediate: [
        { name: "Bench Press", category: "chest", difficulty: "intermediate" },
        { name: "Deadlifts", category: "legs", difficulty: "intermediate" },
        { name: "Pull-ups", category: "back", difficulty: "intermediate" },
        { name: "Overhead Press", category: "shoulders", difficulty: "intermediate" },
        { name: "Barbell Rows", category: "back", difficulty: "intermediate" }
      ],
      advanced: [
        { name: "Weighted Pull-ups", category: "back", difficulty: "advanced" },
        { name: "Heavy Deadlifts", category: "legs", difficulty: "advanced" },
        { name: "Incline Barbell Press", category: "chest", difficulty: "advanced" },
        { name: "Bulgarian Split Squats", category: "legs", difficulty: "advanced" }
      ]
    },
    "strength": {
      beginner: [
        { name: "Bodyweight Squats", category: "legs", difficulty: "beginner" },
        { name: "Wall Push-ups", category: "chest", difficulty: "beginner" },
        { name: "Assisted Pull-ups", category: "back", difficulty: "beginner" }
      ],
      intermediate: [
        { name: "Squats", category: "legs", difficulty: "intermediate" },
        { name: "Deadlifts", category: "legs", difficulty: "intermediate" },
        { name: "Bench Press", category: "chest", difficulty: "intermediate" },
        { name: "Overhead Press", category: "shoulders", difficulty: "intermediate" }
      ],
      advanced: [
        { name: "Power Clean", category: "full-body", difficulty: "advanced" },
        { name: "Front Squats", category: "legs", difficulty: "advanced" },
        { name: "Weighted Dips", category: "chest", difficulty: "advanced" }
      ]
    },
    "endurance": {
      beginner: [
        { name: "Brisk Walking", category: "cardio", difficulty: "beginner" },
        { name: "Stationary Cycling", category: "cardio", difficulty: "beginner" },
        { name: "Swimming", category: "cardio", difficulty: "beginner" }
      ],
      intermediate: [
        { name: "Running", category: "cardio", difficulty: "intermediate" },
        { name: "Rowing", category: "cardio", difficulty: "intermediate" },
        { name: "Cycling", category: "cardio", difficulty: "intermediate" }
      ],
      advanced: [
        { name: "Marathon Training", category: "cardio", difficulty: "advanced" },
        { name: "Triathlon Training", category: "cardio", difficulty: "advanced" }
      ]
    }
  };

  // Get smart suggestions based on user profile
  const getSmartSuggestions = () => {
    const userGoal = user.fitnessGoal || "general-fitness";
    const userLevel = user.fitnessLevel || "beginner";
    
    if (!exerciseDatabase[userGoal]) {
      return exerciseDatabase["weight-loss"][userLevel] || [];
    }
    
    return exerciseDatabase[userGoal][userLevel] || [];
  };

  // Get all exercises for current goal
  const getAllExercisesForGoal = () => {
    const userGoal = user.fitnessGoal || "weight-loss";
    const goalExercises = exerciseDatabase[userGoal] || exerciseDatabase["weight-loss"];
    
    return Object.values(goalExercises).flat();
  };

  // Filter exercises by category
  const getFilteredExercises = () => {
    const allExercises = getAllExercisesForGoal();
    
    if (selectedCategory === "all") {
      return allExercises;
    }
    
    return allExercises.filter(exercise => exercise.category === selectedCategory);
  };

  // Get unique categories for current goal
  const getCategories = () => {
    const allExercises = getAllExercisesForGoal();
    const categories = [...new Set(allExercises.map(ex => ex.category))];
    return categories;
  };

  // Generate workout suggestions based on user's goal and recent workouts
  const generateWorkoutSuggestion = () => {
    const suggestions = getSmartSuggestions();
    const recentExercises = workouts.slice(-3).flatMap(w => w.exercises.map(e => e.name));
    
    // Filter out recently done exercises to encourage variety
    const freshSuggestions = suggestions.filter(ex => 
      !recentExercises.includes(ex.name)
    );
    
    return freshSuggestions.slice(0, 4);
  };

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const startWorkout = () => {
    if (!currentWorkout.name) {
      toast({
        title: "Please enter a workout name",
        variant: "destructive",
      });
      return;
    }
    setIsWorkoutActive(true);
    toast({
      title: "Workout started! 💪",
      description: `Let's crush this ${currentWorkout.name} session!`,
    });
  };

  const addExercise = () => {
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) {
      toast({
        title: "Please fill in exercise details",
        variant: "destructive",
      });
      return;
    }

    const exercise = {
      id: Date.now(),
      ...newExercise,
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      weight: newExercise.weight ? parseFloat(newExercise.weight) : 0,
    };

    setCurrentWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise]
    }));

    setNewExercise({ name: "", sets: "", reps: "", weight: "" });

    toast({
      title: "Exercise added! 🎯",
      description: `${exercise.name} - ${exercise.sets}x${exercise.reps}`,
    });
  };

  const removeExercise = (id) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id)
    }));
  };

  const finishWorkout = () => {
    if (currentWorkout.exercises.length === 0) {
      toast({
        title: "Add at least one exercise",
        variant: "destructive",
      });
      return;
    }

    const workout = {
      id: Date.now(),
      name: currentWorkout.name,
      exercises: currentWorkout.exercises,
      date: new Date().toLocaleDateString(),
      duration: "45 min",
    };

    const newWorkouts = [...workouts, workout];
    setWorkouts(newWorkouts);
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));

    const workoutsThisWeek = parseInt(localStorage.getItem("workoutsThisWeek") || "0");
    localStorage.setItem("workoutsThisWeek", (workoutsThisWeek + 1).toString());

    setCurrentWorkout({ name: "", exercises: [] });
    setIsWorkoutActive(false);

    toast({
      title: "Workout completed! 🎉",
      description: `Great job on your ${workout.name} session!`,
    });
  };

  const addSuggestedExercise = (exerciseName) => {
    setNewExercise({ ...newExercise, name: exerciseName });
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      {/* Workout Stats */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Workout Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{workouts.length}</div>
              <div className="text-sm opacity-80">Total Workouts</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {parseInt(localStorage.getItem("workoutsThisWeek") || "0")}
              </div>
              <div className="text-sm opacity-80">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Card */}
      {!isWorkoutActive && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Lightbulb className="w-5 h-5" />
              Smart Suggestions for {user.fitnessGoal?.replace('-', ' ').toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {generateWorkoutSuggestion().map((exercise, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addSuggestedExercise(exercise.name)}
                  className="text-xs p-2 h-auto border-blue-200 hover:bg-blue-100"
                >
                  <Target className="w-3 h-3 mr-1" />
                  {exercise.name}
                </Button>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Personalized for your {user.fitnessLevel} level • Click to add to workout
            </p>
          </CardContent>
        </Card>
      )}

      {/* Current Workout */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isWorkoutActive ? "Current Workout" : "Start New Workout"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isWorkoutActive ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input
                  id="workout-name"
                  value={currentWorkout.name}
                  onChange={(e) => setCurrentWorkout({ ...currentWorkout, name: e.target.value })}
                  placeholder="e.g., Push Day, Leg Day, Cardio"
                  className="mt-1"
                />
              </div>
              <Button
                onClick={startWorkout}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Start Workout
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-600">
                  {currentWorkout.name} 🔥
                </h3>
                <p className="text-gray-600">Workout in progress...</p>
              </div>

              {/* Exercise Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <Label>Filter by category:</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {getCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Add Exercise */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label>Exercise</Label>
                  <Select
                    value={newExercise.name}
                    onValueChange={(value) => setNewExercise({ ...newExercise, name: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilteredExercises().map((exercise) => (
                        <SelectItem key={exercise.name} value={exercise.name}>
                          <div className="flex items-center gap-2">
                            <span>{exercise.name}</span>
                            <span className="text-xs text-gray-500">
                              ({exercise.difficulty})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sets">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                    placeholder="3"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
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
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                    placeholder="20"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addExercise} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Exercise List */}
              {currentWorkout.exercises.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Exercises:</h4>
                  {currentWorkout.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(exercise.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={finishWorkout}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Finish Workout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workout History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          {workouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No workouts logged yet.</p>
              <p className="text-sm mt-2">Start your first workout above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workouts.slice(-5).reverse().map((workout) => (
                <div key={workout.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-lg">{workout.name}</h4>
                    <div className="text-sm text-gray-500">
                      {workout.date} • {workout.duration}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {exercise.name}: {exercise.sets}×{exercise.reps}
                        {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                      </div>
                    ))}
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
