import { SettingParameter } from '@/types/settingParameter';
import { db } from '../../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import User from '@/types/user';

export async function fetchSettingFromDB(): Promise<SettingParameter | undefined> {
  const settingsCollectionRef = collection(db, 'settings');
  const result = await getDocs(settingsCollectionRef);
  if (result.empty) {
    return undefined;
  }
  return result.docs[0].data() as SettingParameter;
}

export async function fetchUsersFromDB(): Promise<User[]> {
  const userCollectionRef = query(collection(db, 'users'), orderBy('createdAt', 'asc'));
  const result = await getDocs(userCollectionRef);
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
  const ref = doc(db, `settings/${newSetting.setting_id}`);
  await setDoc(ref, newSetting).then(() => {});
}

export async function createUser(user: User): Promise<void> {
  const ref = doc(db, `users/${user.id}`);
  await setDoc(ref, user);
}

export async function updateUserStateOnDB(user: User): Promise<void> {
  const ref = doc(db, `users/${user.id}`);
  await setDoc(ref, user, { merge: true });
}

export async function deleteUserOnDb(id: string): Promise<void> {
  const ref = doc(db, `users/${id}`);
  await deleteDoc(ref);
}

export async function archiveUser(user: User): Promise<void> {
  const ref = doc(db, `archivedUser/${user.id}`);
  await setDoc(ref, user);
}

export async function getExecutedUsersFromDB(): Promise<User[]> {
  const collectionRef = query(collection(db, 'archivedUser'), orderBy('createdAt', 'asc'));
  const result = await getDocs(collectionRef);
  let users: User[] = [];
  if (result.empty) {
    return [];
  }
  result.docs.forEach((doc) => {
    users.push(doc.data() as User);
  });
  return users;
}
