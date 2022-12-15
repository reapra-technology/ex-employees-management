import TitileRowCard from '@/components/homePage/titileRowCard';
import EmployeeParameter from '../types/employeeParameter';
import RowCard from '../components/homePage/rowCard';
import AddExEmployee from '@/components/homePage/addExEmployee';
import HorizontalDivider from '@/components/common/horizontalDivider';

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
      <AddExEmployee />
      {HorizontalDivider()}
      <TitileRowCard />
      <ul className="h-2/3 overflow-scroll">
        {employees.map((param, index) => {
          return <li>{RowCard(param)}</li>;
        })}
      </ul>
    </>
  );
}
