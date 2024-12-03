import Loader from "../components/Loader";
import styles from "./Signup.module.css";
import signupAnnimation from "../annimations/signupAnnimation.json";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import toast from "react-hot-toast";
function Signup() {
  const navigator = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { mutate, error: signupError, isLoading: isSigningup } = useSignup();
  function onHandleSubmit(data) {
    console.log("the data we get when we submit the form", data);
    mutate(data, {
      onSuccess: (data) => {
        toast.success("User registered! plz verify🙏");
        reset();
        navigator("/verify");
      },
      onError: () => {
        // reset();
      },
    });
  }
  function onSubmitError(err) {
    console.log("An error happened on submit", err);

    // Extract errors and iterate over them
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
  }

  return (
    <div className={styles.signupwrapper}>
      <div className={styles.signup}>
        <h3 className={styles.signuphead}>Register for free!</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={signupAnnimation} text="" />
        </div>
        <form onSubmit={handleSubmit(onHandleSubmit, onSubmitError)}>
          <div className={styles.formFeild}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "plz provide a username",
                },
                minLength: {
                  value: 2,
                  message: "the username must be 2 char long",
                },
                maxLength: {
                  value: 8,
                  message: "the username must not be more than 8 char long",
                },
              })}
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
              {...register("email", {
                required: {
                  value: true,
                  message: "plz give an email id",
                },
              })}
              required={true}
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="passowrd">Password</label>
            <input
              type="password"
              id="password"
              required={true}
              {...register("password", {
                required: { value: true, message: "plz provide a password" },
                minLength: {
                  value: 8,
                  message: "the password must be eight char long",
                },
              })}
              placeholder="********"
            />
          </div>
          <div className={styles.formFeild}>
            <label htmlFor="confirmpassowrd">confirm Password</label>
            <input
              type="password"
              id="confirmpassowrd"
              required={true}
              {...register("confirmPassword", {
                validate: (value) => {
                  return (
                    value === watch("password") || "the password must match"
                  );
                },
              })}
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
