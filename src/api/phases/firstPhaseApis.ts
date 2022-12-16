import { getAuthInfo, getTokenFromByRefreshToken } from '@/api/tokenAuth';
import { targetValue } from '@/store/setting';
import { PhaseCompleteActions, targetUserState } from '@/store/users';
import User from '@/types/user';
import axios from 'axios';


// アーカイブ保存先フォルダ作成　ドライブ　メール　保存先ID返却
// メールアーカイブ依頼　アーカイブID返却
// ドライブアーカイブ依頼　アーカイブID返却

export async function executeFirstPhase(user: User, getLocationFolderId: (target: string) => string,
  phaseCompleteActions: PhaseCompleteActions,
): Promise<string> {
  const locationId = getLocationFolderId(user.location);
  const baseArchiveId = await createArchiveFolder(user.mailAddress, locationId);
  if (baseArchiveId === '') {
    return 'error occured';
  }
  const mailFolderId = await createFolder(baseArchiveId, false);
  const driveFolderId = await createFolder(baseArchiveId, true);

  if (mailFolderId === '' || driveFolderId === '') {
    return 'error occured';
  }


  const mailArchiveId = await requestArchive(user.mailAddress, false);

  const driveArchiveId = await requestArchive(user.mailAddress, true);

  if (mailArchiveId === '' || driveArchiveId === '') {
    return 'error occured';
  }
  await phaseCompleteActions.firstPhase(user.id, mailArchiveId, driveArchiveId, mailFolderId, driveFolderId);

  return 'success';

}

async function createArchiveFolder(mailAddress: string, locationId: string): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';


  const toDay = formattedCurrentDate();

  const name = `${toDay} ${mailAddress}`;
  const mimeType = "application/vnd.google-apps.folder";
  const parents = [locationId];
  const url =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fileds=id";
  const metadata = new Blob([JSON.stringify({ mimeType, name, parents })], {
    type: "application/json; charset=UTF-8",
  });
  const formData = new FormData();
  formData.append("Metadata", metadata);

  const res = await axios.post(url, formData, { headers: { Authorization: `Bearer ${token}`, } }).then(function (res) {
    result = res.data.id;

  }).catch(function (err) {
    result = '';
  });

  return result;
}



async function createFolder(baseFolderId: string, isDrive: boolean): Promise<string> {

  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  const name = isDrive ? 'Drive' : 'Email';
  const mimeType = "application/vnd.google-apps.folder";
  const parents = [baseFolderId];
  const url =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fileds=id";
  const metadata = new Blob([JSON.stringify({ mimeType, name, parents })], {
    type: "application/json; charset=UTF-8",
  });
  const formData = new FormData();
  formData.append("Metadata", metadata);

  await axios.post(url, formData, { headers: { Authorization: `Bearer ${token}`, } }).then(function (res) {
    result = res.data.id;
  }).catch(function (err) {
    result = '';
  });

  return result;
}


async function requestArchive(mailAddress: string, isDrive: boolean): Promise<string> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return "";
  }
  let result = '';

  // storeから取得
  const matterId = 'de9c4beb-ce77-436c-a5d9-50c7333b1b6c';

  const emails = [mailAddress];
  const corpus = isDrive ? 'DRIVE' : 'MAIL';
  const dataScope = 'ALL_DATA';
  const searchMethod = 'ACCOUNT';
  const accountInfo = { emails };
  const query = {
    corpus, dataScope, searchMethod, accountInfo
  }

  const exportFormat = 'MBOX';
  const showConfidentialModeContent = true;
  const mailOptions = {
    exportFormat, showConfidentialModeContent
  }

  const exportOptions = {
    mailOptions
  }
  const url =
    `https://vault.googleapis.com/v1/matters/${matterId}/exports`;
  const name = (isDrive ? 'Drive-' : 'Email-') + mailAddress;
  const requestBody = isDrive ? { name, query } : { name, query, exportOptions };


  await axios.post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json; charset=UTF-8"
    }
  }).then(function (res) {
    result = res.data.id;
  }).catch(function (err) {
    result = '';
  });

  return result;

}


function formattedCurrentDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  const yyyy = y.toString();
  const mm = ("00" + m).slice(-2);
  const dd = ("00" + d).slice(-2);

  return (yyyy + mm + dd);
}
