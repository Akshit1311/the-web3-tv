import { z } from "zod"
import { atom, useAtomValue, useSetAtom, useAtom } from "jotai"
// import { useAtomValue,  } from "jotai/utils"

const OwnnerSchema = z.object({
    username: z.string().optional(),
    fid: z.number().optional(),
    nonce: z.string().optional()
})


export type TOwnerType = z.infer<typeof OwnnerSchema>


const ownerMap: TOwnerType = {
    username: "",
    fid: undefined,
    nonce: ""
}

const ownerAtom = atom(ownerMap)

export const getOwnerValue = () => useAtomValue(ownerAtom);

export const useSetOwnerAtom = () => useSetAtom(ownerAtom);

export const useOwnerAtom = () => useAtom(ownerAtom);