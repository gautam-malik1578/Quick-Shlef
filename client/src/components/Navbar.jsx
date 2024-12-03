import { Link } from "react-router-dom";
import { IoIosHammer } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("the value of is logged in is ??", isLoggedIn);
  return (
    <div className={styles.navbar}>
      <Logo />
      <SearchBar />
      <div className={styles.links}>
        <Link to="/converter">
          <IoIosHammer className={styles.icon} />
          <span>tools</span>
        </Link>
        {isLoggedIn ? (
          <Link to="/me">
            <IoIosContact className={styles.icon} />
            <span>User</span>
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
