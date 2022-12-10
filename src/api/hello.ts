// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuthInfo, getTokenFromByRefreshToken } from '@/api/tokenAuth';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

export async function getIdByMailAddress(mailAddress: string): Promise<string> {
  // const sleep = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000));
  // await sleep(3);
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    console.log('not');

    return "";
  }
  console.log(token);

  const aa = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${mailAddress}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then(async function (res) {
    const data = await res.json();
    console.log('aaa', data.id);

  })
  const res = await axios.get<any>(`https://admin.googleapis.com/admin/directory/v1/users/${mailAddress}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(function (res) {
    console.log(res.data.id);
    return res.data.id;

  })
    .catch(async function (error) {
      if (error.response) {
        if (error.response.data.error.errors[0].message === 'Invalid Credentials') {
          console.log("発火");

          await getTokenFromByRefreshToken().then(async (_) => {
            return await getIdByMailAddress(mailAddress);
          });
        }
      }
    });;


  return "";
};
