import Head from "next/head";
import Heading from "./components/heading";
import Socials, { ISocials } from "./components/socials";
import styles from "./styles/home.module.scss";
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// export const getStaticProps = async () => {
//   try {
//     const response = await fetch(`${process.env.API_HOST}/socials`);
//     if (response.ok !== true) {
//       return { notFound: true }
//     }

//     const data = await response.json();
//     if (!data) {
//       return { notFound: true }
//     }

//     return {
//       props: { socials: data },
//     }
//   } catch {
//     return {
//       props: { socials: null },
//     }
//   }
// };

interface CombinedPageProps {
  socials: ISocials[]
  authorized: boolean
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const token = req.headers.authorization || null

  if (!token) {
    return {
      props: {
        authorized: false,
        socials: []
      },
    }
  }

  const isValidToken = true;
  const response = await fetch(`${process.env.API_HOST}/socials`, { headers: { 'authorization': token} });
  const socials = await response.json();

  return {
    props: {
      authorized: isValidToken,
      socials
    },
  }
}

const Home = (props: CombinedPageProps) => {

  const { authorized, socials } = props;
  const router = useRouter();
  
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Home</title>
      </Head>
      <Heading text="Next.js Application" />
      <Socials socials={socials} />
    </div>
  )
};

export default Home;