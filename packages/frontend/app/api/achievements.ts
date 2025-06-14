import { z } from 'zod';
import apiFetch from './apiFetch';

const achievementResponseSchema = z.object({
  achievement_id: z.number(),
  achievement_info: z.string(),
});

const achievementsResponseSchema = z.object({
  achivements: z.array(achievementResponseSchema),
});

export type Achievement = z.infer<typeof achievementResponseSchema>;
export type AchievementsResponse = z.infer<typeof achievementsResponseSchema>;

// Get achievements for the current user
export const getMyAchievements = async (): Promise<AchievementsResponse> => {
  const response = await apiFetch('/achievements/genericAchievements', {
    method: 'GET',
  });
  return response.json();
};

