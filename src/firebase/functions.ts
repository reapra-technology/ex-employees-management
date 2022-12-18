import { SettingParameter } from "@/types/settingParameter";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import User from "@/types/user";

export async function fetchSettingFromDB(): Promise<SettingParameter | undefined> {
  const settingsCollectionRef = collection(db, 'settings');
  const result = await getDocs(settingsCollectionRef);
  if (result.empty) {
    return undefined;
  }
  return result.docs[0].data() as SettingParameter;
}

export async function fetchUsersFromDB(): Promise<User[]> {
  const settingsCollectionRef = collection(db, 'users');
  const result = await getDocs(settingsCollectionRef);
  let users: User[] = [];
  if (result.empty) {
    return [];
  }
  result.docs.forEach((doc) => {
    users.push(doc.data() as User);
  });
  return users;
}

export async function updateSetting(newSetting: SettingParameter): Promise<void> {
  const ref = doc(
    db,
    `settings/${newSetting.setting_id}`
  )
  await setDoc(ref, newSetting).then(() => {
    console.log('success');
  });
}

export async function createUser(user: User): Promise<void> {
  const ref = doc(
    db,
    `users/${user.id}`
  );
  await setDoc(ref, user).then(() => {
    console.log('success');
  })
}

export async function updateUserStateOnDB(user: User): Promise<void> {
  const ref = doc(
    db,
    `users/${user.id}`
  );
  await setDoc(ref, user, { merge: true }).then(() => {
    console.log('success');
  })
}

export async function deleteUserOnDb(id: string): Promise<void> {
  const ref = doc(
    db,
    `users/${id}`
  );
  await deleteDoc(ref);
}

export async function archiveUser(user: User): Promise<void> {
  const ref = doc(
    db,
    `archivedUser/${user.id}`
  );
  await setDoc(ref, user);
}