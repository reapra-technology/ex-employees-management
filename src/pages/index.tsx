import TitileRowCard from '@/components/homePage/titileRowCard';
import RowCard from '../components/homePage/rowCard';
import AddExEmployee from '@/components/homePage/addExEmployee';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUserActions } from '@/store/user/userActions';

export default function Users() {
  const { users } = useUserActions();

  return (
    <>
      <AddExEmployee />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {users.map((user, index) => {
          return <li>{RowCard(user)}</li>;
        })}
      </ul>
    </>
  );
}
