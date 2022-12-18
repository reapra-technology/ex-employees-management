import TitileRowCard from '@/components/homePage/titileRowCard';
import User from '../types/user';
import RowCard from '../components/homePage/rowCard';
import AddExEmployee from '@/components/homePage/addExEmployee';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUsersActions } from '@/store/users';
import { useProcessingUsersActions } from '@/store/processingUsers';
import { useSettingActions } from '@/store/setting';
import { useEffect } from 'react';

export default function Users() {
  const { users, changeUserState, deleteUser, phaseCompleteActions } = useUsersActions();
  const { processingUsers, addProcessingUsers, removeProcessingUsers } =
    useProcessingUsersActions();
  const {
    getLocationArchiveFolderId: getLocationFolderId,
    getLocationRowDataFolderId,
    currentSetting,
  } = useSettingActions();

  return (
    <>
      <AddExEmployee />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {users.map((user, index) => {
          return (
            <li>
              {RowCard(
                user,
                currentSetting,
                processingUsers,
                deleteUser,
                addProcessingUsers,
                removeProcessingUsers,
                getLocationFolderId,
                getLocationRowDataFolderId,
                phaseCompleteActions,
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
