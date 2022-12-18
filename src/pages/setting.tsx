import { useEffect, useState } from 'react';
import ContentCard from '@/components/settingPage/contentCard';
import HorizontalDivider from '@/components/common/horizontalDivider';
import ShowAllButton from '@/components/settingPage/showAllButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editingSettingState, settingState } from '@/store/setting';
import { targetValue, useSettingActions } from '@/store/setting';
import EditButton from '@/components/settingPage/editButton';
import RunOptions from '@/components/settingPage/runOptions/runOptions';

export default function Setting() {
  const { editingState } = useSettingActions();
  const [showAllContent, setShowAllContent] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);

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
        targetValue.MATTER_ID,
        editingState?.matter_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.JP_ARCHIVE_FOLDER_ID,
        editingState?.jp_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.SG_ARCHIVE_FOLDER_ID,
        editingState?.sg_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.VN_ARCHIVE_FOLDER_ID,
        editingState?.vn_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.JP_RAW_DATA_FOLDER_ID,
        editingState?.jp_row_data_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.SG_RAW_DATA_FOLDER_ID,
        editingState?.sg_row_data_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
      {ContentCard(
        targetValue.VN_RAW_DATA_FOLDER_ID,
        editingState?.vn_row_data_folder_id ?? '',
        showAllContent,
        isEditingMode,
      )}
    </div>
  );
}
