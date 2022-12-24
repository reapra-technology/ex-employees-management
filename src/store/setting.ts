import { RecoilAtomKeys } from '@/store/RecoilKeys';
import { SettingParameter } from '@/types/settingParameter';
import { atom } from 'recoil';
import { fetchSettingFromDB, updateSetting } from '@/firebase/functions';
import { useRecoilState } from 'recoil';

export enum targetValue {
  CLIENT_ID = 'CLIENT ID',
  CLIENT_SECRET = 'CLIENT SECRET',
  MATTER_ID = 'MATTER ID',
  JP_ARCHIVE_FOLDER_ID = 'JP ARCHIVE FOLDER ID',
  SG_ARCHIVE_FOLDER_ID = 'SG ARCHIVE FOLDER ID',
  VN_ARCHIVE_FOLDER_ID = 'VN ARCHIVE FOLDER ID',
  TARGET_SHARE_DRIVE_ID = 'TARGET SHARE DRIVE ID',
  JP_RAW_DATA_FOLDER_ID = 'JP RAW DATA FOLDER ID',
  SG_RAW_DATA_FOLDER_ID = 'SG RAW DATA FOLDER ID',
  VN_RAW_DATA_FOLDER_ID = 'VN RAW DATA FOLDER ID',
}

export const settingState = atom<SettingParameter | undefined>({
  key: RecoilAtomKeys.SETTING_STATE,
  default: undefined,
});

export const editingSettingState = atom<SettingParameter | undefined>({
  key: RecoilAtomKeys.EDITING_SETTING_STATE,
  default: undefined,
});

export const useSettingActions = () => {
  const [state, setState] = useRecoilState(settingState);
  const [editingState, setEditingState] = useRecoilState(editingSettingState);
  const fetchSetting = async () => {
    if (state !== undefined) {
      return;
    }
    const setting = await fetchSettingFromDB();
    setState(setting);
    setEditingState(setting);
  };

  const editSettting = (value: string, target: string) => {
    const newSetting: SettingParameter = {
      setting_id: editingState?.setting_id ?? '',
      client_id: target === targetValue.CLIENT_ID ? value : editingState?.client_id ?? '',
      client_secret:
        target === targetValue.CLIENT_SECRET ? value : editingState?.client_secret ?? '',
      matter_id: target === targetValue.MATTER_ID ? value : editingState?.matter_id ?? '',
      target_share_drive_id:
        target === targetValue.TARGET_SHARE_DRIVE_ID
          ? value
          : editingState?.target_share_drive_id ?? '',
      jp_row_data_folder_id:
        target === targetValue.JP_RAW_DATA_FOLDER_ID
          ? value
          : editingState?.jp_row_data_folder_id ?? '',
      sg_row_data_folder_id:
        target === targetValue.SG_RAW_DATA_FOLDER_ID
          ? value
          : editingState?.sg_row_data_folder_id ?? '',
      vn_row_data_folder_id:
        target === targetValue.VN_RAW_DATA_FOLDER_ID
          ? value
          : editingState?.vn_row_data_folder_id ?? '',
      jp_folder_id:
        target === targetValue.JP_ARCHIVE_FOLDER_ID ? value : editingState?.jp_folder_id ?? '',
      sg_folder_id:
        target === targetValue.SG_ARCHIVE_FOLDER_ID ? value : editingState?.sg_folder_id ?? '',
      vn_folder_id:
        target === targetValue.VN_ARCHIVE_FOLDER_ID ? value : editingState?.vn_folder_id ?? '',
    };

    setEditingState(newSetting);
  };

  const onCompleted = async () => {
    if (editingState === undefined) {
      return;
    }
    setState(editingState);
    await updateSetting(editingState as SettingParameter);
  };

  const onCanceled = () => {
    setEditingState(state);
  };

  const getLocationArchiveFolderId = function (target: string): string {
    switch (target) {
      case 'JP':
        return state?.jp_folder_id ?? '';
      case 'SG':
        return state?.sg_folder_id ?? '';
      case 'VN':
        return state?.vn_folder_id ?? '';
    }
    return '';
  };

  const getLocationRowDataFolderId = function (target: string): string {
    switch (target) {
      case 'JP':
        return state?.jp_row_data_folder_id ?? '';
      case 'SG':
        return state?.sg_row_data_folder_id ?? '';
      case 'VN':
        return state?.vn_row_data_folder_id ?? '';
    }
    return '';
  };

  return {
    currentSetting: state,
    fetchSetting: fetchSetting,
    editSettting: editSettting,
    onCompleted: onCompleted,
    onCanceled: onCanceled,
    editingState: editingState,
    getLocationArchiveFolderId: getLocationArchiveFolderId,
    getLocationRowDataFolderId: getLocationRowDataFolderId,
  };
};
