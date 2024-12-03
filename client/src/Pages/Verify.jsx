import Loader from "../components/Loader";
import styles from "./Verify.module.css";
import otpAnnimation from "../annimations/otpAnnimation.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetOtp } from "../hooks/useGetOtp";
import toast from "react-hot-toast";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
function Verify() {
  const [askingForOtp, setAskingForOtp] = useState(true);
  const [email, setEmail] = useState(null);
  return (
    <div className={styles.verifywrapper}>
      <div className={styles.verify}>
        <h3 className={styles.verifyhead}>Verify with OTP</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={otpAnnimation} text="" />
        </div>
        {askingForOtp ? (
          <AskOtp toggle={setAskingForOtp} />
        ) : (
          <VerifyOtp toggle={setAskingForOtp} />
        )}
        <p className={styles.info}> OTP valid for 15 min only </p>
        <p className={styles.info}>Plz check for mail in spam as well </p>
      </div>
    </div>
  );
}
function AskOtp({ toggle }) {
  const navigator = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const { mutate, error, isLoading: isSending } = useGetOtp();
  function onhandleSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("OTP sent");
        toggle(false);
        reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }
  function onSubmitError(err) {}
  return (
    <form onSubmit={handleSubmit(onhandleSubmit, onSubmitError)}>
      <div className={styles.formFeild}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "plz provide the email",
            },
          })}
          placeholder="abc@gmail.com"
          required={true}
        />
      </div>
      <div className={styles.btnbox}>
        <button className={styles.redbtn}>
          {isSending ? "sending" : "Send OTP"}
        </button>
        <button
          className={styles.otherbtn}
          onClick={(e) => {
            e.preventDefault();
            navigator("/login");
          }}
        >
          login
        </button>
      </div>
    </form>
  );
}
function VerifyOtp({ toggle }) {
  const navigator = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const { mutate, error, isLoading: isverifying } = useVerifyOtp();
  function onhandleSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Account Verified! plz login ");
        reset();
        navigator("/login");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }
  function onSubmitError(err) {
    // Extract errors and iterate over them
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
  }
  return (
    <form onSubmit={handleSubmit(onhandleSubmit, onSubmitError)}>
      <div className={styles.formFeild}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="abc@gmail.com"
          {...register("email", {
            required: {
              value: true,
              message: "plz provide the email",
            },
          })}
          required={true}
        />
      </div>
      <div className={styles.formFeild}>
        <label htmlFor="otp">OTP</label>
        <input
          type="number"
          id="otp"
          placeholder="****"
          required={true}
          {...register("otp", {
            validate: (value) => {
              if (value < 1000 || value > 9999) return "otp is of 4 digits";
              else return true;
            },
          })}
        />
      </div>
      <div className={styles.btnbox}>
        <button className={styles.redbtn}>
          {isverifying ? "verifying" : "verify"}
        </button>
        <button
          className={styles.askotpbtn}
          onClick={(e) => {
            e.preventDefault();
            toggle(true);
          }}
        >
          Ask OTP
        </button>
      </div>
    </form>
  );
}
export default Verify;
