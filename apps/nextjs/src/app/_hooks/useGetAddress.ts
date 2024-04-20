import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

interface getAddressProps {
  displayName: string

}
export const useGetAddress = ({ displayName }: getAddressProps) => {
  const fetchAddress = async () => {
    return await axios.get(`https://fnames.farcaster.xyz/transfers/current?name=${displayName}`)

  }
  const { data, error, isLoading, refetch } = useQuery({ queryKey: ['getAddress'], queryFn: fetchAddress, enabled: !!displayName, retry: 1 })
  return { data, error, isLoading }
}
