import { saveFileData } from '@/api/phases/secondPhaseApis';

type User = {
  id: string;
  mailAddress: string;
  createdAt: number;
  location: string;
  completePhase?: number;
  mailExportId?: string;
  driveExportId?: string;
  transferId?: string;
  mailDestinationId?: string;
  driveDestinationId?: string;
  objectFiles?: saveFileData[];
  totalObjectFiles?: number;
};

export default User;
