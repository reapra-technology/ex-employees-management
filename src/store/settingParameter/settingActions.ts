import { fetchSettingFromDB, updateSetting } from "@/firebase/functions";
import { editingSettingState, settingState } from "@/store/settingParameter/settingState";
import { SettingParameter } from "@/types/settingParameter";
import { Firestore } from "firebase/firestore";
import { useRecoilState } from "recoil";


export enum targetValue {
  CLIENT_ID = 'CLIENT ID',
  CLIENT_SECRET = 'CLIENT SECRET',
  DEST_FOLDER_ID = 'DEST FOLDER ID',
  JP_FOLDER_ID = 'JP FOLDER ID',
  SG_FOLDER_ID = 'SG FOLDER ID',
  VN_FOLDER_ID = 'VN FOLDER ID',
}

export const useSettingActions = () => {
  const [state, setState] = useRecoilState(settingState);
  const [editingState, setEditingState] = useRecoilState(editingSettingState);
  const fetchSetting = async () => {
    console.log(state, 'kkkk');
    if (state !== undefined) {
      return;
    }
    const setting = await fetchSettingFromDB();
    console.log(setting);
    setState(setting);
    setEditingState(setting);
  }

  const editSettting = (value: string, target: string) => {
    const newSetting: SettingParameter = {
      setting_id: editingState?.setting_id ?? '',
      client_id: target === targetValue.CLIENT_ID ? value : editingState?.client_id ?? '',
      client_secret: target === targetValue.CLIENT_SECRET ? value : editingState?.client_secret ?? '',
      dest_folder_id: target === targetValue.DEST_FOLDER_ID ? value : editingState?.dest_folder_id ?? '',
      jp_folder_id: target === targetValue.JP_FOLDER_ID ? value : editingState?.jp_folder_id ?? '',
      sg_folder_id: target === targetValue.SG_FOLDER_ID ? value : editingState?.sg_folder_id ?? '',
      vn_folder_id: target === targetValue.VN_FOLDER_ID ? value : editingState?.vn_folder_id ?? '',
    }

    setEditingState(newSetting);
  }

  const onCompleted = async () => {
    if (editingState === undefined) {
      return;
    }
    setState(editingState);
    console.log(state?.client_id);
    await updateSetting(editingState as SettingParameter);
  }

  const onCanceled = () => {
    setEditingState(state);
    console.log(editingState?.client_id);

  }
  return { fetchSetting: fetchSetting, editSettting: editSettting, onCompleted: onCompleted, onCanceled: onCanceled, editingState: editingState };
}
