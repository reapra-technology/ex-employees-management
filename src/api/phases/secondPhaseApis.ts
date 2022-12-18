import { getAuthInfo } from "@/api/tokenAuth";
import { PhaseApiActions, targetUserState } from "@/store/users";
import User from "@/types/user";
import axios from "axios";

const completeText = 'COMPLETED';
const chankSize = 1024 * 1024 * 500; //500MB

export type file = {
  bucketName: string,
  objectName: string,
  size: string
}

type archiveData = {
  status: string,
  cloudStorageSink: {
    files: file[]
  },
}
// メールアーカイブ状況確認　in ID
// ドライブアーカイブ状況確認　in ID
// then
// メールアーカイブをドライブにダウンロード ダウンロードID？
// ドライブアーカイブをドライブにダウンロード　ダウンロードID？


export default async function executeSecondPhase(user: User, matterId: string, phaseApiActions: PhaseApiActions): Promise<string> {
  let files: file[] = [];
  if ((user.objectFiles?.length ?? 0) > 0) {
    files = user.objectFiles!;
  } else {

    const mailArchiveInfo = await getRequestedArchiveInfo(matterId, user.mailExportId ?? '');
    const driveArchiveInfo = await getRequestedArchiveInfo(matterId, user.driveExportId ?? '');
    if (driveArchiveInfo === '' || driveArchiveInfo === '') {
      return 'error occured';
    }
    if ((mailArchiveInfo as archiveData).status !== completeText || (driveArchiveInfo as archiveData).status !== completeText) {
      return 'create archive is processing';
    }

    (mailArchiveInfo as archiveData).cloudStorageSink.files.forEach((file) => {
      files.push(file);
    });
    (driveArchiveInfo as archiveData).cloudStorageSink.files.forEach((file) => {
      files.push(file);
    });
    await phaseApiActions.addObjectFiles(user.id, files);

  }

  await Promise.allSettled(files.map(async (f) => {
    await transferArchiveStorageToDrive(f, user.driveDestinationId ?? '').then((_) => {
      phaseApiActions.removeOjectFile(user.id, f)
    });
  })).catch((err) => {
    return err;
  });

  await phaseApiActions.changeUserState(targetUserState.COMPLETE_PHASE, user.id, '2');

  return 'success';
}

async function transferArchiveStorageToDrive(file: file, parentFolderId: string): Promise<void> {
  console.log(`start ${file.objectName}`);

  const objectName = file.objectName.replaceAll('/', '%2F');
  const bucketName = file.bucketName;
  const uploadUrl = await getUploadUrl(objectName, parentFolderId);
  if (uploadUrl === '') {
  }

  const contentLength = Number(file.size);
  const chankCount = Math.ceil(contentLength / chankSize);

  for (let i = 0; i < chankCount; i++) {

    let range: string;
    if (i + 1 === chankCount) {
      range = `${chankSize * i}-${contentLength - 1}`;
    } else {
      range = `${chankSize * i}-${(chankSize * (i + 1) - 1)}`;
    }

    await downloadContents(bucketName, objectName, range).then(async (blob: string | Blob) => {
      if (blob === '') {
        return 'error occured';
      }

      await uploadObject(uploadUrl, objectName, blob as Blob, range, contentLength);

    });
  }
  console.log(`end ${file.objectName}`);

}

async function getRequestedArchiveInfo(matterId: string, exportId: string): Promise<archiveData | string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: archiveData | string = '';
  const url =
    `https://vault.googleapis.com/v1/matters/${matterId}/exports/${exportId}`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json; charset=UTF-8"
    }
  }).then(async function (res) {

    result = await res.data as archiveData;
  }).catch(function (err) {
    result = '';
  });
  return result;
}


async function downloadContents(bucketName: string, objectName: string, range: string): Promise<Blob | string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: string | Blob = '';
  const url =
    `https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${objectName}?alt=media`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json; charset=UTF-8",
      'range': `bytes=${range}`,
    },
    responseType: 'arraybuffer',
  }).then(async function (res) {
    const type = getContentType(objectName);
    const content = await res.data;
    const blob = new Blob([content], { type: type });

    result = blob;

  }).catch(function (err) {
    result = err;
  });

  return result;
}

async function getUploadUrl(objectName: string, parentFolderId: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  const name = objectName;
  const mimeType = getContentType(objectName);
  const parents = [parentFolderId];
  const url =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true";

  const res = await axios.post(url, { name, mimeType, parents }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (res) {
    result = res.headers['location'] ?? '';
  }).catch(function (err) {
    result = '';
  });

  return result;
}

async function uploadObject(url: string, objectName: string, object: Blob, range: string, contentLength: number): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  const formData = new FormData();
  const file = object;
  formData.append('Media', file);

  const res = await axios.put(url, file, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Range': `bytes ${range}/${contentLength}`, },
  },).then(function (res) {
  }).catch(function (err) {
    result = '';
  });

  return result;
}

function getContentType(objectName: string): string {
  const extension = objectName.slice(-3);
  switch (extension) {
    case 'zip':
      return "application/zip";
    case 'csv':
      return "text/csv";
    case 'xml':
      return "application/xml; charset=utf-8";
    default:
      return '';
  }
}
