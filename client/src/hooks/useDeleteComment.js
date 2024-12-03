import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCommentsOnABook } from "../services/Commnets";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["delete comment"],
    mutationFn: async (id) => await deleteCommentsOnABook(id, token),
    onSuccess: (data) => {
      toast.success("deleted your comment");
      queryClient.refetchQueries(["getCommnets", id]);
      queryClient.invalidateQueries(["getCommnets", id]);
    },
  });
  return { mutate, isLoading };
}
