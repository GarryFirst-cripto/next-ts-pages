import { AppProps } from "next/app";
import { useEffect } from 'react'
import Layout from "./components/layout";
import './styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {

    const originalFetch = window.fetch

    window.fetch = async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
      const token = 'qqqqqqqqqqqwwwwwwwwwwweeeeeeeeerrrrrrrr'; //localStorage.getItem('token')

      localStorage.setItem('token', token)
      // localStorage.removeItem('token')

      init.headers = init.headers || {}

      if (token) {
        (init.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
      }
console.log('EEEEEEEEEEE', input);
      return originalFetch(input, init)
    }
  }, [])

  return (
    <Layout>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;