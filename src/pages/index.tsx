import TitileRowCard from '@/components/titileRowCard';
import EmployeeParameter from '../api/employeeParameter';
import RowCard from '../components/rowCard/rowCard';

export default function Users() {
  const employees: EmployeeParameter[] = [
    {
      mailAddress: 'shin',
      location: 'SG',
      mailExportId: 'phrgohqoh',
      driveExportId: 'gprhbnoerboq',
      transferId: 'yyyyyy',
      mailDestinationId: 'gbebgbbgbg',
      driveDestinationId: 'gkegbegige',
      completePhase: 2,
    },
    {
      mailAddress: 'shin2',
      location: 'JP',
      mailExportId: 'yyeyeyeye',
      driveExportId: 'fffffff',
      transferId: 'yyyyyccccy',
      mailDestinationId: 'gbdssssebgbbgbg',
      driveDestinationId: 'gkessssgbegige',
      completePhase: 1,
    },
    {
      mailAddress: 'shin3',
      location: 'VN',
      mailExportId: 'rrrrr',
      driveExportId: 'ttttt',
      transferId: 'yyyyyy',
      mailDestinationId: 'gbebbbbbgbbgbg',
      driveDestinationId: 'bbbbbbbb',
      completePhase: 3,
    },
  ];

  return (
    <>
      <TitileRowCard />
      {employees.map((param, index) => {
        return RowCard(param);
      })}
    </>
  );
}
