import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { ReactElement } from 'react';
import User from '../../../types/user';

import CompleteIcon from '../statusIcons/completeIcon';

export default function SecondPhasePanel(param: User, isProcessing: boolean): ReactElement {
  if ((param.completePhase ?? 0) >= 2) {
    return <CompleteIcon />;
  }
  if ((param.completePhase ?? 0) === 1 && isProcessing) {
    return <ProcessingIcon />;
  }

  return <></>;
}
