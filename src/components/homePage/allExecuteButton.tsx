import { getIdByMailAddress } from '@/api/hello';
import { executeFirstPhase } from '@/api/phases/firstPhaseApis';
import executeSecondPhase from '@/api/phases/secondPhaseApis';
import { executeThirPhase } from '@/api/phases/thirdPhaseApis';
import { reapraMainColor } from '@/utils/color';
import { Button } from 'antd';

export default function AllExecuteButton() {
  const getAuthToken = async () => {
    // executeFirstPhase('shinnosuke.tominaga@reapra.sg', 'JP').then((value: string) => {
    //   console.log(value);
    // });
    // executeSecondPhase('shinnosuke.tominaga@reapra.sg').then((value: string) => {
    //   console.log(value);
    // });
    await executeThirPhase('novam@reapra.sg');
  };

  return (
    <Button
      className="bg-red"
      style={{ backgroundColor: reapraMainColor, color: '#fff' }}
      onClick={() => getAuthToken()}
    >
      ALLRUN
    </Button>
  );
}
