import { useForm } from "react-hook-form";
import { useUpdateComments } from "../hooks/useUpdateComment";
import { useSelector } from "react-redux";
import styles from "./UpdateCommentForm.module.css";
import loginAnnimation from "../annimations/Loading.json";
import Loader from "./Loader";
function UpdateCommentForm({ setShow }) {
  const { commentId, commentText } = useSelector((state) => state.other);
  const { username } = useSelector((state) => state.user);
  const { register, reset, handleSubmit } = useForm();
  const { mutate, isLoading } = useUpdateComments();
  function onhandlesubmit(data) {
    data.id = commentId;
    data.username = username || "unknown user";
    mutate(data, {
      onSuccess: () => {
        reset();
        setShow("comment");
      },
    }); // rest can be done furthur mate
  }
  function onsubmitError(err) {
    // we are not going to get any submit err here mate
  }
  return (
    <div className={styles.CreateCommentFormWrapper}>
      {isLoading ? (
        <div className={styles.annimationbox}>
          <Loader
            height={100}
            width={100}
            anni={loginAnnimation}
            text="processing..."
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onhandlesubmit, onsubmitError)}
          className={styles.createform}
        >
          <label htmlFor="text">Update your comment</label>
          <textarea
            className={styles.textarea}
            name=""
            id="text"
            minLength={1}
            required={true}
            defaultValue={commentText}
            {...register("comment")}
            placeholder="enter your thought here...."
          ></textarea>
          <button className={styles.btn} disabled={isLoading}>
            {isLoading ? "updating" : "update"}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateCommentForm;
