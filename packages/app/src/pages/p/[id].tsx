import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

export type Params = {
  id: string;
};

export type Props = {
  id: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: params.id,
    },
    revalidate: 60 * 60,
  };
};

const Page: NextPage<Props> = ({ id }) => {
  return (
    <div className="mx-auto max-w-[640px]">
      <Link href="/">戻る</Link>
      <div
        className="aspect-[1/1] w-[360px] bg-slate-300"
        style={{
          'view-transition-name': `thumbnail-${id}`,
          contain: 'paint',
        }}
      ></div>
      <p>{id}</p>
    </div>
  );
};

export default Page;
