import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { SnackbarContextProvider } from '../utils/snackbar/snackbar';
import basicAuthCheck from '../utils/basicAuthCheck';

import dynamic from 'next/dynamic';
import { ConfigProvider, Button, Layout } from 'antd';
import Login from '@/pages/login';
import { SessionProvider } from 'next-auth/react';

const AdminLayout = dynamic(() => import('../layouts/adminLayout'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6d9f71',
        },
      }}
    >
      <SnackbarContextProvider>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </SnackbarContextProvider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx;
  if (req && res) {
    await basicAuthCheck(req, res);
  }

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
