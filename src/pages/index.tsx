import TitileRowCard from '@/components/homePage/titileRowCard';
import User from '../types/user';
import RowCard from '../components/homePage/rowCard';
import AddExEmployee from '@/components/homePage/addExEmployee';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUsersActions } from '@/store/users';
import { useProcessingUsersActions } from '@/store/processingUsers';

export default function Users() {
  const { users } = useUsersActions();
  const { processingUsers, addProcessingUsers, removeProcessingUsers } =
    useProcessingUsersActions();

  return (
    <>
      <AddExEmployee />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {users.map((user, index) => {
          return (
            <li>{RowCard(user, processingUsers, addProcessingUsers, removeProcessingUsers)}</li>
          );
        })}
      </ul>
    </>
  );
}
