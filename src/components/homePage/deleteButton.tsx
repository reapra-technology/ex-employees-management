import { getIdByMailAddress } from '@/api/phases/thirdPhaseApis';
import { getAuthInfo } from '@/api/tokenAuth';
import User from '@/types/user';
import { Button } from 'antd';
import axios from 'axios';

export default function DeleteButton(user: User, deleteUserOnDB: (id: string) => Promise<void>) {
  const deleteUser = async () => {
    await deleteUserOnDomain(user.mailAddress, user.id);
  };
  async function deleteUserOnDomain(mailAddress: string, id: string): Promise<void> {
    const token = getAuthInfo()?.access_token;
    if (token === undefined) {
      return;
    }
    const userKey = await getIdByMailAddress(mailAddress);
    const url = `https://admin.googleapis.com/admin/directory/v1/users/${userKey}`;

    await axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (_) => {
        await deleteUserOnDB(id);
      });
  }
  return (
    <Button style={{ color: '#ff0000' }} onClick={() => deleteUser()}>
      DELETE
    </Button>
  );
}
