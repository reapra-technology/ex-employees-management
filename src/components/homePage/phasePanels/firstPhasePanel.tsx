import { ReactElement } from 'react';
import User from '../../../types/user';
import CompleteIcon from '../statusIcons/completeIcon';

export default function FirstPhasePanel(param: User): ReactElement {
  if ((param.completePhase ?? 0) >= 1) {
    return <CompleteIcon />;
  }

  return <></>;
}
