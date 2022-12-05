import { getAuthInfo, requestCodeFlow } from '@/api/tokenAuth';

export default function Unauthorized(): React.ReactElement {
  return (
    <div>
      <div>ログインしていません。</div>
      <button onClick={() => requestCodeFlow()}>ログイン</button>
      <button onClick={() => console.log('pppprpprp')}>ログイン</button>
    </div>
  );
}
