import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/search";
export function useGetBookDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getbookDetail", id],
    queryFn: async () => await getBookById(id),
  });
  return { data, isLoading };
}
