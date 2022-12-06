import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

// メールダウンロード状況を確認　要検討　in ダウンロードID？
// ドライブダウンロード状況を確認　要検討
// トランスポート状況の確認
// then
// 実行者から目的のフォルダへ
