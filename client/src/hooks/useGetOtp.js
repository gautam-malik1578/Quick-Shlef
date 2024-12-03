import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../services/OTP";
export function useGetOtp() {
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["getotp"],
    mutationFn: async (data) => getOtp(data),
  });
  return { mutate, error, isLoading };
}
