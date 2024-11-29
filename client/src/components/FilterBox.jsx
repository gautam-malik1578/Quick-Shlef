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
        this is the pop up dialugoe box to sety the filter on search
        <button
          onClick={() => {
            dispatch(hideFilterBox());
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}

export default FilterBox;
