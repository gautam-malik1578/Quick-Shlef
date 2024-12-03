import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup } from "../services/Signup";
export function useSignup() {
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => await signup(data),
    onError: (err) => {
      if (err.message.startsWith("E11000")) {
        err.message = "Email already exist!";
      }
      toast.error(`Error:${err.message}`);
    },
  });
  return { mutate, error, isLoading };
}
