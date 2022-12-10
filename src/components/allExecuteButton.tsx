import { getIdByMailAddress } from '@/api/hello';
import { executeFirstPhase } from '@/api/phases/firstPhaseApis';
import executeSecondPhase from '@/api/phases/secondPhaseApis';
import { Button } from 'antd';

export default function AllExecuteButton() {
  const getAuthToken = () => {
    // executeFirstPhase('shinnosuke.tominaga@reapra.sg', 'JP').then((value: string) => {
    //   console.log(value);
    // });
    executeSecondPhase('shinnosuke.tominaga@reapra.sg').then((value: string) => {
      console.log(value);
    });
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
