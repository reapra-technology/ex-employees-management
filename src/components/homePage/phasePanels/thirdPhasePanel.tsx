import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { ReactElement } from 'react';
import User from '../../../types/user';

import CompleteIcon from '../statusIcons/completeIcon';

export default function ThirdPhasePanel(param: User): ReactElement {
  const { completePhase } = param;

  if (completePhase ?? 0 >= 3) {
    return <CompleteIcon />;
  }
  if (completePhase ?? 0 + 1 === 3) {
    // ダウンロードの確認
    // if done
    //   firebase appdate
    //   completephase 書き換え　dispatch
    //   retrun complete
    // else
    //  return progeress
    return <ProcessingIcon />;
  }

  return <></>;
}
