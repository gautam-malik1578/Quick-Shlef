import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { updateCommentsOnABook } from "../services/Commnets";
import { useParams } from "react-router-dom";
export function useUpdateComments() {
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => state.user);
  const { id } = useParams(); // no need
  const { mutate, isLoading } = useMutation({
    mutationKey: ["updateAcomment"],
    mutationFn: async (data) => await updateCommentsOnABook(data, token), // the data shall have the comment id
    onSuccess: (data) => {
      toast.success("updated your comment");
      // here we need to invalidate the content as well
      queryClient.invalidateQueries(["getCommnets", id]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isLoading };
}
