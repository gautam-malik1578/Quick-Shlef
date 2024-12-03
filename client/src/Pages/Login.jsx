import styles from "./Login.module.css";
import Loader from "../components/Loader";
import loginAnnimation from "../annimations/loginAnnimation.json";
import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLogin } from "../hooks/useLogin";
function Login() {
  const navigator = useNavigate();
  const { mutate, error: LoginError, isLoading: isLogging } = useLogin();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onHandleSubmit(data) {
    console.log("the data we got in on handle submit is,", data);
    mutate(data, {
      onSuccess: () => {
        reset;
        navigator("/");
      },
    });
  }
  function onSubmitError(err) {
    console.log("this is onSubmit error we have,", err);
  }
  return (
    <div className={styles.loginwrapper}>
      <div className={styles.login}>
        <h3 className={styles.loginhead}>Login to your Account</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={loginAnnimation} text="" />
        </div>
        <form onSubmit={handleSubmit(onHandleSubmit, onSubmitError)}>
          <div className={styles.formFeild}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "plz provide an email",
                },
              })}
              placeholder="abc@gmail.com"
              required={true}
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="passowrd">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "plz provide a password",
                },
              })}
              required={true}
              placeholder="1!wecty%"
            />
          </div>
          <div className={styles.btnbox}>
            <button
              type="submit"
              className={styles.loginbtn}
              // onClick={(e) => {
              //   // e.preventDefault();

              //   console.log("we will call the toat now ");
              //   toast.success("hello from toast");
              // }}
            >
              {isLogging ? "Processing" : "Login"}
            </button>
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
