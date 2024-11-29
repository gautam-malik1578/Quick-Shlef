import Navbar from "./components/Navbar";
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
import SearchBar from "./components/SearchBar";
function AppLayout() {
  return (
    <div className={styles.applayout}>
      <Navbar />
      {/* <SearchBar /> */}
      <Outlet />
    </div>
  );
}

export default AppLayout;
