import AllExecuteButton from '@/components/homePage/allExecuteButton';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useSnackbar } from '../../utils/snackbar/snackbar';

export default function TitileRowCard() {
  const { showSnackbar } = useSnackbar();
  const phases = [1, 2, 3, 4];
  const showDetail = (phase: number) => {
    let content: string = '';
    switch (phase) {
      case 1:
        content =
          '・アーカイブ保存先フォルダの作成\n・メールアーカイブの作成\n・ドライブアーカイブの作成';
        break;
      case 2:
        content =
          '・メールアーカイブをGoogle Driveにダウンロード\n・ドライブアーカイブをGoogle Driveにダウンロード\n・トランスポートAPIの実行(退職者→実行者)';
        break;
      case 3:
        content = '・トランスポートAPIの実行(退職者→実行者)';
        break;
      case 4:
        content = '・Driveデータを目的のフォルダへ移動(実行者→目的フォルダ)';
        break;
    }
    showSnackbar(content, 'info', 10000);
  };

  return (
    <div className="m-4 flex">
      <p className="w-1/3 text-center  font-bold"> MailAddress</p>
      <p className="text-gray-300">|</p>
      <p className="w-1/6 text-center  font-bold">Location</p>
      {phases.map((num, _) => {
        return (
          <>
            <p className="text-gray-300">|</p>
            <div className="flex w-1/12 items-center justify-around text-center">
              <a className="w-4"></a>
              <p className="pr-1  font-bold">Phase{num}</p>
              <InfoCircleOutlined
                style={{ color: '#4169e1' }}
                onClick={() => {
                  showDetail(num);
                }}
              />
              <a className="w-4"></a>
            </div>
          </>
        );
      })}
      <p className="text-gray-300">|</p>
      <div className="flex w-1/6 items-center justify-around text-center">{AllExecuteButton()}</div>
    </div>
  );
}
