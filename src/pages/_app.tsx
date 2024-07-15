import '@/styles/globals.css'
import GlobalLoading from '@/components/GlobalLoadingIndicator'
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <GlobalLoading />
      <Component {...pageProps} />
    </>
  ) 
}