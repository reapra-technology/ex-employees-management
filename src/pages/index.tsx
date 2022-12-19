import TitileRowCard from '@/components/homePage/titileRowCard';
import RowCard from '../components/homePage/rowCard';
import AddUser from '@/components/homePage/addUser';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUsersActions } from '@/store/users';
import { useProcessingUsersActions } from '@/store/processingUsers';
import { useSettingActions } from '@/store/setting';

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
      <AddUser />
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
