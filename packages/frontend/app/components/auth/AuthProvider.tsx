import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: checkAuth,
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
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

