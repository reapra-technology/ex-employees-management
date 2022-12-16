import ConcurrentCard from '@/components/settingPage/runOptions/concurrentCard';
import OptionCard from '@/components/settingPage/runOptions/optionCard';
import { targetOption } from '@/store/runningOption';
import { runningOptionState } from '@/store/runningOption';
import { useRecoilState } from 'recoil';

export default function RunOptions() {
  const [optionState, _] = useRecoilState(runningOptionState);
  return (
    <div>
      {OptionCard(
        optionState.runNextPhase,
        targetOption.RUN_NEXT_PHASE,
        '1つの処理(フェーズ)が終わり次第、次の処理(フェーズ)を開始する',
      )}
      {OptionCard(
        optionState.rungNextEmployee,
        targetOption.RUN_NEXT_EPMLOYEE,
        '同時実行時、1人の処理が終わり次第、次の人の処理を実行する',
      )}
      {OptionCard(
        optionState.removeFinishedEmployee,
        targetOption.REMOVE_FINISHED_EMPLOYEE,
        '全ての処理が完了した際、対象者をリストから削除する',
      )}
      {ConcurrentCard(optionState.concurrentNumber)}
    </div>
  );
}
