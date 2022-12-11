import { SettingParameter } from "@/types/settingParameter";
import { db } from "../../firebase";
import { collection, doc, Firestore, getDocs, getFirestore, QuerySnapshot, setDoc } from "firebase/firestore";

export async function fetchSettingFromDB(): Promise<SettingParameter | undefined> {
  const settingsCollectionRef = collection(db, 'settings');
  const result = await getDocs(settingsCollectionRef);
  if (result.empty) {
    return undefined;
  }
  return result.docs[0].data() as SettingParameter;
}

export async function updateSetting(newSetting: SettingParameter): Promise<void> {
  const db = getFirestore();
  const ref = doc(
    db,
    `settings/${newSetting.setting_id}`
  )
  await setDoc(ref, newSetting).then(() => {
    console.log('success');
  });
}