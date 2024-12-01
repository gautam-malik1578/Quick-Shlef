import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterBox.module.css";
import { hideFilterBox } from "../slices/searchSlice";
function FilterBox() {
  const showFilterBox = useSelector((state) => state.search.showFilterBox);
  const dispatch = useDispatch();
  if (!showFilterBox) return null; // we show nothing mate
  return (
    <div className={styles.filterboxoverlay}>
      <div className={styles.filterbox}>
        <h2>Filter your search</h2>
        <form onSubmit={(E) => E.preventDefault()}>
          <div>
            <label htmlFor="searchType">search for</label>
            <select id="searchType">
              <option value="title">book</option>
              <option value="author">author</option>
            </select>
          </div>
          <div>
            <label htmlFor="releasedYear">Released Before</label>
            <input
              type="number"
              id="releasedYear"
              min={0}
              max={3000}
              defaultValue={2012}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="isAvailable">Is Availabe</label>
            <select id="isAvailable">
              <option value="0">Both</option>
              <option value="-1">Only Available</option>
              <option value="1">Not Available</option>
            </select>
          </div>

          <div>
            {/* Genre Selection */}
            <label htmlFor="genres">Genre</label>
            <div id="genres">
              <label>
                <input type="checkbox" value="horror" />
                Horror
              </label>
              <label>
                <input type="checkbox" value="crime" />
                Crime
              </label>
              <label>
                <input type="checkbox" value="mystery" />
                Mystery
              </label>
              <label>
                <input type="checkbox" value="thriller" />
                Thriller
              </label>
              <label>
                <input type="checkbox" value="fantasy" />
                fantasy
              </label>
              <label>
                <input type="checkbox" value="romance" />
                Romance
              </label>
              <label>
                <input type="checkbox" value="adventure" />
                Adventure
              </label>
              <label>
                <input type="checkbox" value="drama" />
                Drama
              </label>
              <label>
                <input type="checkbox" value="biography" />
                Biography
              </label>
              <label>
                <input type="checkbox" value="comedy" />
                Comedy
              </label>
              <label>
                <input type="checkbox" value="any" defaultChecked />
                Any
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="maxSize">Max Size:</label>
            <input
              id="maxSize"
              type="range"
              min="1"
              max="6"
              defaultValue={1}
              // value={maxSize}
              // onChange={handleMaxChange}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              dispatch(hideFilterBox());
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default FilterBox;
