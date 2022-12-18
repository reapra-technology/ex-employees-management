import { executeFirstPhase } from '@/api/phases/firstPhaseApis';
import { executeFourthPhase } from '@/api/phases/fourthPhaseApi';
import executeSecondPhase from '@/api/phases/secondPhaseApis';
import { executeThirPhase } from '@/api/phases/thirdPhaseApis';
import { getTokenFromByRefreshToken } from '@/api/tokenAuth';
import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { PhaseApiActions, targetUserState } from '@/store/users';
import { SettingParameter } from '@/types/settingParameter';
import User from '@/types/user';
import { useSnackbar } from '@/utils/snackbar/snackbar';
import { Button } from 'antd';

export default function ExecuteButton(
  user: User,
  setting: SettingParameter | undefined,
  processingUsers: string[],
  addProcessing: (mail: string) => void,
  removeProcessing: (mail: string) => void,
  getLocationFolderId: (location: string) => string,
  getRawFolderId: (location: string) => string,
  phaseApiActions: PhaseApiActions,
) {
  const { showSnackbar } = useSnackbar();
  const execute = async () => {
    const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));
    // // 定期トークンリフレッシュ(30分に一回)
    getTokenFromByRefreshToken();
    const intervalId = setInterval(() => getTokenFromByRefreshToken(), 30 * 60 * 1000);
    addProcessing(user.mailAddress);

    await exucuteProcees();

    removeProcessing(user.mailAddress);
    setTimeout(() => clearInterval(intervalId), 3000);
  };

  const exucuteProcees = async () => {
    if (user.completePhase === null || user.completePhase === undefined) {
      await executeFirstPhase(
        user,
        setting?.matter_id ?? '',
        getLocationFolderId,
        phaseApiActions,
      ).then((result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 5000);
        }
      });
    }
    if (user.completePhase! === 1) {
      await executeSecondPhase(user, setting?.matter_id ?? '', phaseApiActions).then(
        (result: string) => {
          if (result !== 'success') {
            showSnackbar(result, 'error', 5000);
          }
        },
      );
    }
    if (user.completePhase! === 2) {
      await executeThirPhase(user, phaseApiActions).then((result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 5000);
        }
      });
    }
    if (user.completePhase! === 3) {
      await executeFourthPhase(user, phaseApiActions, getRawFolderId).then((result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 5000);
        }
      });
    }
  };

  if (processingUsers.includes(user.mailAddress)) {
    return <ProcessingIcon></ProcessingIcon>;
  }

  return <Button onClick={() => execute()}>RUN</Button>;
}
