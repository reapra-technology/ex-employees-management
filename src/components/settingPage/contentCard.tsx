import { useSettingActions } from '@/store/settingParameter/settingActions';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export default function ContentCard(
  title: string,
  propsContent: string,
  showContent: boolean,
  isEditing: boolean,
) {
  const { editSettting } = useSettingActions();
  const [isShowContent, setIsShowContent] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    setIsShowContent(showContent);
  }, [showContent]);

  useEffect(() => {
    setContent(propsContent);
  }, [propsContent]);

  return (
    <div className="m-4 flex h-16">
      <div className="flex w-1/3 justify-around">
        <p className="w-3/4  text-center font-bold">{title}</p>
        {isShowContent ? (
          <Button className="mr-4" onClick={() => setIsShowContent(false)}>
            非表示
          </Button>
        ) : (
          <Button className="mr-4" onClick={() => setIsShowContent(true)}>
            表示
          </Button>
        )}
      </div>
      <p className="text-gray-300">|</p>
      {isShowContent ? (
        <div className="flex w-2/3">
          <input
            style={{ backgroundColor: '#fff' }}
            type="text"
            value={content}
            disabled={!isEditing}
            onChange={(e) => {
              editSettting(e.target.value, title);
            }}
            className="mr-4  w-full text-center"
          ></input>
        </div>
      ) : (
        <p className=" mr-4 w-2/3  text-center">...</p>
      )}
    </div>
  );
}
