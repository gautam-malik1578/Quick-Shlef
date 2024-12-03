import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterBox.module.css";
import {
  hideFilterBox,
  searchTypeToAuthor,
  searchTypeToTitle,
  setGenre,
  setIsAvailable,
  setMaxSize,
  setReleasedYear,
} from "../slices/searchSlice";
function FilterBox() {
  const showFilterBox = useSelector((state) => state.search.showFilterBox);
  const dispatch = useDispatch();
  const { searchtype, releasedYear, isAvaliable, maxSize, genre } = useSelector(
    (state) => state.search
  );
  const handleGenreChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let updatedGenres = [...genre]; // Copy the current genres array

    if (isChecked) {
      updatedGenres.push(value); // Add the checked genre
    } else {
      updatedGenres = updatedGenres.filter((g) => g !== value); // Remove the unchecked genre
    }

    dispatch(setGenre({ genre: updatedGenres })); // Dispatch updated genres to Redux
  };

  if (!showFilterBox) return null; // we show nothing mate
  return (
    <div className={styles.filterboxoverlay}>
      <div className={styles.filterbox}>
        <h2 className={styles.filterboxhead}>Filter your search</h2>
        <form
          onSubmit={(E) => E.preventDefault()}
          className={styles.filterboxform}
        >
          <div className={styles.filterboxItem}>
            <label htmlFor="searchType">search Book via</label>
            <select
              id="searchType"
              value={searchtype === "title" ? "title" : "author"}
              onChange={(e) => {
                if (e.target.value === "title") {
                  dispatch(searchTypeToTitle());
                } else dispatch(searchTypeToAuthor());
              }}
            >
              <option value="title">book Title</option>
              <option value="author">author</option>
            </select>
          </div>
          <div className={styles.filterboxItem}>
            <label htmlFor="releasedYear">Released Before</label>
            <input
              type="number"
              id="releasedYear"
              min={0}
              max={3000}
              defaultValue={2012}
              value={releasedYear}
              onChange={(e) => {
                dispatch(setReleasedYear({ releasedYear: e.target.value }));
              }}
              required={true}
            />
          </div>
          <div className={styles.filterboxItem}>
            <label htmlFor="isAvailable">Is Availabe</label>
            <select
              id="isAvailable"
              value={isAvaliable}
              onChange={(e) => {
                dispatch(setIsAvailable({ isAvaliable: e.target.value }));
              }}
            >
              <option value="0">Both</option>
              <option value="-1">Only Available</option>
              <option value="1">Not Available</option>
            </select>
          </div>
          <div className={styles.filterboxItem}>
            <label htmlFor="genres">Genre</label>
            <div id="genres">
              {[
                "any",
                "horror",
                "crime",
                "mystery",
                "thriller",
                "fantasy",
                "romance",
                "adventure",
                "drama",
                "biography",
                "comedy",
                "technology",
              ].map((genreX) => (
                <label key={genreX}>
                  <input
                    type="checkbox"
                    value={genreX}
                    onChange={handleGenreChange}
                    checked={genre.includes(genreX)}
                  />
                  {genreX.charAt(0).toUpperCase() + genreX.slice(1)}
                </label>
              ))}
            </div>
          </div>{" "}
          <div className={styles.filterboxItem}>
            <label htmlFor="maxSize">{`Max Size ${maxSize}MB`}</label>
            <input
              id="maxSize"
              type="range"
              min="1"
              max="6"
              value={maxSize}
              onChange={(e) => {
                dispatch(setMaxSize({ maxSize: e.target.value }));
              }}
              // onChange={handleMaxChange}
            />
          </div>
          <button
            type="submit"
            className={styles.filterboxbtn}
            onClick={() => {
              dispatch(hideFilterBox());
            }}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default FilterBox;
