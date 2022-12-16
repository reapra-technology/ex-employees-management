import { RecoilAtomKeys } from '@/store/RecoilKeys';
import { atom } from 'recoil';
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
      const index = prev.findIndex((address) => address === mailAddress);
      const newUsers = [...prev];
      newUsers.splice(index, 1);
      return newUsers;
    });
  };

  return {
    processingUsers: state,
    addProcessingUsers: addProcessingUsers,
    removeProcessingUsers: removeProcessingUsers,
  };
};
