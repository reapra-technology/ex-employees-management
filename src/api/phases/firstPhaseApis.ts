import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

// アーカイブ保存先フォルダ作成　ドライブ　メール　保存先ID返却
// メールアーカイブ依頼　アーカイブID返却
// ドライブアーカイブ依頼　アーカイブID返却