import BookItem from "../components/BookItem";

function Library() {
  return (
    <div>
      <p>we found 9 results for you</p>
      {/* <br /> */}
      <div>
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
    </div>
  );
}

export default Library;
