import { getExecutedUsersFromDB } from '@/firebase/functions';
import { RecoilAtomKeys } from '@/store/RecoilKeys';
import User from '@/types/user';
import { useState } from 'react';
import { atom } from 'recoil';
import { useRecoilState } from 'recoil';

export const executedUsersState = atom<User[]>({
  key: RecoilAtomKeys.EXECUTED_USERS_STATE,
  default: [],
});

export const useExecutedUsersActions = () => {
  const [state, setState] = useRecoilState(executedUsersState);

  const addExecutedUser = (user: User) => {
    setState(function (prev) {
      return [user, ...prev];
    });
  };

  const fetchExecutedUsers = async () => {
    if (state.length !== 0) {
      return;
    }
    console.log('hello');
    const users = await getExecutedUsersFromDB();
    setState(users);
  };

  return {
    executedUsers: state,
    addExecutedUser: addExecutedUser,
    fetchExecutedUsers: fetchExecutedUsers,
  };
};
