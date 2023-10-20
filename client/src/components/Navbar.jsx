import { Link } from "react-router-dom";
import classes from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={`${classes.container} container`}>
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div className={classes.links}>
          <Link to="/">Home</Link>
          <Link to="/users">Photographers</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
