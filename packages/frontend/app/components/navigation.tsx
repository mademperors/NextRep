import { NavLink } from 'react-router';
import { Role } from '~/constants/enums/roles.enum';
import { useAuth } from './auth/AuthProvider';
import { Button } from './ui/button';

export function Navigation() {
  const { user, logout, isLoading } = useAuth();
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="text-2xl font-bold font-fugaz">
          NextRep
        </NavLink>
        {!isLoading && (
          <>
            {user && user.role === Role.ADMIN && <></>}
            {user && user.role === Role.MEMBER && (
              <>
                <NavLink to="/challenges">Challenges</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user && !isLoading ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <NavLink to="/login" className="text-sm border rounded-md px-4 py-2 hover:bg-muted">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

