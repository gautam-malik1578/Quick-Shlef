import Lottie from "react-lottie";
import styles from "./Loader.module.css";
import areoplane from "../annimations/Loading.json";
function Loader({
  text = "loading",
  height = 150,
  width = 150,
  anni = areoplane,
  showText = true,
}) {
  // return <div className={styles.loader}>loading.....</div>;
  return (
    <div className={styles.loader}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: anni,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={height}
        width={width}
        isClickToPauseDisabled={true}
      />
      {showText ? <p>{text}</p> : null}
    </div>
  );
}

export default Loader;
