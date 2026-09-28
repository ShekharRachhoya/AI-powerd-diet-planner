import gemini
from '../config/gemini.js';

class GeminiService {
  async generate(
    prompt
  ) {
    const response =
      await gemini.models.generateContent({
        model:
          'gemini-2.5-flash',
        contents: prompt
      });

    return response.text;
  }
}

export default new GeminiService();