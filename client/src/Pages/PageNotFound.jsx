import styles from "./PageNotFound.module.css";
import loginAnnimation from "../annimations/notfoundrobot.json";
import Loader from "../components/Loader";
function PageNotFound() {
  return (
    <div className={styles.PageNotFound}>
      <div className={styles.annimationbox}>
        <Loader
          height={100}
          width={100}
          anni={loginAnnimation}
          text="Page not found"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
