import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
});

export type TuserType = z.infer<typeof userSchema>;

export const userMap: TuserType = {
  bio: undefined,
  name: undefined,
  id: undefined,
};

const userAtom = atom<TuserType>(userMap);

export const useUserAtomValue = () => useAtomValue(userAtom);

export const setUserAtom = () => useSetAtom(userAtom);

export const userAtomValue = () => useAtom(userAtom);
