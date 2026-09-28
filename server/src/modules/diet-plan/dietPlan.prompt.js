export const buildDietPrompt = ({
  profile
}) => {
  return `
You are an expert nutritionist.

Generate a personalized diet plan.

User Information:

Age: ${profile.age}
Gender: ${profile.gender}
Height: ${profile.height} cm
Weight: ${profile.weight} kg
Goal: ${profile.goal}
Activity Level: ${profile.activityLevel}

Dietary Preferences:
${profile.dietaryPreferences.join(', ')}

Allergies:
${profile.allergies.join(', ')}

Medical Conditions:
${profile.medicalConditions.join(', ')}

Nutrition Targets:

Calories:
${profile.calculations.calories}

Protein:
${profile.calculations.protein}

Carbohydrates:
${profile.calculations.carbs}

Fats:
${profile.calculations.fats}

Return ONLY valid JSON.

{
  "meals": [],
  "recommendations": []
}
`;
};