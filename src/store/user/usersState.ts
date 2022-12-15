
import { RecoilAtomKeys } from "@/store/RecoilKeys";
import User from "@/types/user";
import { atom } from "recoil";



export const usersState = atom<User[]>({
  key: RecoilAtomKeys.USERS_STATE,
  default: [],
});
