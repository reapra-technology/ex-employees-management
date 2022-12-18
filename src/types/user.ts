import {  saveFileData } from "@/api/phases/secondPhaseApis";


type User = {
  id: string;
  mailAddress: string;
  location: string;
  completePhase?: number;
  mailExportId?: string;
  driveExportId?: string;
  transferId?: string;
  mailDestinationId?: string;
  driveDestinationId?: string;
  objectFiles?: saveFileData[];
  totalObjectFiles?: number
};

// todo firebaseからの取得処理を書く

export default User;