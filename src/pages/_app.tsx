import Header from '@/components/Header'
import type { AppProps } from 'next/app'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import '@/styles/global.scss'

import { Provider as NextAuthProvider } from 'next-auth/client'

const initOptions = {
  "client-id": "ASCW2QOWE-txKK47cJURYOqz5xZ2FuJ44OZDVwojCw7wEEa42KJfRmjMqXGgJkHiJVVzP8CHtUuhY-4p",
  currency: 'BRL',
  intent: 'capture'
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <PayPalScriptProvider options={initOptions}>
          <Header />
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </NextAuthProvider>
    </>
  )
}
