import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../services/processImgs";
import toast from "react-hot-toast";
export function useDownload() {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["downloadFile"],
    mutationFn: async (url) => await downloadFile(url),
    onSuccess: () => {
      toast.success("file downloaded");
    },
    onError: (err) => {
      toast.error(err.message || "something went wrong");
    },
  });
  return { mutate, isLoading };
}
