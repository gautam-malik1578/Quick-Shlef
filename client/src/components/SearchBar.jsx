import { HiOutlineSearch } from "react-icons/hi";
import { HiFilter } from "react-icons/hi";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchString, showFilterBox } from "../slices/searchSlice";
import { useForm } from "react-hook-form";
import { UseSearch } from "../hooks/useSearch";
function SearchBar() {
  const dispatch = useDispatch();
  const showFilter = useSelector((state) => state.search.showFilterBox);
  const searchString = useSelector((state) => state.search.searchString);
  // Use the custom hook at the top level
  const { data, isLoading } = UseSearch();
  console.log(data);

  // Submit handler for the form
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log("Search triggered with query:", searchString);
  //   // Use search functionality triggered by the hook
  // };
  console.log(searchString);
  // console.log("the value of showFilterBox is", showFilter);
  const { register, reset, handleSubmit } = useForm();
  return (
    <form
      className={styles.searchbar}
      onSubmit={(e) => {
        e.preventDefault();
        // handleSearch();
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
        value={searchString}
        onChange={(e) => {
          dispatch(setSearchString({ searchString: e.target.value }));
        }}
      />
      <label
        htmlFor="searchString"
        onClick={(e) => {
          // handleSearch();
        }}
      >
        <HiOutlineSearch className={styles.iconSearch} />
      </label>
    </form>
  );
}

export default SearchBar;
