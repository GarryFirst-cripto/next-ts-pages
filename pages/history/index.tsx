import { GetStaticProps } from 'next';
import Link from "next/link";
import Head from 'next/head';
// import getHistory from "../actions/getHistory";

async function getHistory() {
  const data = await fetch("http://127.0.0.1:8000/history", { cache: 'no-store' });
  return data.json();
}

interface StaticServerSideProps {
  history: string;
}

export const getStaticProps: GetStaticProps<StaticServerSideProps> = async () => {
  const { data } = await getHistory();
  console.log('HISTORY-P:', data);
  return {
    props: {
      history: data,
    },
    revalidate: 20,
  };
};

// export const getServerSideProps = async () => {
//   const { data } = await getHistory();
//   console.log('HISTORY-S:', data);
//   return {
//     props: {
//       history: data,
//     },
//   };
// };

export default function History({ history }: StaticServerSideProps) {

  const historyData = history;
  return (
    <div>
      <Head>
        <title>Create History</title>
      </Head>
      <main>
        <h2><strong> History page </strong></h2>
        <div>History Data: <span>{historyData}</span></div>
        <Link className='link' href="/" prefetch={false} >Home</Link>
      </main>
    </div>
  );
}