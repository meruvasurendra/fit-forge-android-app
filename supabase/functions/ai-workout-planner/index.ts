
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, workout_type } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user profile and recent workouts
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    const { data: recentWorkouts } = await supabase
      .from('workout_entries')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(5);

    const prompt = `Create a personalized workout plan for:
    - Age: ${profile?.age || 30}
    - Weight: ${profile?.weight || 70}kg
    - Fitness Goal: ${profile?.fitness_goal || 'general health'}
    - Activity Level: ${profile?.activity_level || 'moderate'}
    - Workout Type: ${workout_type || 'full body'}
    
    Recent workouts: ${recentWorkouts?.map(w => w.exercise_name).join(', ') || 'None'}
    
    Return ONLY a JSON array of exercises:
    [
      {
        "name": "exercise name",
        "sets": number,
        "reps": number,
        "weight": number (kg),
        "duration": number (minutes),
        "calories_burned": number,
        "instructions": "brief description",
        "difficulty": "beginner/intermediate/advanced"
      }
    ]`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a certified personal trainer. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const aiData = await response.json();
    const workoutPlan = JSON.parse(aiData.choices[0].message.content);

    // Store recommendation
    await supabase
      .from('ai_recommendations')
      .insert({
        user_id,
        recommendation_type: 'workout_plan',
        content: workoutPlan
      });

    return new Response(JSON.stringify({
      success: true,
      data: workoutPlan
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-workout-planner:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
