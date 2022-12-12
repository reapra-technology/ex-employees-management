import { reapraPrimaryColor } from '@/utils/color';
import { Button } from 'antd';

export default function ShowAllButton(isShowAll: boolean, setShowAll: (value: boolean) => void) {
  return (
    <div className="m-4 flex  w-1/3 justify-center">
      {isShowAll ? (
        <Button onClick={() => setShowAll(false)}>全てのプロパティを非表示</Button>
      ) : (
        <Button
          style={{ backgroundColor: reapraPrimaryColor, color: '#fff' }}
          onClick={() => setShowAll(true)}
        >
          全てのプロパティを表示
        </Button>
      )}
    </div>
  );
}
