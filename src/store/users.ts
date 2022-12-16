import { useRecoilState } from "recoil";
import { RecoilAtomKeys } from "@/store/RecoilKeys";
import User from "@/types/user";
import { atom } from "recoil";
import UUIDClass from "uuidjs";
import { createUser, fetchUsersFromDB, updateUserStateOnDB } from "@/firebase/functions";
import { async } from "@firebase/util";


export enum targetUserState {
  COMPLETE_PHASE = 'COMPLETE_PHASE',
  MAIL_EXPORT_ID = 'MAIL_EXPORT_ID',
  DRIVE_EXPORT_ID = 'DRIVE_EXPORT_ID',
  MAIL_DES_ID = 'MAIL_DEST_ID',
  DRIVE_DES_ID = 'DRIVE_DEST_ID',
  TRANSFER_ID = 'TRANSFER_ID',
}

export type PhaseCompleteActions = {
  firstPhase: (id: string, mailExportId: string, driveExportId: string, mailDestId: string, driveDestId: string) => Promise<void>,
}

export const usersState = atom<User[]>({
  key: RecoilAtomKeys.USERS_STATE,
  default: [],
});

export const useUsersActions = () => {
  const [state, setState] = useRecoilState(usersState);

  const fetchUsers = async function () {
    if (state.length !== 0) {
      return;
    }
    const users = await fetchUsersFromDB();
    setState(users);
  }

  const addUser = async (mailAddress: string, location: string) => {
    const user: User = {
      id: UUIDClass.generate(),
      mailAddress: mailAddress,
      location: location,
    }
    setState(function (prev) {
      return [...prev, user]
    });
    await createUser(user);
  }

  const changeUserState = async function (target: targetUserState, id: string, value: string) {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        location: targetUser.location,
        completePhase: target === targetUserState.COMPLETE_PHASE ? Number(value) : targetUser.completePhase,
        mailExportId: target === targetUserState.MAIL_EXPORT_ID ? value : targetUser.mailExportId,
        driveExportId: target === targetUserState.DRIVE_EXPORT_ID ? value : targetUser.driveExportId,
        mailDestinationId: target === targetUserState.MAIL_DES_ID ? value : targetUser.mailDestinationId,
        driveDestinationId: target === targetUserState.DRIVE_DES_ID ? value : targetUser.driveDestinationId,
        transferId: target === targetUserState.TRANSFER_ID ? value : targetUser.transferId,
        objectNames: targetUser.objectNames,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  }

  const completeFirstPhase = async (id: string, mailExportId: string, driveExportId: string, mailDestId: string, driveDestId: string) => {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        location: targetUser.location,
        completePhase: 1,
        mailExportId: mailExportId,
        driveExportId: driveExportId,
        mailDestinationId: mailDestId,
        driveDestinationId: driveDestId,
        transferId: targetUser.transferId,
        objectNames: targetUser.objectNames,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const phaseCompleteActions: PhaseCompleteActions = {
    firstPhase: completeFirstPhase
  };

  // objectname 処理

  return { users: state, fetchUsers: fetchUsers, addUser: addUser, changeUserState: changeUserState,phaseCompleteActions:phaseCompleteActions };

}