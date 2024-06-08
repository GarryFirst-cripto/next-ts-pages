import Head from "next/head";
import Link from "next/link";
import Heading from "../components/heading";
import { IPost } from '../components/postInfo';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPropsContext } from 'next'

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

//   console.log('YYYYYYYYY', context)

//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { posts: data },
//   }
// };

const Posts = ({ posts }: { posts: [IPost] }) => { 
  const [logg, setLogg] = useState(false);

  const router = useRouter()
console.log('XXXXXXXXXX')
  useEffect(() => {
    const token = localStorage.getItem('token')
console.log('TTTTTT', token);
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