import { useNavigate } from "react-router-dom";
import styles from "./BookItem.module.css";

function BookItem() {
  const navigator = useNavigate();
  return (
    <figure
      className={styles.BookItemFig}
      onClick={() => {
        navigator("/bookDetail/12345");
      }}
    >
      <img
        src="https://www.elocalshops.com/cdn/shop/products/IMG_20210709_132845_512x759.jpg?v=1625817588"
        alt="book.jpg"
        className={styles.BookItemImg}
      />
    </figure>
  );
}

export default BookItem;
// book item the pic will come here
