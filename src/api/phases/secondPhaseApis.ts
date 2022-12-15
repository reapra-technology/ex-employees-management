import { getAuthInfo } from "@/api/tokenAuth";
import axios from "axios";

const completeText = 'COMPLETED';
const chankSize = 1024 * 1024 * 500; //500MB

type file = {
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


export default async function executeSecondPhase(mailAddress: string): Promise<string> {
  const mailArchiveInfo = await getRequestedArchiveInfo();

  // // exportIDを引数で分ける
  const driveArchiveInfo = await getRequestedArchiveInfo();
  if (mailAddress === '' || driveArchiveInfo === '') {
    return 'error occured';
  }
  if ((mailArchiveInfo as archiveData).status !== completeText || (driveArchiveInfo as archiveData).status !== completeText) {
    return 'create archive is processing';
  }


  // const bucketName = "f2c7b131-88c7-4ddd-8fbb-344cba1512e0";
  // const parentId = '1KtB5wX6uorD5L27nFRGj-yCjvggE83nH';

  // const files: file[] = [
  //   {
  //     bucketName: bucketName,
  //     objectName: 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-a2e65877-2a87-445d-8920-446806a31400/Email-shinnosuke.tominaga@reapra.sg-1.zip',
  //     size: '21256442'
  //   },
  //   {
  //     bucketName: bucketName,
  //     objectName: 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-a2e65877-2a87-445d-8920-446806a31400/Email-shinnosuke.tominaga@reapra.sg-metadata.csv',
  //     size: '684382'
  //   },
  // ];

  let transferFunctions: Promise<string>[] = [];
  const driveFolderId = ''; // todo from firebase info
  const mailFolderId = '';

  (mailArchiveInfo as archiveData).cloudStorageSink.files.forEach((file) => {
    transferFunctions.push(transferArchiveStorageToDrive(file, mailFolderId));
  });

  (driveArchiveInfo as archiveData).cloudStorageSink.files.forEach((file) => {
    transferFunctions.push(transferArchiveStorageToDrive(file, driveFolderId));
  });

  // files.forEach((file) => {
  //   transferFunctions.push(transferArchiveStorageToDrive(file, parentId));
  // });

  await Promise.allSettled(transferFunctions);

  return '';
}

async function transferArchiveStorageToDrive(file: file, parentFolderId: string): Promise<string> {
  console.log(`start ${file.objectName}`);

  const objectName = file.objectName.replaceAll('/', '%2F');
  const bucketName = file.bucketName;
  const uploadUrl = await getUploadUrl(objectName, parentFolderId);
  if (uploadUrl === '') {
    return 'error occured';
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

      // firebase更新処理
    });
  }
  console.log(`end ${file.objectName}`);

  return 'success';

}

async function getRequestedArchiveInfo(): Promise<archiveData | string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: archiveData | string = '';
  // storeから取得
  const matterId = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c';
  // 引数で渡す
  const exportId = 'exportly-a2e65877-2a87-445d-8920-446806a31400'
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
    console.log(content);
    const blob = new Blob([content], { type: type });

    console.log(blob.size, 'TTTTTTTTT');
    result = blob;

  }).catch(function (err) {
    console.log(err);
    result = '';
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
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable";

  const res = await axios.post(url, { name, mimeType, parents }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (res) {
    console.log(res.headers['location']);
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
  console.log(object.size);

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
