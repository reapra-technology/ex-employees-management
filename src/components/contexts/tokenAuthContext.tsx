import { AuthInfo, getAuthInfo, getCode, getAuthToken, setAuthInfo } from '@/api/tokenAuth';
import React from 'react';

type AuthorizedContext = Readonly<{
  authInfo?: AuthInfo;
}>;

// 認可情報を保存するContextの生成
export const AuthorizedContext = React.createContext<AuthorizedContext>({});

export function Authorized({
  unauthorized,
  children,
}: Readonly<{
  unauthorized?: React.ReactElement;
  children?: React.ReactNode;
}>): React.ReactElement | null {
  // LocalStorageから認可情報取得
  const authInfo = getAuthInfo();

  React.useEffect(() => {
    // Googleのログイン画面からアプリにリダイレクトした時の処理
    if (window.location.pathname === '/auth-code') {
      // codeの取得
      const code = getCode();
      if (code != null) {
        // アクセストークンの取得
        getAuthToken(code)
          .then((token) => {
            // LocalStorageに保存
            setAuthInfo(token);
            // トップページ移動
            window.location.href = '/';
          })
          .catch((err) => console.log(err));
      }
    }
  });

  if (authInfo === null) {
    // 未ログインの場合の画面を表示する
    return unauthorized ?? null;
  } else {
    // ログイン済みの場合の画面を表示する
    // Contextを使って認可情報を子コンポーネントでも使用できるようにする
    console.log(authInfo);

    return <AuthorizedContext.Provider value={{ authInfo }}>{children}</AuthorizedContext.Provider>;
  }
}
