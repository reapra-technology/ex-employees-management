import { getIdByMailAddress } from '@/api/hello';
import { getAuthInfo, getTokenFromByRefreshToken } from '@/api/tokenAuth';
import ProcessingIcon from '@/components/statusIcons/processingIcon';
import { Button } from 'antd';
import { useState } from 'react';
import { sleep } from 'react-query/types/core/utils';

export default function ExecuteButton() {
  const [isProcessing, setIsProcessing] = useState(false);

  const getAuthToken = async () => {
    setIsProcessing(true);
    getIdByMailAddress('shinnosuke.tominaga@reapra.sg').then((value: string) => {
      setIsProcessing(false);
      console.log(value);
    });
    // const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));

    // // 定期トークンリフレッシュ
    // const output = () => console.log(`output: ${new Date().getSeconds()} 秒`);
    // const intervalId = setInterval(output, 1000);
    // for (let i = 0; i < 100; i++) {
    //   await sleep(1);
    //   console.log(i);
    // }
    // setTimeout(() => clearInterval(intervalId), 3000);
  };

  if (isProcessing) {
    return <ProcessingIcon />;
  }

  return <Button onClick={() => getAuthToken()}>RUN</Button>;
}
