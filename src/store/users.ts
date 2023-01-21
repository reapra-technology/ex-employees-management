import { useRecoilState } from 'recoil';
import { RecoilAtomKeys } from '@/store/RecoilKeys';
import User from '@/types/user';
import { atom } from 'recoil';
import UUIDClass from 'uuidjs';
import {
  archiveUser,
  createUser,
  deleteUserOnDb,
  fetchUsersFromDB,
  updateUserStateOnDB,
} from '@/firebase/functions';
import { saveFileData } from '@/api/phases/secondPhaseApis';

export enum targetUserState {
  COMPLETE_PHASE = 'COMPLETE_PHASE',
  MAIL_EXPORT_ID = 'MAIL_EXPORT_ID',
  DRIVE_EXPORT_ID = 'DRIVE_EXPORT_ID',
  MAIL_DES_ID = 'MAIL_DEST_ID',
  DRIVE_DES_ID = 'DRIVE_DEST_ID',
  TRANSFER_ID = 'TRANSFER_ID',
  TOTAL_OBJECT_COUNT = 'TOTAL_OBJECT_COUNT',
}

export type PhaseApiActions = {
  completeFirstPhase: (
    id: string,
    mailExportId: string,
    driveExportId: string,
    mailDestId: string,
    driveDestId: string,
  ) => Promise<void>;
  changeUserState: (target: targetUserState, id: string, value: string) => Promise<void>;
  addObjectFiles: (id: string, files: saveFileData[]) => Promise<void>;
  removeOjectFile: (id: string, file: saveFileData) => Promise<void>;
  completeThirdPhse: (id: string, transferId: string) => Promise<void>;
};

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
  };

  const addUser = async (mailAddress: string, location: string) => {
    const user: User = {
      id: UUIDClass.generate(),
      mailAddress: mailAddress,
      location: location,
      createdAt: Date.now(),
    };
    setState(function (prev) {
      return [user, ...prev];
    });
    await createUser(user);
  };

  const deleteUser = async (id: string) => {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      newUsers.splice(targetIndex, 1);

      deleteUserOnDb(id);
      archiveUser(targetUser);

      return newUsers;
    });
  };

  const changeUserState = async function (target: targetUserState, id: string, value: string) {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        createdAt: targetUser.createdAt,
        location: targetUser.location,
        completePhase:
          target === targetUserState.COMPLETE_PHASE ? Number(value) : targetUser.completePhase,
        mailExportId: target === targetUserState.MAIL_EXPORT_ID ? value : targetUser.mailExportId,
        driveExportId:
          target === targetUserState.DRIVE_EXPORT_ID ? value : targetUser.driveExportId,
        mailDestinationId:
          target === targetUserState.MAIL_DES_ID ? value : targetUser.mailDestinationId,
        driveDestinationId:
          target === targetUserState.DRIVE_DES_ID ? value : targetUser.driveDestinationId,
        transferId: target === targetUserState.TRANSFER_ID ? value : targetUser.transferId,
        objectFiles: targetUser.objectFiles,
        totalObjectFiles:
          target === targetUserState.TOTAL_OBJECT_COUNT
            ? Number(value)
            : targetUser.totalObjectFiles,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const addObjectFiles = async function (id: string, files: saveFileData[]) {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        createdAt: targetUser.createdAt,
        location: targetUser.location,
        completePhase: targetUser.completePhase,
        mailExportId: targetUser.mailExportId,
        driveExportId: targetUser.driveExportId,
        mailDestinationId: targetUser.mailDestinationId,
        driveDestinationId: targetUser.driveDestinationId,
        transferId: targetUser.transferId,
        objectFiles: files,
        totalObjectFiles: targetUser.totalObjectFiles,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const removeObjectFiles = async function (id: string, file: saveFileData) {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newFiles = [...(targetUser.objectFiles ?? [])];
      const fileIndex = newFiles.findIndex((f) => file.file.objectName === f.file.objectName);
      newFiles.splice(fileIndex, 1);
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        createdAt: targetUser.createdAt,
        location: targetUser.location,
        completePhase: targetUser.completePhase,
        mailExportId: targetUser.mailExportId,
        driveExportId: targetUser.driveExportId,
        mailDestinationId: targetUser.mailDestinationId,
        driveDestinationId: targetUser.driveDestinationId,
        transferId: targetUser.transferId,
        objectFiles: newFiles,
        totalObjectFiles: targetUser.totalObjectFiles,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const completeFirstPhase = async (
    id: string,
    mailExportId: string,
    driveExportId: string,
    mailDestId: string,
    driveDestId: string,
  ) => {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        createdAt: targetUser.createdAt,
        location: targetUser.location,
        completePhase: 1,
        mailExportId: mailExportId,
        driveExportId: driveExportId,
        mailDestinationId: mailDestId,
        driveDestinationId: driveDestId,
        transferId: targetUser.transferId,
        objectFiles: targetUser.objectFiles,
        totalObjectFiles: targetUser.totalObjectFiles,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const completeThirdPhase = async (id: string, transferId: string) => {
    setState(function (prev) {
      const newUsers = [...prev];
      const targetIndex = newUsers.findIndex((user) => user.id === id);
      const targetUser = newUsers[targetIndex];
      const newUser: User = {
        id: targetUser.id,
        mailAddress: targetUser.mailAddress,
        createdAt: targetUser.createdAt,
        location: targetUser.location,
        completePhase: 3,
        mailExportId: targetUser.mailExportId,
        driveExportId: targetUser.driveExportId,
        mailDestinationId: targetUser.mailDestinationId,
        driveDestinationId: targetUser.driveDestinationId,
        transferId: transferId,
        objectFiles: targetUser.objectFiles,
        totalObjectFiles: targetUser.totalObjectFiles,
      };
      newUsers.splice(targetIndex, 1, newUser);
      updateUserStateOnDB(newUser);
      return newUsers;
    });
  };

  const phaseCompleteActions: PhaseApiActions = {
    completeFirstPhase: completeFirstPhase,
    changeUserState: changeUserState,
    addObjectFiles: addObjectFiles,
    removeOjectFile: removeObjectFiles,
    completeThirdPhse: completeThirdPhase,
  };

  // objectname 処理

  return {
    users: state,
    fetchUsers: fetchUsers,
    addUser: addUser,
    changeUserState: changeUserState,
    phaseCompleteActions: phaseCompleteActions,
    deleteUser: deleteUser,
  };
};
