import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../services/OTP";
export function useVerifyOtp() {
  const { mutate, error, isLoading, isPending } = useMutation({
    mutationKey: ["verifyotp"],
    mutationFn: async (data) => verifyOtp(data),
  });
  return { mutate, error, isLoading };
}
