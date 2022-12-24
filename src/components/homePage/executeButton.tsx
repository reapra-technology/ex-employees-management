import { executeFirstPhase } from '@/api/phases/firstPhaseApis';
import { executeFourthPhase } from '@/api/phases/fourthPhaseApi';
import executeSecondPhase from '@/api/phases/secondPhaseApis';
import { executeThirPhase, getExecutorEmail } from '@/api/phases/thirdPhaseApis';
import { getAuthInfo, getTokenFromByRefreshToken } from '@/api/tokenAuth';
import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { PhaseApiActions, targetUserState } from '@/store/users';
import { SettingParameter } from '@/types/settingParameter';
import User from '@/types/user';
import { useSnackbar } from '@/utils/snackbar/snackbar';
import { Button } from 'antd';
import axios from 'axios';

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
    // 実行中の不具合を減らすてために定期的にトークンをリフレッシュ(30分に一回)
    getTokenFromByRefreshToken();
    const intervalId = setInterval(() => getTokenFromByRefreshToken(), 30 * 60 * 1000);
    addProcessing(user.mailAddress);

    await logging();
    await exucuteProcees();

    removeProcessing(user.mailAddress);
    clearInterval(intervalId);
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
          showSnackbar(result, 'error', 50000);
        }
      });
    }
    if (user.completePhase! === 1) {
      await executeSecondPhase(user, setting?.matter_id ?? '', phaseApiActions).then(
        (result: string) => {
          if (result !== 'success') {
            showSnackbar(result, 'error', 50000);
          }
        },
      );
    }
    if (user.completePhase! === 2) {
      await executeThirPhase(user, phaseApiActions).then((result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 50000);
        }
      });
    }
    if (user.completePhase! === 3) {
      await executeFourthPhase(
        user,
        phaseApiActions,
        setting?.target_share_drive_id ?? '',
        getRawFolderId,
      ).then((result: string) => {
        if (result !== 'success') {
          showSnackbar(result, 'error', 50000);
        }
      });
    }
  };

  async function logging() {
    const token = getAuthInfo()?.access_token;
    if (token === undefined) {
      return '';
    }
    const executorMail = await getExecutorEmail();
    const url =
      'https://script.googleapis.com/v1/scripts/AKfycbxtoSn8jhI4Su0xs2Nr8psD3wqnEBJrTjI_t8PXb_K_HbHcdDKHQQlxMwD2aNA-duc2:run';
    const payload = {
      function: 'logging',
      parameters: [user.mailAddress, executorMail, (user.completePhase ?? 0) + 1],
    };
    await axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
  }

  if (processingUsers.includes(user.mailAddress)) {
    return <ProcessingIcon></ProcessingIcon>;
  }

  return <Button onClick={() => execute()}>RUN</Button>;
}
