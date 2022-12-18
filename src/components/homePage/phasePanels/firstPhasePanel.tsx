import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { ReactElement } from 'react';
import User from '../../../types/user';
import CompleteIcon from '../statusIcons/completeIcon';

export default function FirstPhasePanel(param: User, isProcessing: boolean): ReactElement {
  if ((param.completePhase ?? 0) >= 1) {
    return <CompleteIcon />;
  }

  if (!param.completePhase && isProcessing) {
    return <ProcessingIcon></ProcessingIcon>;
  }

  return <></>;
}
