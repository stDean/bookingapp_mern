import { Link } from "react-router-dom";

import "./navbar.styles.css";
import { useUser } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">deanbookings</span>
        </Link>
        {user ? (
          user?.username.toUpperCase()
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">
              <a href="/login">Login</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
