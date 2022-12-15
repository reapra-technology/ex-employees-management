import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { ReactElement } from 'react';
import User from '../../../types/user';

import CompleteIcon from '../statusIcons/completeIcon';

export default function SecondPhasePanel(param: User): ReactElement {
  const { completePhase } = param;

  if (completePhase >= 2) {
    return <CompleteIcon />;
  }
  if (completePhase + 1 === 2) {
    // アーカイブの状況を見にいく

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
