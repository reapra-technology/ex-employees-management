import { requestCodeFlow } from '@/api/tokenAuth';
import { AuthorizedContext } from '@/components/contexts/tokenAuthContext';
import { Button } from 'antd';

import React from 'react';

export default function Unauthorized(): React.ReactElement {
  const { authInfo } = React.useContext(AuthorizedContext);

  if (authInfo != null) {
    return <a></a>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button onClick={() => requestCodeFlow()}>ログイン</Button>
    </div>
  );
}
