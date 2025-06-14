import { z } from 'zod';
import apiFetch from './apiFetch';

export const trainingSchema = z.object({
  id: z.number(),
  title: z.string(),
  trainingInfo: z.string(),
});
export const createTrainingSchema = z.object({
  title: z.string(),
  trainingInfo: z.string(),
});
export type Training = z.infer<typeof trainingSchema>;
export type CreateTrainingDto = z.infer<typeof createTrainingSchema>;

export const getTrainings = async () => {
  const response = await apiFetch('/trainings', {
    method: 'GET',
  });
  return response.json();
};

export const createTraining = async (training: CreateTrainingDto) => {
  const response = await apiFetch('/trainings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(training),
  });
};

