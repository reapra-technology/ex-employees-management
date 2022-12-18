import User from '@/types/user';
import { Button } from 'antd';

export default function DeleteButton(user: User, deleteUser: (id: string) => Promise<void>) {
  return (
    <Button style={{ color: '#ff0000' }} onClick={() => deleteUser(user.id)}>
      DELETE
    </Button>
  );
}
