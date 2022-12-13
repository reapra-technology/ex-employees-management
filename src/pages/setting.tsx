import { useEffect, useState } from 'react';
import ContentCard from '@/components/settingPage/contentCard';
import HorizontalDivider from '@/components/settingPage/horizontalDivider';
import ShowAllButton from '@/components/settingPage/showAllButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editingSettingState, settingState } from '@/store/settingParameter/settingState';
import { targetValue, useSettingActions } from '@/store/settingParameter/settingActions';
import EditButton from '@/components/settingPage/editButton';
import RunOptions from '@/components/settingPage/runOptions/runOptions';

export default function Setting() {
  const { fetchSetting, editingState } = useSettingActions();
  const [showAllContent, setShowAllContent] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <div className="h-full overflow-scroll">
      {RunOptions()}
      {HorizontalDivider()}
      <div className="m-4 flex">
        {ShowAllButton(showAllContent, setShowAllContent)}
        {EditButton(isEditingMode, setIsEditingMode)}
      </div>
      {ContentCard(
        targetValue.CLIENT_ID,
        editingState?.client_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.CLIENT_SECRET,
        editingState?.client_secret ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.DEST_FOLDER_ID,
        editingState?.dest_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.JP_FOLDER_ID,
        editingState?.jp_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.SG_FOLDER_ID,
        editingState?.sg_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.VN_FOLDER_ID,
        editingState?.vn_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
    </div>
  );
}
