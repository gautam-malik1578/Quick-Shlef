import { useDispatch, useSelector } from "react-redux";
import styles from "./Comment.module.css";
import { setCommentIDAndText } from "../slices/otherSlice";
import { useDeleteComment } from "../hooks/useDeleteComment";
function Comment({ setShow, data }) {
  const dispatch = useDispatch();
  const { mutate, isLoading } = useDeleteComment();
  const { userId } = useSelector((state) => state.user);
  function handleDelete() {
    mutate(data._id);
  }
  function handleUpdate() {
    dispatch(
      setCommentIDAndText({
        commentText: data?.comment || "my commnext ",
        commentId: data?._id,
      })
    );
    setShow("update");
  }
  return (
    <div className={styles.comment}>
      <div className={styles.meta}>
        <span className={styles.name}>{data?.username}</span>
        <span>{data?.Time.split("T")[0] || "12/12/24"}</span>
      </div>
      <div className={styles.content}>{data?.comment}</div>
      {data.user == userId ? (
        <div className={styles.actionBtns}>
          <button
            onClick={() => {
              handleDelete();
            }}
            disabled={isLoading}
          >
            {isLoading ? "deleting" : "delete"}
          </button>
          <button
            onClick={() => {
              handleUpdate();
            }}
          >
            update
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
