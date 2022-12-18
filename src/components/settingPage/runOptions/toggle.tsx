import { Switch } from '@headlessui/react';
import { targetOption, useRunningOptionActions } from '@/store/runningOption';

export default function Toggle(value: boolean, target: targetOption) {
  const { changeOption } = useRunningOptionActions();

  return (
    <div className="grid place-items-center">
      <Switch
        checked={value}
        onChange={() => changeOption(!value, target)}
        className={`${value ? 'bg-teal-900' : 'bg-gray-400'}
          relative inline-flex h-[36px] w-[102px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-16' : 'translate-x-0'}
            pointer-events-none inline-block h-[32px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
