import { ReactElement } from 'react';
import EmployeeParameter from '../../../types/employeeParameter';
import CompleteIcon from '../statusIcons/completeIcon';

export default function FirstPhasePanel(param: EmployeeParameter): ReactElement {
  const { completePhase } = param;

  if (completePhase >= 1) {
    return <CompleteIcon />;
  }

  return <></>;
}
