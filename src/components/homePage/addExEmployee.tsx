import { LocationInput } from '@/components/homePage/inputPart/locationInput';
import MailInput from '@/components/homePage/inputPart/mailInput';
import { Button } from 'antd';
import { useState } from 'react';

export default function AddExEmployee() {
  const [mailAddress, setMailAddress] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const addUser = async () => {};

  return (
    <div className="flex justify-around p-8">
      {MailInput(mailAddress, setMailAddress)}
      {LocationInput(location, setLocation)}
      <Button>追加</Button>
    </div>
  );
}
