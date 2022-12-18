import { getAuthInfo } from '@/api/tokenAuth';
import { PhaseApiActions, targetUserState } from '@/store/users';
import { SettingParameter } from '@/types/settingParameter';
import User from '@/types/user';
import axios from 'axios';

// トランスポート状況の確認
// then
// 実行者から目的のフォルダへ

type driveFile = {
  id: string,
  kind: string,
  mimeType: string,
  name: string
}

export async function executeFourthPhase(user: User, phaseApiActions: PhaseApiActions, getLocationFolderId: (target: string) => string,): Promise<string> {
  const status = await getTransferStatus(user.transferId ?? '');
  if (status !== 'completed') {
    return 'Data migration in progress';
  }
  const mainFolder = await getTargetUserFolderId(user.mailAddress);
  if (mainFolder === '') {
    return '';
  }
  const rawDataFolderId = getLocationFolderId(user.location);
  await moveFolderData((mainFolder as driveFile).id, rawDataFolderId, user.mailAddress);

  await deleteEmptyFolder((mainFolder as driveFile).id);

  await phaseApiActions.changeUserState(targetUserState.COMPLETE_PHASE, user.id, '4');

  return 'success';
}

async function moveFolderData(exFolderId: string, newParentFolderId: string, name: string): Promise<void> {
  const copyFolderId = await createFolder(name, newParentFolderId);
  const files = await getFilesInFolder(exFolderId);

  await Promise.all(
    files.map(async (file) => {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        await moveFolderData(file.id, copyFolderId, file.name);
      } else {
        await moveFile(file, exFolderId, copyFolderId);
      }
    })
  );
}

async function deleteEmptyFolder(targetFolderId: string): Promise<void> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return;
  }
  let result = '';
  const url = `https://www.googleapis.com/drive/v3/files/${targetFolderId}`;

  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


async function createFolder(name: string, parentId: string): Promise<string> {

  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  const mimeType = "application/vnd.google-apps.folder";
  const parents = [parentId];
  const url =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fileds=id";
  const metadata = new Blob([JSON.stringify({ mimeType, name, parents })], {
    type: "application/json; charset=UTF-8",
  });
  const formData = new FormData();
  formData.append("Metadata", metadata);

  await axios.post(url, formData, { headers: { Authorization: `Bearer ${token}`, } }).then(function (res) {
    result = res.data.id;
  });

  return result;
}

async function getFilesInFolder(parentFolderId: string): Promise<driveFile[]> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return [];
  }
  let result: driveFile[] = [];
  let nextPageToken;
  do {
    let url;
    if (nextPageToken) {
      url = `https://www.googleapis.com/drive/v3/files?q='${parentFolderId}' in parents&pageToken=${nextPageToken}`;
    } else {
      url = `https://www.googleapis.com/drive/v3/files?q='${parentFolderId}' in parents`;
    }
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      (res.data.files as driveFile[]).forEach((file) => {
        result.push(file);
      })
      nextPageToken = res.data.nextPageToken;
    });
  } while (nextPageToken);

  return result;
}

async function moveFile(file: driveFile, exParent: string, newParent: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';
  const url = `https://www.googleapis.com/drive/v3/files/${file.id}?addParents=${newParent}&removeParents=${exParent}&supportsAllDrives=true`;

  await axios.patch(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res.data);
  })
  return result;
}

async function getTargetUserFolderId(mailAddress: string): Promise<driveFile | string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: driveFile | string = '';

  let url = `https://www.googleapis.com/drive/v3/files?q=name='${mailAddress}'`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    result = res.data.files[0];
  });

  return result;
}

async function getTransferStatus(transferId: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  const url = `https://admin.googleapis.com/admin/datatransfer/v1/transfers/${transferId}`

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    result = res.data.overallTransferStatusCode;
  });
  return result;
}
