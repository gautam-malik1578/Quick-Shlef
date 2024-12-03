import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCommentsOnABook } from "../services/Commnets";

export function useMakeComments() {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user?.token) || ""; // Handle undefined token
  const { id } = useParams();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["makeAComment", id],
    mutationFn: async (data) => await createCommentsOnABook(data, id, token),
    onSuccess: () => {
      toast.success("Comment added successfully!");
      queryClient.invalidateQueries(["getCommnets", id]); // Invalidate comments query
    },
    onError: (err) => {
      toast.error(err.message || "Error creating comment.");
    },
  });

  return { mutate, isLoading };
}
