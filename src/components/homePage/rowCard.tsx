import DeleteButton from '@/components/homePage/deleteButton';
import ExecuteButton from '@/components/homePage/executeButton';
import PhasePanel from '@/components/homePage/phasePanel';
import { PhaseApiActions } from '@/store/users';
import { SettingParameter } from '@/types/settingParameter';
import User from '@/types/user';

export default function RowCard(
  parameter: User,
  setting: SettingParameter | undefined,
  processingUsers: string[],
  deleteUser: (id: string) => Promise<void>,
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
        {PhasePanel(1, parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {PhasePanel(2, parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {PhasePanel(3, parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/12 items-center justify-around text-center">
        {PhasePanel(4, parameter, processingUsers.includes(parameter.mailAddress))}
      </div>
      <p className="text-gray-300">|</p>
      <div className="flex w-1/6 items-center justify-around text-center">
        {parameter.completePhase === 4
          ? DeleteButton(parameter, deleteUser)
          : ExecuteButton(
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
