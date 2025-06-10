import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Injectable } from '@nestjs/common';
import { mealRecommendationExamples } from './prompts/meal-recomendation-examples';

@Injectable()
export class LlmModuleService {
  async getResponce(memberData: JSON) {
    const model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const messages = [
      new SystemMessage(
        'Using json that is provided (user physical parameters and challenges he is currently in), generate daily recommedations for the user about his nutrition. Dont write code, just write the text that user can read. Use the data from the json to generate the recommendations. Write general recommendations, not specific ones. Write only key recommendations',
      ),
      ...mealRecommendationExamples.map((ex) => [ex.input, ex.output]).flat(),
      new HumanMessage(`User data: ${JSON.stringify(memberData)}`),
    ];

    const responce = await model.invoke(messages);
    return responce.text;
  }
}
