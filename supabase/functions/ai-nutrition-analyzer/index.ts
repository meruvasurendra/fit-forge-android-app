
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
    const { food_name, user_id, meal_type } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user profile for personalization
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    const prompt = `Analyze the food "${food_name}" and provide accurate nutritional information. 
    Consider that this is for a ${profile?.age || 30} year old person weighing ${profile?.weight || 70}kg 
    with fitness goal: ${profile?.fitness_goal || 'general health'}.
    
    Return ONLY a JSON object with exact numbers (no text explanations):
    {
      "calories": number,
      "protein": number (grams),
      "carbs": number (grams),
      "fats": number (grams),
      "fiber": number (grams),
      "sugar": number (grams),
      "sodium": number (mg),
      "portion_size": "description of typical portion"
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
          { role: 'system', content: 'You are a nutrition expert. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
      }),
    });

    const aiData = await response.json();
    const nutritionData = JSON.parse(aiData.choices[0].message.content);

    // Store in database
    const { data: foodEntry, error } = await supabase
      .from('food_entries')
      .insert({
        user_id,
        food_name,
        calories: nutritionData.calories,
        protein: nutritionData.protein,
        carbs: nutritionData.carbs,
        fats: nutritionData.fats,
        meal_type,
        ai_analyzed: true
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      success: true,
      data: { ...foodEntry, ...nutritionData }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-nutrition-analyzer:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
