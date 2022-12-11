import { RecoilAtomKeys } from "@/store/RecoilKeys";
import { SettingParameter } from "@/types/settingParameter";
import { atom } from "recoil";

export const settingState = atom<SettingParameter | undefined>({
  key: RecoilAtomKeys.SETTING_STATE,
  default: undefined
});

export const editingSettingState = atom<SettingParameter | undefined>({
  key: RecoilAtomKeys.EDITING_SETTING_STATE,
  default: undefined,
})