import { z } from 'zod';
import apiFetch from './apiFetch';

const dietRecommendationResponseSchema = z.object({
  ai_response: z.string(),
  bmr: z.number(),
});

export type DietRecommendationResponse = z.infer<typeof dietRecommendationResponseSchema>;

export const getDietRecommendation = async (): Promise<DietRecommendationResponse> => {
  const response = await apiFetch('/llm/recommendation', {
    method: 'GET',
  });
  return response.json();
};

