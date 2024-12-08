import Loader from "../components/Loader";
import styles from "./Me.module.css";
import MeAnnimation from "../annimations/MeAnnimation.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../slices/userSlice";
function Me() {
  const navigator = useNavigate();
  const { username, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={styles.Mewrapper}>
      <div className={styles.Me}>
        <h3 className={styles.MeHead}>My Profile</h3>
        <div className={styles.annimationbox}>
          <Loader height={100} width={100} anni={MeAnnimation} text="" />
        </div>
        <div className={styles.Memeta}>
          <div className={styles.MeItem}>
            <p>Username:</p>
            <p>{username}</p>
          </div>
          <div className={styles.MeItem}>
            <p>Email:</p>
            <p>{email}</p>
          </div>
          <div className={styles.MeItem}>
            <p>Role:</p>
            <p>Reader</p>
          </div>
        </div>
        <div className={styles.btnbox}>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(LogoutUser());
              toast.success("logging out ✋");
              navigator("/");
            }}
          >
            Logout
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator("/");
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Me;
