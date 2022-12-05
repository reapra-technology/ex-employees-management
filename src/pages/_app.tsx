import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { SnackbarContextProvider } from '../utils/snackbar/snackbar';
import basicAuthCheck from '../utils/basicAuthCheck';

import dynamic from 'next/dynamic';
import { ConfigProvider, Button, Layout } from 'antd';
import Unauthorized from '@/pages/login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Authorized } from '@/components/contexts/tokenAuthContext';

const AdminLayout = dynamic(() => import('../layouts/adminLayout'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Authorized unauthorized={<Unauthorized />}>
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
      </Authorized>
    </QueryClientProvider>
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
