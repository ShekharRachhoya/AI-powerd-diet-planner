const activityMultiplier = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

export const calculateWaterIntake = ({
  weight,
  activityLevel
}) => {
  let water = weight * 35;

  if (activityLevel === 'moderate') {
    water += 500;
  }

  if (
    activityLevel === 'active' ||
    activityLevel === 'very_active'
  ) {
    water += 1000;
  }

  return Math.round(water);
};

export const calculateBMR = ({
  weight,
  height,
  age,
  gender
}) => {
  if (gender === 'male') {
    return Math.round(
      10 * weight +
      6.25 * height -
      5 * age +
      5
    );
  }

  return Math.round(
    10 * weight +
    6.25 * height -
    5 * age -
    161
  );
};

export const calculateTDEE = ({
  bmr,
  activityLevel
}) => {
  return Math.round(
    bmr * activityMultiplier[activityLevel]
  );
};

export const calculateMacros = ({
  tdee,
  goal
}) => {
  let calories = tdee;

  if (goal === 'weight_loss') {
    calories -= 500;
  }

  if (goal === 'muscle_gain') {
    calories += 300;
  }

  const protein =
    Math.round((calories * 0.30) / 4);

  const carbs =
    Math.round((calories * 0.45) / 4);

  const fats =
    Math.round((calories * 0.25) / 9);

  return {
    calories,
    protein,
    carbs,
    fats
  };
};

export const calculateCompletionPercentage = (
  profile
) => {
  const fields = [
    profile.age,
    profile.gender,
    profile.height,
    profile.weight,
    profile.goal,
    profile.activityLevel
  ];

  const completed = fields.filter(Boolean)
    .length;

  return Math.round(
    (completed / fields.length) * 100
  );
};