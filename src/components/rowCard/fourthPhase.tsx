import ErrorIcon from '@/components/statusIcons/errorIcon';
import { ReactElement } from 'react';
import EmployeeParameter from '../../api/employeeParameter';
import CompleteIcon from '../statusIcons/completeIcon';

export default function FourthPhase(param: EmployeeParameter): ReactElement {
  const { completePhase } = param;

  if (completePhase >= 4) {
    return <CompleteIcon />;
  }
  if (completePhase + 1 === 4) {
    // トランスポートの確認
    // if done
    //   firebase appdate
    //   completephase 書き換え　dispatch
    //   retrun complete
    // else
    //  return progeress
    return <ErrorIcon />;
  }

  return <></>;
}
