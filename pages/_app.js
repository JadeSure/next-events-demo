import Head from 'next/head';
import Notification from '../components/notification/notification'
import NotificationContextProvider from '../store/notification-context'
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import {NotificationContext} from '../store/notification-context'
import {useContext} from 'react'

function MyApp({ Component, pageProps }) {
  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification

  return (
    <NotificationContextProvider>
      <Layout>
          <Head>
            <title>Next Events</title>
            <meta name='description' content='NextJS Events' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          </Head>
          <Component {...pageProps} /> 
          {/* <Notification title="title" message="eat chocolate" status='success'/> */}
             </Layout>
    </NotificationContextProvider>
    
  );
}

export default MyApp;
