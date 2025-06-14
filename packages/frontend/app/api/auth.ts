import type { User } from '~/components/auth/AuthProvider';
import apiFetch from './apiFetch';

enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const register = async (username: string, password: string, role: Role) => {
  const response = await apiFetch('/auth/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  });
};

const login = async (username: string, password: string, role: Role) => {
  const response = await apiFetch('/auth/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  });
};

const logout = async () => {
  const response = await apiFetch('/auth/signOut', {
    method: 'POST',
  });
};

const checkAuth = async (): Promise<User> => {
  const response = await apiFetch('/auth/me', {
    method: 'GET',
  });

  return response.json();
};

export { checkAuth, login, logout, register };

