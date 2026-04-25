import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
