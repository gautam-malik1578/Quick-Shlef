import { useNavigate } from "react-router-dom";
import styles from "./BookItem.module.css";

function BookItem({ data }) {
  // console.log("this is booke itema with data", data);
  const navigator = useNavigate();
  return (
    <figure
      className={styles.BookItemFig}
      onClick={() => {
        navigator(`/bookDetail/${data._id}`);
      }}
    >
      <img src={data?.imgUrl} alt="book.jpg" className={styles.BookItemImg} />
    </figure>
  );
}

export default BookItem;
// book item the pic will come here
