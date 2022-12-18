import CompleteIcon from '@/components/homePage/statusIcons/completeIcon';
import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import { ReactElement } from 'react';
import User from '../../types/user';

export default function PhasePanel(
  phase: number,
  param: User,
  isProcessing: boolean,
): ReactElement {
  if ((param.completePhase ?? 0) >= phase) {
    return <CompleteIcon />;
  }

  if ((param.completePhase ?? 1) === phase && isProcessing) {
    return <ProcessingIcon />;
  }

  return <></>;
}
