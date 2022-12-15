import { usersState } from "@/store/user/usersState";
import User from "@/types/user";
import { useRecoilState } from "recoil";



export const useUserActions = () => {
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
