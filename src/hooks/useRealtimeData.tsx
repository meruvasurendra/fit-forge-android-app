
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FoodEntry {
  id: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meal_type: string;
  date: string;
  ai_analyzed: boolean;
}

interface WorkoutEntry {
  id: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  calories_burned: number;
  date: string;
}

interface AIRecommendation {
  id: string;
  recommendation_type: string;
  content: any;
  is_active: boolean;
  created_at: string;
}

export const useRealtimeData = (userId: string) => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchInitialData = async () => {
      try {
        // Fetch food entries
        const { data: foods } = await supabase
          .from('food_entries')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        // Fetch workout entries
        const { data: workouts } = await supabase
          .from('workout_entries')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        // Fetch AI recommendations
        const { data: recs } = await supabase
          .from('ai_recommendations')
          .select('*')
          .eq('user_id', userId)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        setFoodEntries(foods || []);
        setWorkoutEntries(workouts || []);
        setRecommendations(recs || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Set up real-time subscriptions
    const foodChannel = supabase
      .channel('food-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'food_entries',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFoodEntries(prev => [payload.new as FoodEntry, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setFoodEntries(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as FoodEntry : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setFoodEntries(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    const workoutChannel = supabase
      .channel('workout-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workout_entries',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setWorkoutEntries(prev => [payload.new as WorkoutEntry, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setWorkoutEntries(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as WorkoutEntry : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setWorkoutEntries(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    const recommendationChannel = supabase
      .channel('recommendation-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_recommendations',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRecommendations(prev => [payload.new as AIRecommendation, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setRecommendations(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as AIRecommendation : item
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(foodChannel);
      supabase.removeChannel(workoutChannel);
      supabase.removeChannel(recommendationChannel);
    };
  }, [userId]);

  const addFoodEntry = async (foodName: string, mealType: string) => {
    try {
      const { data } = await supabase.functions.invoke('ai-nutrition-analyzer', {
        body: { food_name: foodName, user_id: userId, meal_type: mealType }
      });
      return data;
    } catch (error) {
      console.error('Error adding food entry:', error);
      throw error;
    }
  };

  const addWorkoutEntry = async (exerciseName: string, sets: number, reps: number, weight?: number) => {
    try {
      const { data, error } = await supabase
        .from('workout_entries')
        .insert({
          user_id: userId,
          exercise_name: exerciseName,
          sets,
          reps,
          weight: weight || 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding workout entry:', error);
      throw error;
    }
  };

  const generateWorkoutPlan = async (workoutType: string) => {
    try {
      const { data } = await supabase.functions.invoke('ai-workout-planner', {
        body: { user_id: userId, workout_type: workoutType }
      });
      return data;
    } catch (error) {
      console.error('Error generating workout plan:', error);
      throw error;
    }
  };

  const generateDietPlan = async (preferences: any = {}) => {
    try {
      const { data } = await supabase.functions.invoke('ai-diet-planner', {
        body: { user_id: userId, preferences }
      });
      return data;
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  };

  return {
    foodEntries,
    workoutEntries,
    recommendations,
    isLoading,
    addFoodEntry,
    addWorkoutEntry,
    generateWorkoutPlan,
    generateDietPlan
  };
};
