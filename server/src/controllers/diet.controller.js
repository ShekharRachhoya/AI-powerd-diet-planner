// controllers/dietController.js

import { generateDietPlan } from "../services/gemini.service.js";

export const createDietPlan = async (req, res) => {
  try {
    const data = req.body;

    const result = await generateDietPlan(data);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate plan" });
  }
};