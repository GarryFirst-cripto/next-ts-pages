import { FC } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface Params {
  data: string,
  revalidate: () => void;
}

const HomePage: FC<Params> = ({ data, revalidate }) => {
  const router = useRouter();

  const handleRouterClick = () => {
    router.refresh();
  }

  const callback = async () => {
    revalidate();
  }
  
  return (
    <main>
      <h2><strong> Main page </strong></h2>
      <div>{data}</div>
      <Link className='link' href="/history" prefetch={false}>History</Link>
      <br />
      <button onClick={callback}>Revalidate Page</button>
      <br />
      <button onClick={handleRouterClick}>Router Refresh</button>
    </main>
  );
}

export default HomePage
