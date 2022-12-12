import { getAuthInfo, getTokenFromByRefreshToken } from '@/api/tokenAuth';
import axios from 'axios';

const DRIVE_NAME = 'Drive and Docs';
type applicationtype = {
  name: string,
  etag: string,
  kind: string,
  id: string,
}


// メールダウンロード状況を確認　要検討　in ダウンロードID？
// ドライブダウンロード状況を確認　要検討
// トランスポートAPIを叩く ドライブAPPID 退職者、実行者ID
// トランスポートID get

export async function executeThirPhase(mailAddress: string) {
  const driveId = await getDriveId();
  const executorMail = await getExecutorEmail();

  const executorId = await getIdByMailAddress(executorMail);
  const targetEmployeeId = await getIdByMailAddress(mailAddress);

  const transferId = await requestTransfer(targetEmployeeId, executorId, driveId);
  console.log(transferId);
  await getTransferStatus(transferId);

}

async function getTransferStatus(transferId: string) {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }

  const url = `https://admin.googleapis.com/admin/datatransfer/v1/transfers/${transferId}`

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res.data);
  })
}

async function requestTransfer(oldOwnerUserId: string, newOwnerUserId: string, applicationId: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: string = '';

  const url = 'https://admin.googleapis.com/admin/datatransfer/v1/transfers'

  const applicationTransferParams = [
    {
      "key": "PRIVACY_LEVEL",
      "value": [
        "PRIVATE",
        "SHARED"
      ]
    }
  ];

  const applicationDataTransfers = {
    applicationId, applicationTransferParams
  }


  await axios.post(url, { oldOwnerUserId, newOwnerUserId, applicationDataTransfers }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async function (res) {
    console.log(res.data);

    // result = res.data;
  }).catch(function (err) {
    result = '';
  });
  return result;;
}

async function getExecutorEmail(): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: string = '';

  const url = `https://www.googleapis.com/oauth2/v3/tokeninfo`

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async function (res) {
    result = res.data.email;
  }).catch(function (err) {
    result = '';
  });
  return result;
}

async function getDriveId(): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result: string = '';
  const url = 'https://admin.googleapis.com/admin/datatransfer/v1/applications'

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async function (res) {
    console.log(res.data);
    const applications: applicationtype[] = await res.data['applications']
    const driveId = applications.filter((app) => app.name === DRIVE_NAME)[0].id;
    result = driveId;
  }).catch(function (err) {
    console.log(err);
    result = '';
  });
  return result;
}


export async function getIdByMailAddress(mailAddress: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';
  const res = await axios.get(`https://admin.googleapis.com/admin/directory/v1/users/${mailAddress}`, {
    headers: { Authorization: `Bearer ${token}`, },
  }).then(function (res) {
    result = res.data.id;
  }).catch(async function (error) {
    result = '';
  });;
  return result;
};



