// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuthInfo } from '@/api/tokenAuth';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

export const getIdByMailAddress = async (mailAddress: string) => {
  const token = getAuthInfo()?.access_token;
  if (token === undefined) {
    console.log('not');

    return;
  }
  const res = await axios.get<any>(`https://admin.googleapis.com/admin/directory/v1/users/${mailAddress}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data.id);

  return res.data.id;
};
