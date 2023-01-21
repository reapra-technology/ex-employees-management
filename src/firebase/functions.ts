import { SettingParameter } from '@/types/settingParameter';
import { db } from '../../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import User from '@/types/user';

export async function fetchSettingFromDB(): Promise<SettingParameter | undefined> {
  const settingsCollectionRef = collection(db, 'settings');
  const result = await getDocs(settingsCollectionRef).catch((err): undefined => {
    console.log(err);
    return undefined;
  });
  if (result === undefined || result.empty) {
    return undefined;
  }
  return result.docs[0].data() as SettingParameter;
}

export async function fetchUsersFromDB(): Promise<User[]> {
  const userCollectionRef = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const result = await getDocs(userCollectionRef).catch((err): undefined => {
    console.log(err);
    return undefined;
  });
  let users: User[] = [];
  if (result === undefined || result.empty) {
    return [];
  }
  result.docs.forEach((doc) => {
    users.push(doc.data() as User);
  });
  return users;
}

export async function updateSetting(newSetting: SettingParameter): Promise<void> {
  const ref = doc(db, `settings/${newSetting.setting_id}`);
  await setDoc(ref, newSetting)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
}

export async function createUser(user: User): Promise<void> {
  const ref = doc(db, `users/${user.id}`);
  await setDoc(ref, user).catch((err) => {
    console.log(err);
  });
}

export async function updateUserStateOnDB(user: User): Promise<void> {
  const ref = doc(db, `users/${user.id}`);
  await setDoc(ref, user, { merge: true }).catch((err) => {
    console.log(err);
  });
}

export async function deleteUserOnDb(id: string): Promise<void> {
  const ref = doc(db, `users/${id}`);
  await deleteDoc(ref).catch((err) => {
    console.log(err);
  });
}

export async function archiveUser(user: User): Promise<void> {
  const ref = doc(db, `archivedUser/${user.id}`);
  await setDoc(ref, user).catch((err) => {
    console.log(err);
  });
}

export async function getExecutedUsersFromDB(): Promise<User[]> {
  const collectionRef = query(collection(db, 'archivedUser'), orderBy('createdAt', 'desc'));
  const result = await getDocs(collectionRef).catch((err): undefined => {
    console.log(err);
    return undefined;
  });
  let users: User[] = [];
  if (result === undefined || result.empty) {
    return [];
  }
  result.docs.forEach((doc) => {
    users.push(doc.data() as User);
  });
  return users;
}
