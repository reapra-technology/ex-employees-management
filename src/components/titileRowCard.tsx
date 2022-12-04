import { InfoCircleOutlined } from '@ant-design/icons';
import { useSnackbar } from '../utils/snackbar/snackbar';

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
          '・メールアーカイブをGoogle Driveにダウンロード\n・ドライブアーカイブをGoogle Driveにダウンロード';
        break;
      case 3:
        content = '・　トランスポートAPIの実行(退職者→実行者)';
        break;
      case 4:
        content = '・Driveデータを目的のフォルダへ移動';
        break;
    }
    showSnackbar(content, 'info');
  };

  return (
    <div className="flex">
      <p className="w-1/3 text-center">Email</p>
      <p className="text-gray-300">|</p>
      <p className="w-3/12 text-center">Location</p>
      {phases.map((num, _) => {
        return (
          <div className="flex w-1/12 items-center justify-around text-center">
            <p className="text-gray-300">|</p>
            <a className="w-4"></a>
            <p>Phase{num}</p>
            <InfoCircleOutlined
              onClick={() => {
                showDetail(num);
              }}
            />
            <a className="w-4"></a>
          </div>
        );
      })}
    </div>
  );
}
