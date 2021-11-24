import type { AppProps } from 'next/app'
import '../styles/tailwind.css'
import NavHeader from '../components/NavHeader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavHeader />
        <Component {...pageProps} />
    </>
    )
}

export default MyApp
