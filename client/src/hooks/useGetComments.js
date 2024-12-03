import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCommentsOnABook } from "../services/Commnets";
import toast from "react-hot-toast";
export function useGetComments() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getCommnets", id],
    queryFn: async () => await getCommentsOnABook(id),
    onSuccess: (data) => {
      if (data?.results > 0) {
        toast.success(`${data?.results} comments found`);
      }
    },
    onError: (err) => {
      toast.error("we had an error on th erequest ");
    },
  });
  return { data, isLoading };
}
