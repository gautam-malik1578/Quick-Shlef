import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ProcessPdf } from "../services/processPdf";
export function useProcessPdf() {
  const { type } = useParams();
  let url = "";
  let successText = "";
  if (type == "append-pdf") {
    url = "pdf/append";
    successText = "pdf appended";
  } else if (type == "trim-pdf") {
    url = "pdf/trim";
    successText = "trimed pdf";
  } else {
    // lock-pdf
    url = "pdf/password";
    successText = "password set";
  }

  const { mutate, isLoading } = useMutation({
    mutationKey: ["conversionPdf", url],
    mutationFn: async (data) => await ProcessPdf(url, data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(successText);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isLoading };
}
