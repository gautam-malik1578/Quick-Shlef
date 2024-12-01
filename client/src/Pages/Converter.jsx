import ToolsBox from "../components/ToolsBox";
import styles from "./Converter.module.css";
function Converter() {
  return (
    <div>
      <h2 className={styles.header}>
        Tools to get the file you want,the way you want
      </h2>
      <div className={styles.toolsboxCover}>
        <ToolsBox />
      </div>
    </div>
  );
}

export default Converter;
