import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink to="/">Products</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/users">Users</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/todos">Todos</NavLink>
          </li>
          <li className="navbar__item navbar__item--right">
            <NavLink to="/sign">Sign In</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
