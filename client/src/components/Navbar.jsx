import { Link } from "react-router-dom";
import { IoIosHammer } from "react-icons/io";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Logo />
      <SearchBar />
      <div className={styles.links}>
        <Link to="/converter">
          <IoIosHammer className={styles.icon} />
          <span>tools</span>
        </Link>
        {/* <Link to="/library">libarary</Link> */}
        <Link to="/login" className={styles.login}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
