import { HiOutlineSearch } from "react-icons/hi";
import { HiFilter } from "react-icons/hi";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showFilterBox } from "../slices/searchSlice";
function SearchBar() {
  const dispatch = useDispatch();
  const showFilter = useSelector((state) => state.search.showFilterBox);
  console.log("the value of showFilterBox is", showFilter);
  return (
    <form
      className={styles.searchbar}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <HiFilter
        className={styles.icon}
        onClick={() => {
          dispatch(showFilterBox());
          //   console.log("called the fun to show filter box");
        }}
      />
      <input
        type="text"
        id="searchString"
        className={styles.inputfeild}
        placeholder="Search here ..."
      />
      <label htmlFor="searchString">
        <HiOutlineSearch className={styles.icon} />
      </label>
    </form>
  );
}

export default SearchBar;
