import { useAuth } from '~/components/auth/AuthProvider';
import { Role } from '~/constants/enums/roles.enum';

export const useMember = () => {
  const { user } = useAuth();

  if (user?.role === Role.MEMBER) {
    return user;
  }

  return null;
};

