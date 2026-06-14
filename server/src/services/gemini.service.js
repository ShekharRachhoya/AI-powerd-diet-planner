// services/geminiService.js
import { GoogleGenAI } from "@google/genai";



export const generateDietPlan = async (data) => {
  const prompt = `
Create a personalized diet plan.

Age: ${data.age}
Weight: ${data.weight}
Height: ${data.height}
Goal: ${data.goal}
Activity: ${data.activity}

Return JSON with meals and calories.
`;

  // const response = await axios.post(
  //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
  //   {
  //     contents: [{ parts: [{ text: prompt }] }],
  //   }
  // );

  // return response.data;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.data;

};









