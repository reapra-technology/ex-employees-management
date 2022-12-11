import { useSettingActions } from '@/store/settingParameter/settingActions';
import { useSnackbar } from '@/utils/snackbar/snackbar';
import { Button } from 'antd';

export default function EditButton(isEditing: boolean, setEditMode: (value: boolean) => void) {
  const { onCompleted, onCanceled } = useSettingActions();
  const { showSnackbar } = useSnackbar();

  const complete = async () => {
    setEditMode(false);
    await onCompleted().then((_) => {
      showSnackbar('successfully updated!', 'success', 1000);
    });
  };

  const cancel = () => {
    setEditMode(false);
    onCanceled();
  };

  return (
    <div className="m-4 flex  w-2/3 justify-end">
      {isEditing ? (
        <div>
          <Button className="mr-2" style={{ color: '#ff0000' }} onClick={() => cancel()}>
            キャンセル
          </Button>
          <Button onClick={() => complete()}>完了</Button>
        </div>
      ) : (
        <Button
          style={{ backgroundColor: '#6D9F71', color: '#fff' }}
          onClick={() => setEditMode(true)}
        >
          編集
        </Button>
      )}
    </div>
  );
}
