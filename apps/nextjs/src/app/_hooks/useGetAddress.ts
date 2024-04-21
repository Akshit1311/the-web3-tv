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
    const data = await axios.get(
      `https://fnames.farcaster.xyz/transfers/current?name=${displayName}`,
    );

    return TransferSchema.parse(data.data);
  };
  return useQuery({
    queryKey: ["getAddress"],
    queryFn: fetchAddress,
    enabled: !!displayName,
    retry: 1,
  });
};
