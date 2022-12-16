import { executeFirstPhase } from '@/api/phases/firstPhaseApis';
import { getTokenFromByRefreshToken } from '@/api/tokenAuth';
import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { PhaseCompleteActions, targetUserState } from '@/store/users';
import User from '@/types/user';
import { useSnackbar } from '@/utils/snackbar/snackbar';
import { Button } from 'antd';

export default function ExecuteButton(
  user: User,
  processingUsers: string[],
  addProcessing: (mail: string) => void,
  removeProcessing: (mail: string) => void,
  getLocationFolderId: (location: string) => string,
  phaseCompleteActions: PhaseCompleteActions,
) {
  const { showSnackbar } = useSnackbar();
  const execute = async () => {
    // // 定期トークンリフレッシュ(30分に一回)
    getTokenFromByRefreshToken();
    const intervalId = setInterval(() => getTokenFromByRefreshToken(), 30 * 60 * 1000);
    addProcessing(user.mailAddress);

    await exucuteProcees();

    removeProcessing(user.mailAddress);
    setTimeout(() => clearInterval(intervalId), 3000);
  };

  const exucuteProcees = async () => {
    await executeFirstPhase(user, getLocationFolderId, phaseCompleteActions).then(
      (result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 5000);
        }
      },
    );
  };

  if (processingUsers.includes(user.mailAddress)) {
    return <ProcessingIcon></ProcessingIcon>;
  }

  return <Button onClick={() => execute()}>RUN</Button>;
}
