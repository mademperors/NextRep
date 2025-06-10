import { NavLink } from 'react-router';

export function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="text-2xl font-bold font-fugaz">
          NextRep
        </NavLink>
        <NavLink to="/challenges">Challenges</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink to="/login" className="text-sm border rounded-md px-4 py-2 hover:bg-muted">
          Login
        </NavLink>
      </div>
    </nav>
  );
}
