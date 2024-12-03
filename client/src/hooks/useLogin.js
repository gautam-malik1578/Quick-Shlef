import { useMutation } from "@tanstack/react-query";
import { login } from "../services/Login";
import { useDispatch } from "react-redux";
import { setUserData } from "../slices/userSlice";
import { toast } from "react-hot-toast";
export function useLogin() {
  const dispatch = useDispatch();
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => await login(data),
    onSuccess: (data) => {
      console.log("this is the data n onsucces in user login ", data);
      dispatch(
        setUserData({
          userId: data?.user._id,
          username: data?.user.username,
          token: data?.token,
          email: data?.user.email,
        })
      );
      toast.success(`welcome Back ${data.user.username}!`);
    },
    onError: (err) => {
      console.log("the error in uselogin is --->>", err.message);
      if (err.message.startsWith("E11000")) {
        err.message = "Email already exist!";
      }
      toast.error(`Error:${err.message}`);
    },
  });
  return { mutate, error, isLoading };
}
