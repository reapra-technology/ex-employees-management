import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import User from '@/types/user';
import { Button } from 'antd';

export default function ExecuteButton(
  user: User,
  processingUsers: string[],
  addProcessing: (mail: string) => void,
  removeProcessing: (mail: string) => void,
) {
  const getAuthToken = async () => {
    const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));
    addProcessing(user.mailAddress);
    // getIdByMailAddress('shinnosuke.tominaga@reapra.sg').then((value: string) => {
    //   //   setIsProcessing(false);
    //   //   console.log(value);
    // });
    await sleep(10);
    removeProcessing(user.mailAddress);

    // const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));

    // // 定期トークンリフレッシュ
    // const output = () => console.log(`output: ${new Date().getSeconds()} 秒`);
    // const intervalId = setInterval(output, 1000);
    // for (let i = 0; i < 100; i++) {
    //   console.log(i);
    // }
    // setTimeout(() => clearInterval(intervalId), 3000);
  };

  if (processingUsers.includes(user.mailAddress)) {
    return <ProcessingIcon></ProcessingIcon>;
  }

  return <Button onClick={() => getAuthToken()}>RUN</Button>;
}
