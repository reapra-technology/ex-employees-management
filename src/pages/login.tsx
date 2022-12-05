import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  return (
    <div>
      <div>ログインしていません。</div>
      <button onClick={() => {}}>ログイン</button>
    </div>
  );
}
