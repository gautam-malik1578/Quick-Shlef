import Loader from "../components/Loader";
import styles from "./Signup.module.css";
import signupAnnimation from "../annimations/signupAnnimation.json";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigator = useNavigate();
  return (
    <div className={styles.signupwrapper}>
      <div className={styles.signup}>
        <h3 className={styles.signuphead}>Register for free!</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={signupAnnimation} text="" />
        </div>
        <form>
          <div className={styles.formFeild}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              placeholder="enter your username"
              required={true}
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="abc@gmail.com"
              required={true}
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="passowrd">Password</label>
            <input
              type="password"
              id="password"
              required={true}
              placeholder="********"
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="confirmpassowrd">confirm Password</label>
            <input
              type="password"
              id="confirmpassowrd"
              required={true}
              placeholder="********"
            />
          </div>
          <div className={styles.btnbox}>
            <button className={styles.loginbtn}>Signup</button>
            <button
              className={styles.otherbtn}
              onClick={(e) => {
                e.preventDefault();
                navigator(-1);
              }}
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
