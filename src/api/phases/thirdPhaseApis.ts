import { getAuthInfo } from '@/api/tokenAuth';
import { PhaseApiActions } from '@/store/users';
import User from '@/types/user';
import axios from 'axios';

const DRIVE_NAME = 'Drive and Docs';
type applicationtype = {
  name: string;
  etag: string;
  kind: string;
  id: string;
};
// transfer APIを叩く transfer IDを取得
// transferId -> DB保存

export async function executeThirPhase(user: User, phaseApiActions: PhaseApiActions) {
  const driveId = await getDriveId();
  const executorMail = await getExecutorEmail();

  const executorId = await getIdByMailAddress(executorMail);
  const targetUserId = await getIdByMailAddress(user.mailAddress);

  const transferId = await requestTransfer(targetUserId, executorId, driveId);
  if (transferId === '') {
    return 'error occured';
  }

  await phaseApiActions.completeThirdPhse(user.id, transferId);

  return 'success';
}

async function requestTransfer(
  oldOwnerUserId: string,
  newOwnerUserId: string,
  applicationId: string,
): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return '';
  }
  let result: string = '';

  const url = 'https://admin.googleapis.com/admin/datatransfer/v1/transfers';

  const applicationTransferParams = [
    {
      key: 'PRIVACY_LEVEL',
      value: ['PRIVATE', 'SHARED'],
    },
  ];

  const applicationDataTransfers = {
    applicationId,
    applicationTransferParams,
  };

  await axios
    .post(
      url,
      { oldOwnerUserId, newOwnerUserId, applicationDataTransfers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(async function (res) {
      result = res.data.id;
    })
    .catch(function (err) {
      console.log(err);
      result = '';
    });
  return result;
}

export async function getExecutorEmail(): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return '';
  }
  let result: string = '';

  const url = `https://www.googleapis.com/oauth2/v3/tokeninfo`;

  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async function (res) {
      result = res.data.email;
    })
    .catch(function (err) {
      console.log(err);
      result = '';
    });
  return result;
}

async function getDriveId(): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return '';
  }
  let result: string = '';
  const url = 'https://admin.googleapis.com/admin/datatransfer/v1/applications';

  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async function (res) {
      const applications: applicationtype[] = await res.data['applications'];
      const driveId = applications.filter((app) => app.name === DRIVE_NAME)[0].id;
      result = driveId;
    })
    .catch(function (err) {
      console.log(err);
      result = '';
    });
  return result;
}

export async function getIdByMailAddress(mailAddress: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return '';
  }
  let result = '';
  const res = await axios
    .get(`https://admin.googleapis.com/admin/directory/v1/users/${mailAddress}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (res) {
      result = res.data.id;
    })
    .catch(async function (err) {
      console.log(err);
      result = '';
    });
  return result;
}
