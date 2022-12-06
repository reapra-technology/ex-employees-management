import { getIdByMailAddress } from '@/api/hello';
import ProcessingIcon from '@/components/statusIcons/processingIcon';
import { Button } from 'antd';
import { useState } from 'react';

export default function ExecuteButton() {
  const [isProcessing, setIsProcessing] = useState(false);

  const getAuthToken = () => {
    setIsProcessing(true);
    getIdByMailAddress('shinnosuke.tominaga@reapra.sg').then((value: string) => {
      setIsProcessing(false);
      console.log(value);
    });
  };

  if (isProcessing) {
    return <ProcessingIcon />;
  }

  return <Button onClick={() => getAuthToken()}>RUN</Button>;
}
