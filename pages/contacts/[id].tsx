import Head from "next/head";
import ContactInfo, { IContact } from "../components/contactInfo";

interface IContext {
  params: {
    id: string
  }
}

interface IData {
  id: number;
}

// export const getStaticPaths = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users/');
//   const data: IData[] = await response.json();

//   const paths = data.map(({ id }) => ({
//     params: { id: id.toString() }
//   }));

//   return {
//     paths,
//     fallback: false,
//   }
// };

// export const getStaticProps = async (context: IContext) => {
//   const { id } = context.params;
//   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   const data = await response.json();

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { post: data },
//   }
// };

export const getServerSideProps = async (context: IContext) => {
  const { id } = context.params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { contact: data },
  }
};

const Contact = ({ contact }: { contact: IContact }) => (
  <>
    <Head>
      <title>Contact page</title>
    </Head>
    <ContactInfo contact={contact} />
  </>
);

export default Contact;