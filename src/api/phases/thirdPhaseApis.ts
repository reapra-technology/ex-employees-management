import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}


// メールダウンロード状況を確認　要検討　in ダウンロードID？
// ドライブダウンロード状況を確認　要検討
// トランスポートAPIを叩く ドライブAPPID 退職者、実行者ID
// トランスポートID get



