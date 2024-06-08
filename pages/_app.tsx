import { AppProps } from "next/app";
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from "./components/layout";
import './styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

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
      return originalFetch(input, init)
    }
  }, [router])

  return (
    <Layout>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;