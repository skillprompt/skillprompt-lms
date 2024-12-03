import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-red-500 px-4' : 'text-white px-4'
        }
      >
        Student
      </NavLink>
      <NavLink
        to="/instructor"
        className={({ isActive }) =>
          isActive ? 'text-red-500 px-4' : 'text-white px-4'
        }
      >
        Instructor
      </NavLink>
    </nav>
  );
};

export default Navbar;
