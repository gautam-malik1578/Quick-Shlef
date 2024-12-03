import { useForm } from "react-hook-form";
import { useMakeComments } from "../hooks/useMakeComments";
import styles from "./CreateCommentForm.module.css";
import Loader from "./Loader";
import loginAnnimation from "../annimations/Loading.json";
import { useSelector } from "react-redux";
function CreateCommentForm({ setShow }) {
  const { register, reset, handleSubmit } = useForm();
  const { mutate, isLoading } = useMakeComments();
  const { username } = useSelector((state) => state.user);
  function onhandlesubmit(data) {
    data.username = username;
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
          className={styles.createform}
          onSubmit={handleSubmit(onhandlesubmit, onsubmitError)}
        >
          <label htmlFor="text">Enter your comment</label>
          <textarea
            className={styles.textarea}
            name=""
            id="text"
            minLength={1}
            required={true}
            {...register("comment")}
            placeholder="enter your thought here...."
          ></textarea>
          <button className={styles.btn} disabled={isLoading}>
            {isLoading ? "creating" : "create"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateCommentForm;
