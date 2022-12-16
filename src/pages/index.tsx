import TitileRowCard from '@/components/homePage/titileRowCard';
import User from '../types/user';
import RowCard from '../components/homePage/rowCard';
import AddExEmployee from '@/components/homePage/addExEmployee';
import HorizontalDivider from '@/components/common/horizontalDivider';
import { useUserActions } from '@/store/user/userActions';
import { useState } from 'react';
import { useProcessingUsersActions } from '@/store/processingUsers/processingUsersState';

export default function Users() {
  const { users } = useUserActions();
  const {processingUsers,addProcessingUsers,removeProcessingUsers} = useProcessingUsersActions();

  // const [isProcessingUsers, setIsProcessingUser] = useState<string[]>([]);

  // const addProcessing = (address: string) => {
  //   setIsProcessingUser([...isProcessingUsers, address]);
  // };

  // const removeProcessing = (address: string) => {
  //   setIsProcessingUser((prev) => {
  //     const index = prev.findIndex((mail) => mail === address);
  //     const newUsers = [...prev];
  //     newUsers.splice(index, 1);
  //     return newUsers;
  //   });
  // };

  return (
    <>
      <AddExEmployee />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {users.map((user, index) => {
          return <li>{RowCard(user, processingUsers, addProcessingUsers, removeProcessingUsers)}</li>;
        })}
      </ul>
    </>
  );
}
