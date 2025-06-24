
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
    const { user_id, preferences } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user profile and recent food entries
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    const { data: recentFoods } = await supabase
      .from('food_entries')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10);

    const totalCalories = recentFoods?.reduce((sum, food) => sum + (food.calories || 0), 0) || 0;
    const avgDailyCalories = totalCalories / 7; // Last week average

    const prompt = `Create a personalized weekly diet plan for:
    - Age: ${profile?.age || 30}
    - Weight: ${profile?.weight || 70}kg
    - Height: ${profile?.height || 170}cm
    - Fitness Goal: ${profile?.fitness_goal || 'general health'}
    - Activity Level: ${profile?.activity_level || 'moderate'}
    - Dietary Preferences: ${JSON.stringify(profile?.dietary_preferences || {})}
    - Current avg daily calories: ${avgDailyCalories}
    
    Recent foods: ${recentFoods?.map(f => f.food_name).join(', ') || 'None'}
    
    Return ONLY a JSON object:
    {
      "daily_calorie_target": number,
      "macro_targets": {
        "protein": number (grams),
        "carbs": number (grams),
        "fats": number (grams)
      },
      "meal_suggestions": {
        "breakfast": [{"name": "food", "calories": number, "protein": number, "carbs": number, "fats": number}],
        "lunch": [{"name": "food", "calories": number, "protein": number, "carbs": number, "fats": number}],
        "dinner": [{"name": "food", "calories": number, "protein": number, "carbs": number, "fats": number}],
        "snacks": [{"name": "food", "calories": number, "protein": number, "carbs": number, "fats": number}]
      },
      "weekly_tips": ["tip1", "tip2", "tip3"]
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a certified nutritionist. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    const aiData = await response.json();
    const dietPlan = JSON.parse(aiData.choices[0].message.content);

    // Store recommendation
    await supabase
      .from('ai_recommendations')
      .insert({
        user_id,
        recommendation_type: 'diet_plan',
        content: dietPlan
      });

    return new Response(JSON.stringify({
      success: true,
      data: dietPlan
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-diet-planner:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
