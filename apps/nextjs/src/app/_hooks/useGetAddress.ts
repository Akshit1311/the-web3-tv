import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

interface getAddressProps {
  displayName: string;
}

const TransferSchema = z.object({
  transfer: z.object({
    id: z.number(),
    timestamp: z.number(),
    username: z.string(),
    owner: z.string(),
    from: z.number(),
    to: z.number(),
    user_signature: z.string(),
    server_signature: z.string(),
  }),
});

export const useGetAddress = ({ displayName }: getAddressProps) => {
  const fetchAddress = async () => {
    try {
      const data = await axios.get(
        `https://fnames.farcaster.xyz/transfers/current?name=${displayName}`,
      );

      return TransferSchema.parse(data.data);
    } catch (error) {
      throw error;
    }
  };
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getAddress"],
    queryFn: fetchAddress,
    enabled: !!displayName,
    retry: 1,
  });
  return { data, error, isLoading };
};
