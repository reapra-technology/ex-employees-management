

type User = {
  mailAddress: string;
  location: string;
  completePhase?: number;
  mailExportId?: string;
  driveExportId?: string;
  transferId?: string;
  mailDestinationId?: string;
  driveDestinationId?: string;
  objectNames?: string[];
};

// todo firebaseからの取得処理を書く

export default User;