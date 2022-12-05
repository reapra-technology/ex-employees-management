import { getAuthInfo, requestCodeFlow } from '@/api/tokenAuth';
import { AuthorizedContext } from '@/components/contexts/tokenAuthContext';
import Router from 'next/router';

import React, { useEffect } from 'react';

export default function Unauthorized(): React.ReactElement {
  const { authInfo } = React.useContext(AuthorizedContext);

  if (authInfo != null) {
    return <a></a>;
  }
  console.log('builddldldldldl');

  return (
    <div>
      <div>ログインしていません。</div>
      <button onClick={() => requestCodeFlow()}>ログイン</button>
      <button onClick={() => console.log('pppprpprp')}>ログイン</button>
    </div>
  );
}
