import Head from "next/head";
import Link from "next/link";
import Heading from "../components/heading";
import { IPost } from '../components/postInfo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext } from 'next';

interface CombinedPageProps {
  posts: IPost[]
  authorized: boolean
}

const Posts = (props: CombinedPageProps) => {

  const { authorized, posts } = props;

  if (!authorized) {
    return <div>Access Denied</div>
  }

  const [logg, setLogg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    } else {
      setLogg(true);
    }
  }, [router])

  return (
    <>
      { logg && <>
          <Head>
            <title>Posts</title>
          </Head>
          <Heading text="Posts list:" />
          <ul>
            {posts && posts.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </>
      }
    </>
  );
};

export default Posts;

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();

//   if (!data) {
//     return { notFound: true }
//   }

//   return {
//     props: { posts: data },
//   }
// };

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const token = req.headers.authorization || null
console.log('111111111111', req.headers.authorization)
  if (!token) {
    return {
      props: {
        authorized: false,
        posts: []
      },
    }
  }

  const isValidToken = true;
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  return {
    props: {
      authorized: isValidToken,
      posts
    },
  }
}