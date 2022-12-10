import { getAuthInfo } from "@/api/tokenAuth";
import axios from "axios";
import fileDownload from "js-file-download";
import JSZip from "jszip";

const completeText = 'COMPLETED';

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
// トランスポートAPIを叩く ドライブAPPID 退職者、実行者ID
// トランスポートID get

export default async function executeSecondPhase(mailAddress: string, useRefreshToken: boolean = false): Promise<string> {
  const mailArchiveInfo = await getRequestedArchiveInfo();
  console.log(mailArchiveInfo);

  // // exportIDを引数で分ける
  // const driveArchiveInfo = await getRequestedArchiveInfo();
  // if (mailAddress === '' || driveArchiveInfo === '') {
  //   return 'error occured';
  // }
  // if ((mailArchiveInfo as archiveData).status !== completeText || (driveArchiveInfo as archiveData).status !== completeText) {
  //   return 'create archive is processing';
  // }
  // const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-a2e65877-2a87-445d-8920-446806a31400/Email-shinnosuke.tominaga@reapra.sg-1.zip';
  // const objectName = "de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-f6b20e65-5498-4822-a34c-39b13cfda28e/mail-novam@reapra.sg-metadata.xml";
  // const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-a2e65877-2a87-445d-8920-446806a31400/Email-shinnosuke.tominaga@reapra.sg-results-count.csv'
  const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-a2e65877-2a87-445d-8920-446806a31400/Email-shinnosuke.tominaga@reapra.sg-metadata.csv';
  // const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-f6b20e65-5498-4822-a34c-39b13cfda28e/mail-novam@reapra.sg-1.zip';
  // 10GB
  // const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-345c900f-ac56-4d5a-b5f9-8c66f9d3df86/drive-novam@reapra.sg_0.zip';
  // 3.9GB
  // const objectName = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c/exportly-345c900f-ac56-4d5a-b5f9-8c66f9d3df86/drive-novam@reapra.sg_5.zip';
  const replacedName = objectName.replaceAll('/', '%2F');


  // const content = await fetchWithTimeout(99999999, downloadContents("f2c7b131-88c7-4ddd-8fbb-344cba1512e0", replacedName));
  const content = await downloadContents("f2c7b131-88c7-4ddd-8fbb-344cba1512e0", replacedName);
  if (content === '') {
    return 'error occured';
  }
  console.log((content as Blob).type);


  // fileDownload(content as Blob, replacedName);


  const uploadUrl = await getUploadUrl(replacedName, '1KtB5wX6uorD5L27nFRGj-yCjvggE83nH');
  if (uploadUrl === '') {
    return 'error occured';
  }

  await uploadObject(uploadUrl, replacedName, content as Blob);

  // let a = [];

  // (mailArchiveInfo as archiveData).cloudStorageSink.files.forEach((file) => {
  //   a.push();
  // });


  return '';
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


async function downloadContents(bucketName: string, objectName: string): Promise<Blob | string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: string | Blob = '';
  const url =
    `https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${objectName}?alt=media`;

  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json; charset=UTF-8"
    }
  }).then(async function (res) {
    const content = await res.blob();
    // const data = new Blob([content], { type: type });
    console.log(content.size, 'TTTTTTTTT');
    result = content;

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

async function uploadObject(url: string, objectName: string, object: Blob): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';
  console.log(object.size);

  const formData = new FormData();
  const file = object;
  formData.append('Media', file);

  const res = await axios.post(url, file, {
    headers: { Authorization: `Bearer ${token}` },
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

async function fetchWithTimeout(ms: number = 999999999999999, promise: Promise<any>): Promise<any> {
  return await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('TIMEOUT'))
    }, ms)

    promise
      .then(value => {
        clearTimeout(timer)
        resolve(value)
        return value;
      })
      .catch(reason => {
        console.log(reason);
        clearTimeout(timer)
        reject(reason)
        return reason;
      })
  })
}