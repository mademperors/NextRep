import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Admin } from '~/api/admins';
import { checkAuth, login as loginApi, logout as logoutApi } from '~/api/auth';
import type { Member } from '~/api/members';
import type { Role } from '~/constants/enums/roles.enum';

export type User = (Member & { role: Role.MEMBER }) | (Admin & { role: Role.ADMIN });
export const authContext = createContext<{
  user: User | null;
  logout: () => void;
  login: ({ username, password, role }: { username: string; password: string; role: Role }) => void;
  isLoading: boolean;
}>({
  user: null,
  logout: () => {},
  login: () => {},
  isLoading: false,
});
const ignoreAuthRoutes = ['/login', '/register', '/admin/login', '/admin/register'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await checkAuth();
        if (user) {
          return user;
        }
        return null;
      } catch (error) {
        if (ignoreAuthRoutes.includes(window.location.pathname)) {
          return null;
        }
        if (
          error instanceof Error &&
          error.cause instanceof Response &&
          error.cause.status === 401
        ) {
          navigate('/login');
        }
        throw error;
      }
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
      window.location.reload();
    },
  });
  const { mutate: login } = useMutation({
    mutationFn: ({
      username,
      password,
      role,
    }: {
      username: string;
      password: string;
      role: Role;
    }) => loginApi(username, password, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  useEffect(() => {
    if (error && error.cause instanceof Response && error.cause.status === 401) {
      // navigate('/login');
    }
  }, [error, navigate]);

  return (
    <authContext.Provider value={{ user: user ?? null, logout, login, isLoading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

