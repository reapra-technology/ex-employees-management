import TitileRowCard from '@/components/homePage/titileRowCard';
import RowCard from '../components/homePage/rowCard';
import AddUser from '@/components/homePage/addUser';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUsersActions } from '@/store/users';
import { useProcessingUsersActions } from '@/store/processingUsers';
import { useSettingActions } from '@/store/setting';
import { useExecutedUsersActions } from '@/store/executedUsers';

export default function Users() {
  const { users, deleteUser, phaseCompleteActions } = useUsersActions();
  const { processingUsers, addProcessingUsers, removeProcessingUsers } =
    useProcessingUsersActions();
  const {
    getLocationArchiveFolderId: getLocationFolderId,
    getLocationRowDataFolderId,
    currentSetting,
  } = useSettingActions();
  const { addExecutedUser } = useExecutedUsersActions();

  return (
    <>
      <AddUser />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {users.map((user, index) => {
          return (
            <li key={user.id}>
              {RowCard(
                user,
                currentSetting,
                processingUsers,
                deleteUser,
                addExecutedUser,
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
