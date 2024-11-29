import styles from "./BookItem.module.css";
function BookItem() {
  return (
    <figure className={styles.BookItemFig}>
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
