import type { NextApiRequest, NextApiResponse } from 'next';

type EmployeeParameter = {
  mailAddress: string;
  location:string;
  completePhase:number;
  mailExportId:string;
  driveExportId:string;
  transferId:string;
  mailDestinationId:string;
  driveDestinationId:string;
};

// todo firebaseからの取得処理を書く

export default EmployeeParameter;