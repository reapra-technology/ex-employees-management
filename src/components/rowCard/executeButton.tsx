import { getIdByMailAddress } from '@/api/hello';
import { Button } from 'antd';

export default function ExecuteButton() {
  const getAuthToken = () => {
    getIdByMailAddress('shinnosuke.tominaga@reapra.sg');
  };

  return <Button onClick={() => getAuthToken()}>RUN</Button>;
}
