import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { SnackbarContextProvider } from '../utils/snackbar/snackbar';
import basicAuthCheck from '../utils/basicAuthCheck';

import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('../layouts/adminLayout'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SnackbarContextProvider>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </SnackbarContextProvider>
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
