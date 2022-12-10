import ExecuteButton from '@/components/rowCard/executeButton';
import FourthPhasePanel from '@/components/rowCard/phasePanels/fourthPhasePanel';
import SecondPhasePanel from '@/components/rowCard/phasePanels/secondPhasePanel';
import ThirdPhasePanel from '@/components/rowCard/phasePanels/thirdPhasePanel';
import EmployeeParameter from '../../api/employeeParameter';
import FirstPhasePanel from './phasePanels/firstPhasePanel';

export default function RowCard(parameter: EmployeeParameter) {
  const { mailAddress, location } = parameter;

  return (
    <div className="m-4 flex items-center ">
      <p className="w-1/3 text-center font-semibold ">{mailAddress}</p>
      <p className="text-gray-300">|</p>
      <p className="w-1/6 text-center">{location}</p>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FirstPhasePanel(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {SecondPhasePanel(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {ThirdPhasePanel(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FourthPhasePanel(parameter)}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/6 items-center justify-around text-center">{ExecuteButton()}</div>
    </div>
  );
}
