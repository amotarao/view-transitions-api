import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useViewTransitions } from '../../hooks/useViewTransitions';

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
  const { onClick } = useViewTransitions();

  return (
    <div className="mx-auto max-w-[640px]">
      <p className="mb-[16px]">
        <Link className="text-[16px] font-bold" href="/" onClick={onClick('/')}>
          戻る
        </Link>
      </p>
      <div
        className="mx-auto aspect-[1/1] w-[360px] bg-slate-300"
        style={{
          'view-transition-name': `thumbnail-${id}`,
        }}
      ></div>
      <p className="mt-[16px] text-center">{id}</p>
    </div>
  );
};

export default Page;
