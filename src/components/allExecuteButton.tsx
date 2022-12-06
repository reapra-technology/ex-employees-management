import { getIdByMailAddress } from '@/api/hello';
import { Button } from 'antd';

export default function AllExecuteButton() {
  const getAuthToken = () => {
    getIdByMailAddress('shinnosuke.tominaga@reapra.sg');
  };

  return (
    <Button
      className="bg-red"
      style={{ backgroundColor: '#06262D', color: '#fff' }}
      onClick={() => getAuthToken()}
    >
      ALLRUN
    </Button>
  );
}
