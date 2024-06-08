import Head from "next/head";
import Heading from "./components/heading";
import Socials, { ISocials } from "./components/socials";
import styles from "./styles/home.module.scss";
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.API_HOST}/socials`);
    const data = await response.json();

    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
      props: { socials: data },
    }
  } catch {
    return {
      props: { socials: null },
    }
  }
};

const Home = ({ socials }: { socials: [ISocials]}) => {

  const router = useRouter();
  const { postpage } = router.query;
  if (postpage === 'true') {
    router.push('/posts?logg=true');
    return null
  }
  
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