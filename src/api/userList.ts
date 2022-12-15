import { getAuthInfo } from "@/api/tokenAuth";
import axios from "axios";


export async function getUserList(): Promise<string[]> {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    return [];
  }
  let result: string[] = [];

  let nextPageToken;
  do {
    let url;
    if (nextPageToken) {
      url = `https://admin.googleapis.com/admin/directory/v1/users?domain=reapra.sg&pageToken=${nextPageToken}`
    } else {
      url = `https://admin.googleapis.com/admin/directory/v1/users?domain=reapra.sg`
    }
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async function (res) {
      (res.data.users as []).forEach((user: any) => {
        result.push(user.primaryEmail);
      });
      nextPageToken = res.data.nextPageToken;
    }).catch(function (err) {
    });
  } while (nextPageToken);
  return result;
}