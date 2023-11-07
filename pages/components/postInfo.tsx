import Heading from "./heading";

export interface IPost {
  id: string;
  title: string;
  body: string;
}

const PostInfo = ({ post }: { post: IPost }) => {
  const { title, body } = post || {};

  if (!post) {
    return <Heading tag="h3" text="Empty post" />
  }

  return (
    <>
      <Heading tag="h3" text={title} />
      <p>{body}</p>
    </>
  );
}

export default PostInfo;