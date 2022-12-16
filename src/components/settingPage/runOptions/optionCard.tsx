import Toggle from '@/components/settingPage/runOptions/toggle';
import { targetOption, useRunningOptionActions } from '@/store/runningOption';

export default function OptionCard(value: boolean, target: targetOption, title: string) {
  const { changeOption } = useRunningOptionActions();

  return (
    <div className=" flex items-center justify-around p-4">
      <p className="w-7/12">{title}</p>
      <p className="mr-4 ml-4 text-gray-300">|</p>
      <div className="w-3/12 text-center">{Toggle(value, target)}</div>
    </div>
  );
}
