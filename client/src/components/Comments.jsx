import { useParams } from "react-router-dom";
import { useGetComments } from "../hooks/useGetComments";
import styles from "./Comments.module.css";
import Comment from "./Comment";
import Loader from "./Loader";
import loginAnnimation from "../annimations/Loading.json";
import notfoundrobot from "../annimations/notfoundrobot.json";
function Comments({ setShow }) {
  const { id } = useParams();
  const { data, isLoading } = useGetComments();
  if (isLoading) {
    return (
      <div className={styles.annimationbox}>
        <Loader
          height={100}
          width={100}
          anni={loginAnnimation}
          text="loading..."
        />
      </div>
    );
  }
  if (data?.results == 0) {
    return (
      <div className={styles.annimationbox}>
        <Loader
          height={100}
          width={100}
          anni={notfoundrobot}
          text="No comments found!"
        />
      </div>
    );
  }
  return (
    <div className={styles.comments}>
      <p>we found {data.results} comments on this book</p>
      {data.comments.map((comment) => (
        <Comment key={comment?._id} data={comment} setShow={setShow} />
      ))}
      {/* <Comment setShow={setShow} />
      <Comment setShow={setShow} />
      <Comment setShow={setShow} /> */}
    </div>
  );
}

export default Comments;
