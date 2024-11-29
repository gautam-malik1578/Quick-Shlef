import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logo}>
      <figure>
        <img src="./logo.jpeg" alt="logo" />
      </figure>
      <span className={styles.span}>QuickShelf</span>
    </div>
  );
}

export default Logo;
