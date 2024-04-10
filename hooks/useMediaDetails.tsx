import { MediaDetails, MediaType } from "@/types/typings";
import useSWR from "swr";

interface Props {
  data: MediaDetails;
}

const useMediaDetails = (
  mediaId: number | undefined,
  mediaType: MediaType | undefined
) => {
  const { data, error, isLoading, isValidating } = useSWR<Props>(
    mediaId && mediaType
      ? `/api/v1/media?id=${mediaId}&type=${mediaType}`
      : null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { mediaDetails: data?.data, error, isLoading, isValidating };
};

export default useMediaDetails;
