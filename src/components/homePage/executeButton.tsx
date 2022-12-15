import ProcessingIcon from '@/components/homePage/statusIcons/processingIcon';
import User from '@/types/user';
import { Button } from 'antd';

export default function ExecuteButton(
  user: User,
) {
  const getAuthToken = async () => {
    const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));
    // getIdByMailAddress('shinnosuke.tominaga@reapra.sg').then((value: string) => {
    //   //   setIsProcessing(false);
    //   //   console.log(value);
    // });
    await sleep(10);

    // const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));

    // // 定期トークンリフレッシュ
    // const output = () => console.log(`output: ${new Date().getSeconds()} 秒`);
    // const intervalId = setInterval(output, 1000);
    // for (let i = 0; i < 100; i++) {
    //   console.log(i);
    // }
    // setTimeout(() => clearInterval(intervalId), 3000);
  };

  return <Button onClick={() => getAuthToken()}>RUN</Button>;
}
