import { z } from 'zod';
import apiFetch from './apiFetch';

const adminSchema = z.object({
  username: z.string(),
});
export type Admin = z.infer<typeof adminSchema>;

export const getAdmin = async (username: string) => {
  const response = await apiFetch(`/admin/${username}`, {
    method: 'GET',
  });
  const data = await response.json();
  return adminSchema.parse(data);
};

export const updateAdmin = async (username: string, admin: Admin) => {
  const response = await apiFetch(`/admin/${username}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(admin),
  });

  if (!response.ok) {
    throw new Error(`Failed to update admin: ${response.statusText}`);
  }
};

export const deleteAdmin = async (username: string) => {
  const response = await apiFetch(`/admin/${username}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete admin: ${response.statusText}`);
  }
};

