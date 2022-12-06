import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

// メールアーカイブ状況確認　in ID
// ドライブアーカイブ状況確認　in ID
// then
// メールアーカイブをドライブにダウンロード ダウンロードID？
// ドライブアーカイブをドライブにダウンロード　ダウンロードID？
// トランスポートAPIを叩く ドライブAPPID 退職者、実行者ID
// トランスポートID get
