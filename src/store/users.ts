import { useRecoilState } from "recoil";
import { RecoilAtomKeys } from "@/store/RecoilKeys";
import User from "@/types/user";
import { atom } from "recoil";



export const usersState = atom<User[]>({
  key: RecoilAtomKeys.USERS_STATE,
  default: [],
});





export const useUsersActions = () => {
  const [state, setState] = useRecoilState(usersState);

  const addUser = (mailAddress: string, location: string) => {
    const user: User = {
      mailAddress: mailAddress,
      location: location,
    }

    setState([...state, user]);
    // firebase処理
  }

  return { users: state, addUser: addUser };

}