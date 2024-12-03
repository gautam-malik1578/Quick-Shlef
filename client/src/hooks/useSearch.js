import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { searchBook } from "../services/search";
import { buildString } from "../utility/buildstring";
export function UseSearch() {
  const prefrance = useSelector((state) => state.search);
  const searchquery = buildString(prefrance);
  console.log("this is the steing made by build query", searchquery);
  const { data, isLoading } = useQuery({
    queryKey: ["searchBook", searchquery],
    queryFn: async () => await searchBook(searchquery),
    onSuccess: (data) => {
      console.log("this is what we got from data ", data);
      if (data?.results != 0) {
        toast.success(`found ${data?.results} books`);
      } else {
        toast.error("found no such book");
      }
    },
    staleTime: 1000 * 60 * 60, // 60 min cache time here as this data will not change
  });
  return { data, isLoading };
}
