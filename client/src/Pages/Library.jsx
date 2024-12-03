import BookItem from "../components/BookItem";
import { UseSearch } from "../hooks/useSearch";
import searchAnnimation from "../annimations/searching.json";
import NotFoundAnnimation from "../annimations/notfoundfile.json";
import styles from "./Library.module.css";
import Loader from "../components/Loader";

function Library() {
  const { data, isLoading } = UseSearch();

  return (
    <div className={styles.librarywrapper}>
      {isLoading ? (
        <div className={styles.annimationbox}>
          <Loader
            height={200}
            width={200}
            anni={searchAnnimation}
            text="searching..."
          />
        </div>
      ) : data.results !== 0 ? (
        <div className={styles.library}>
          <p className={styles.summary}>
            we found {data.results} results for you
          </p>

          <div className={styles.booksbox}>
            {data.data.books.map((book) => (
              <BookItem key={book.title} data={book} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.annimationbox}>
          <Loader
            height={200}
            width={200}
            anni={NotFoundAnnimation}
            text="We could not find anything related"
          />
        </div>
      )}
    </div>
  );
}

export default Library;
