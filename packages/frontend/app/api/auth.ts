import apiFetch from './apiFetch';

enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const register = async (email: string, password: string, role: Role) => {
  const response = await apiFetch('/auth/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  });
};

const login = async (email: string, password: string, role: Role) => {
  const response = await apiFetch('/auth/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  });

  //   return response.json();
};
// For testing purposes
const checkAuth = async () => {
  const response = await apiFetch('/auth/status', {
    method: 'GET',
  });

  return response.json();
};

export { checkAuth, login, register };
