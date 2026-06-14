export const calculateCalories = ({
  gender,
  weight,
  height,
  age,
  activityLevel,
  goal,
}) => {
  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  let tdee = bmr * multipliers[activityLevel];

  if (goal === "weight_loss") {
    tdee -= 400;
  }

  if (goal === "weight_gain") {
    tdee += 300;
  }

  return Math.round(tdee);
};