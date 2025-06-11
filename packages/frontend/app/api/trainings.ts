import { z } from 'zod';
import apiFetch from './apiFetch';

export const trainingSchema = z.object({
  title: z.string(),
  training_info: z.string(),
});
export type Training = z.infer<typeof trainingSchema>;

export const getTrainings = async () => {
  const response = await apiFetch('/trainings', {
    method: 'GET',
  });
  return response.json();
};

export const createTraining = async (training: Training) => {
  const response = await apiFetch('/trainings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(training),
  });
};

