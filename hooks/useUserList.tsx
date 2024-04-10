import { Media } from "@/types/typings";
import useSWR from "swr";

interface Props {
  data: {
    list: Media[];
  };
}

const useUserList = () => {
  const { data, mutate, error, isLoading, isValidating } = useSWR<Props>(
    "/api/v1/user-list",
    { revalidateOnFocus: false }
  );
  return {
    userList: data?.data.list,
    mutate,
    error,
    isLoading,
    isValidating,
  };
};

export default useUserList;
