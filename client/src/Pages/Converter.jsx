import { useNavigate } from "react-router-dom";
import ToolsBox from "../components/ToolsBox";
import styles from "./Converter.module.css";
function Converter() {
  const navigator = useNavigate();
  return (
    <div className={styles.Converter}>
      <h2 className={styles.header}>
        Tools to get the file you want <br />
        the way you want
      </h2>
      <div className={styles.toolsboxCover}>
        <ToolsBox />
      </div>
      <button
        className={styles.backbtn}
        onClick={(e) => {
          e.preventDefault();
          navigator(-1);
        }}
      >
        &larr;
      </button>
    </div>
  );
}

export default Converter;
