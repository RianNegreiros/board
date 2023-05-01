import Header from '@/components/Header'
import type { AppProps } from 'next/app'

import '@/styles/global.scss'

import { Provider as NextAuthProvider } from 'next-auth/client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  )
}
