import styles from "./Login.module.css";
import Loader from "../components/Loader";
import loginAnnimation from "../annimations/loginAnnimation.json";
// import loginAnnimation from "../annimations/processingFile.json";
import { useNavigate, useNavigation } from "react-router-dom";
function Login() {
  const navigator = useNavigate();
  return (
    <div className={styles.loginwrapper}>
      <div className={styles.login}>
        <h3 className={styles.loginhead}>Login to your Account</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={loginAnnimation} text="" />
        </div>
        <form
          onClick={(e) => {
            e.preventDefault();
          }}
        >
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
              placeholder="1!wecty%"
            />
          </div>
          <div className={styles.btnbox}>
            <button className={styles.loginbtn}>Login</button>
            <p>not have an account? signup!</p>
            <button
              className={styles.otherbtn}
              onClick={(e) => {
                e.preventDefault();
                navigator("/signup");
              }}
            >
              Signup
            </button>
            <p>not verified? verifiy now!!</p>
            <button
              className={styles.otherbtn}
              onClick={(e) => {
                e.preventDefault();
                navigator("/verify");
              }}
            >
              verfiy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
