import { RecoilAtomKeys } from "@/store/RecoilKeys";
import { RunningOption } from "@/types/runningOption";
import { atom } from "recoil";



export const runningOptionState = atom<RunningOption>({
  key: RecoilAtomKeys.RUNNING_OPTION_STATE,
  default: { removeFinishedEmployee: false, rungNextEmployee: false, runNextPhase: false, concurrentNumber: 1, }
});
