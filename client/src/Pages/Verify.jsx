import Loader from "../components/Loader";
import styles from "./Verify.module.css";
import otpAnnimation from "../annimations/otpAnnimation.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <form>
      <div className={styles.formFeild}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="abc@gmail.com"
          required={true}
        />
      </div>
      <div className={styles.btnbox}>
        <button
          className={styles.redbtn}
          onClick={(e) => {
            e.preventDefault();
            toggle(false);
          }}
        >
          Send OTP
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
  return (
    <form>
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
        <label htmlFor="otp">OTP</label>
        <input type="number" id="otp" placeholder="****" required={true} />
      </div>
      <div className={styles.btnbox}>
        <button className={styles.redbtn}>verify</button>
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
