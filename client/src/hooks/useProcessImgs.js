import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { proceesImg } from "../services/processImgs";
import toast from "react-hot-toast";
export function useProcessimgs() {
  const { type } = useParams();
  const quryUrl = type.replaceAll("-", "/").replace("to", "convert");
  const { mutate, isLoading } = useMutation({
    mutationKey: ["proceesImg", quryUrl],
    mutationFn: async (data) => await proceesImg(quryUrl, data),
    onSuccess: (data) => {
      toast.success("conversion successful");
    },
    onError: (err) => {
      toast.error("something went wrong! check console");
      console.log(err.message);
    },
  });
  return { mutate, isLoading };
}
