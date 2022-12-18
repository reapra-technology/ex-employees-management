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
