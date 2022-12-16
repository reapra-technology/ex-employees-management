import { useRecoilState } from "recoil";
import { RecoilAtomKeys } from "@/store/RecoilKeys";
import { RunningOption } from "@/types/runningOption";
import { atom } from "recoil";



export const runningOptionState = atom<RunningOption>({
  key: RecoilAtomKeys.RUNNING_OPTION_STATE,
  default: { removeFinishedEmployee: false, rungNextEmployee: false, runNextPhase: false, concurrentNumber: 1, }
});


export enum targetOption {
  RUN_NEXT_PHASE = 'RUN_NEXT_PHASE',
  RUN_NEXT_EPMLOYEE = 'RUN_NEXT_EPMLOYEE',
  REMOVE_FINISHED_EMPLOYEE = 'REMOVE_FINISHED_EMPLOYEE',
}

export const useRunningOptionActions = () => {
  const [state, setState] = useRecoilState(runningOptionState);

  const changeOption = (value: boolean, target: string) => {
    const newOption: RunningOption = {
      rungNextEmployee: target === targetOption.RUN_NEXT_EPMLOYEE ? value : state.rungNextEmployee,
      runNextPhase: target === targetOption.RUN_NEXT_PHASE ? value : state.runNextPhase,
      removeFinishedEmployee: target === targetOption.REMOVE_FINISHED_EMPLOYEE ? value : state.removeFinishedEmployee,
      concurrentNumber: state.concurrentNumber,
    }
    setState(newOption);
    window.localStorage.setItem("runningOption", JSON.stringify(newOption));
  }

  const changeConcurrentNum = (value: number) => {
    (value);
    if (value < 1) {
      return;
    }
    const newOption: RunningOption = {
      rungNextEmployee: state.rungNextEmployee,
      runNextPhase: state.runNextPhase,
      removeFinishedEmployee: state.removeFinishedEmployee,
      concurrentNumber: value,
    }
    setState(newOption);
    window.localStorage.setItem("runningOption", JSON.stringify(newOption));
  }

  return { changeOption: changeOption, setOption: setState, changeConcurrentNum: changeConcurrentNum };
}
