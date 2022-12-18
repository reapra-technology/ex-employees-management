import ExecuteButton from '@/components/homePage/executeButton';
import FirstPhasePanel from '@/components/homePage/phasePanels/firstPhasePanel';
import FourthPhasePanel from '@/components/homePage/phasePanels/fourthPhasePanel';
import SecondPhasePanel from '@/components/homePage/phasePanels/secondPhasePanel';
import ThirdPhasePanel from '@/components/homePage/phasePanels/thirdPhasePanel';
import { PhaseApiActions, targetUserState } from '@/store/users';
import { SettingParameter } from '@/types/settingParameter';
import User from '@/types/user';

export default function RowCard(
  parameter: User,
  setting: SettingParameter|undefined,
  processingUsers: string[],
  addProcessing: (mail: string) => void,
  removeProcessing: (mail: string) => void,
  getLocationFolderId: (location: string) => string,
  getRawFolderId: (location: string) => string,
  phaseCompleteActions: PhaseApiActions,
) {
  const { mailAddress, location } = parameter;

  return (
    <div className="m-4 flex items-center ">
      <p className="w-1/3 text-center font-semibold">{mailAddress}</p>
      <p className="text-gray-300">|</p>
      <p className="w-1/6 text-center">{location}</p>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FirstPhasePanel(parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {SecondPhasePanel(parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {ThirdPhasePanel(parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {FourthPhasePanel(parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/6 items-center justify-around text-center">
        {ExecuteButton(
          parameter,
          setting,
          processingUsers,
          addProcessing,
          removeProcessing,
          getLocationFolderId,
          getRawFolderId,
          phaseCompleteActions,
        )}
      </div>
    </div>
  );
}
