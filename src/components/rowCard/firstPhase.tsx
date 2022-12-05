import { ReactElement } from 'react';
import EmployeeParameter from '../../api/employeeParameter';
import CompleteIcon from '../statusIcons/completeIcon';

export default function FirstPhase(param: EmployeeParameter): ReactElement {
  const { completePhase } = param;

  if (completePhase >= 1) {
    return <CompleteIcon />;
  }


  return <></>;
}
