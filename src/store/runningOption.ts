import { useRecoilState } from "recoil";
import { RecoilAtomKeys } from "@/store/RecoilKeys";
import { RunningOption } from "@/types/runningOption";
import { atom } from "recoil";



export const runningOptionState = atom<RunningOption>({
  key: RecoilAtomKeys.RUNNING_OPTION_STATE,
  default: { removeFinishedUser: false, rungNextUser: false, runNextPhase: false, concurrentNumber: 1, }
});


export enum targetOption {
  RUN_NEXT_PHASE = 'RUN_NEXT_PHASE',
  RUN_NEXT_EPMLOYEE = 'RUN_NEXT_USER',
  REMOVE_FINISHED_USER = 'REMOVE_FINISHED_USER',
}

export const useRunningOptionActions = () => {
  const [state, setState] = useRecoilState(runningOptionState);

  const changeOption = (value: boolean, target: string) => {
    const newOption: RunningOption = {
      rungNextUser: target === targetOption.RUN_NEXT_EPMLOYEE ? value : state.rungNextUser,
      runNextPhase: target === targetOption.RUN_NEXT_PHASE ? value : state.runNextPhase,
      removeFinishedUser: target === targetOption.REMOVE_FINISHED_USER ? value : state.removeFinishedUser,
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
      rungNextUser: state.rungNextUser,
      runNextPhase: state.runNextPhase,
      removeFinishedUser: state.removeFinishedUser,
      concurrentNumber: value,
    }
    setState(newOption);
    window.localStorage.setItem("runningOption", JSON.stringify(newOption));
  }

  return { changeOption: changeOption, setOption: setState, changeConcurrentNum: changeConcurrentNum };
}
