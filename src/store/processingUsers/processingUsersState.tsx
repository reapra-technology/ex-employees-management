import { RecoilAtomKeys } from '@/store/RecoilKeys';
import { atom } from 'recoil';
import { usersState } from '@/store/user/usersState';
import User from '@/types/user';
import { useRecoilState } from 'recoil';

export const processingUsersState = atom<string[]>({
  key: RecoilAtomKeys.PROCESSING_USERS_STATE,
  default: [],
});

export const useProcessingUsersActions = () => {
  const [state, setState] = useRecoilState(processingUsersState);

  const addProcessingUsers = (mailAddress: string) => {
    setState(function (prev) {
      return [...prev, mailAddress];
    });
  };

  const removeProcessingUsers = (mailAddress: string) => {
    setState((prev) => {
      const newUsers = [...prev];
      newUsers.filter(function (address) {
        return address !== mailAddress;
      });
      return newUsers;
    });
  };

  return {
    processingUsers: state,
    addProcessingUsers: addProcessingUsers,
    removeProcessingUsers: removeProcessingUsers,
  };
};
