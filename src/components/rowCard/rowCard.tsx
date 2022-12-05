import ExecuteButton from '@/components/rowCard/executeButton';
import FourthPhase from '@/components/rowCard/fourthPhase';
import SecondPhase from '@/components/rowCard/secondPhase';
import ThirdPhase from '@/components/rowCard/thirdPhase';
import { InfoCircleOutlined } from '@ant-design/icons';
import EmployeeParameter from '../../api/employeeParameter';
import FirstPhase from './firstPhase';

export default function RowCard(parameter: EmployeeParameter) {
  const { mailAddress, location } = parameter;
  const phases = [1, 2, 3, 4];

  return (
    <div className="m-2 flex items-center ">
      <p className="w-1/3 text-center font-semibold ">{mailAddress}</p>
      <p className="text-gray-300">|</p>
      <p className="w-3/12 text-center">{location}</p>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FirstPhase(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {SecondPhase(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {ThirdPhase(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FourthPhase(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">{ExecuteButton()}</div>
    </div>
  );
}
