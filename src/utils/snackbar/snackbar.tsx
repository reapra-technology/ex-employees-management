import * as React from 'react';
import { AlertColor } from '@mui/material';
import { GlobalSnackbar } from './globalSnackbar';

/** SnackbarContext コンテキストオブジェクトの型 */
export type SnackbarContextType = {
  /** Snackbar に表示する文字列。空文字列のときは Snackbar を表示しないことを意味します */
  message: string;

  /** Snackbar の色 */
  severity: AlertColor; // 'error' | 'warning' | 'info' | 'success'
  duration: number;

  /** Snackbar を表示したいときに呼び出します */
  showSnackbar: (message: string, severity: AlertColor, duration: number) => void;
};

/** スナックバーの表示状態を管理するコンテキストオブジェクト */
export const SnackbarContext = React.createContext<SnackbarContextType>({
  message: '', // デフォルト値
  severity: 'error', // デフォルト値
  duration: 5000,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showSnackbar: (_message: string, _severity: AlertColor, _duration: number) => {}, // ダミー関数
});

/**
 * SnackbarContext コンテキストオブジェクトを提供するコンポーネント。
 *
 * このコンポーネント以下に配置した子コンポーネントであれば、
 * useSnackbar フック関数を呼び出すことができます。
 */
export const SnackbarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const context: SnackbarContextType = React.useContext(SnackbarContext);
  const [message, setMessage] = React.useState(context.message);
  const [severity, setSeverity] = React.useState(context.severity);
  const [duration, setDuration] = React.useState(context.duration);

  // コンテクストオブジェクトに自分自身の値を変更する関数をセットする
  const newContext: SnackbarContextType = React.useMemo(
    () => ({
      message,
      severity,
      duration,
      showSnackbar: (message: string, severity: AlertColor, duration: number) => {
        setMessage(message);
        setSeverity(severity);
        setDuration(duration);
      },
    }),
    [message, severity, duration, setMessage, setSeverity, setDuration],
  );

  // スナックバーを閉じるためのハンドラー関数
  const handleClose = React.useCallback(() => {
    setMessage('');
  }, [setMessage]);

  return (
    <SnackbarContext.Provider value={newContext}>
      {children}
      <GlobalSnackbar
        open={newContext.message !== ''}
        message={newContext.message}
        severity={newContext.severity}
        duration={newContext.duration}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

/** SnackbarContext を簡単に使うためのユーティリティ関数 */
export function useSnackbar(): SnackbarContextType {
  return React.useContext(SnackbarContext);
}
