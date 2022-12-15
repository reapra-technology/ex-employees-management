import { LocationInput } from '@/components/homePage/inputPart/locationInput';
import MailInput from '@/components/homePage/inputPart/mailInput';
import { useUserActions } from '@/store/user/userActions';
import { useSnackbar } from '@/utils/snackbar/snackbar';
import { Button } from 'antd';
import { useState } from 'react';

export default function AddExEmployee() {
  const [mailAddress, setMailAddress] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const { users, addUser } = useUserActions();
  const { showSnackbar } = useSnackbar();

  const add = () => {
    if (mailAddress === '' || location === '') {
      showSnackbar('please input values', 'error', 5000);
      return;
    }
    if (users.filter((user) => user.mailAddress === mailAddress).length > 0) {
      showSnackbar('this user already exists', 'error', 5000);
      return;
    }

    addUser(mailAddress, location);
  };

  return (
    <div className="flex justify-around p-8">
      {MailInput(mailAddress, setMailAddress)}
      {LocationInput(location, setLocation)}
      <Button
        onClick={() => {
          add();
        }}
      >
        追加
      </Button>
    </div>
  );
}
