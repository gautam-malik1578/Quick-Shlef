import styles from "./Tool.module.css";
import { useNavigate } from "react-router-dom";
function Tool({ data }) {
  const navigator = useNavigate();
  return (
    <div
      className={styles.tool}
      onClick={() => {
        navigator(`/tool/${data.url}`);
      }}
    >
      <figure className={styles.figureItem}>
        <img src="./logo.jpeg" alt="item" />
      </figure>
      <h3 className={styles.toolName}>{data?.type}</h3>
      <p className={styles.tooldescription}>{data?.text}</p>
    </div>
  );
}

export default Tool;
