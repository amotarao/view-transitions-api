import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { items } from '../../constants/data';
import { useViewTransitions } from '../../hooks/useViewTransitions';

export type Params = {
  id: string;
};

export type Props = {
  id: string;
  src?: string;
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
      src: items.find((item) => item.id === params.id)?.src,
    },
    revalidate: 60 * 60,
  };
};

const Page: NextPage<Props> = ({ id, src }) => {
  const { onClick } = useViewTransitions();

  return (
    <div>
      <p className="mb-[16px]">
        <Link className="text-[16px] font-bold" href="/" onClick={onClick('/')}>
          戻る
        </Link>
      </p>
      <div
        className="relative mx-auto aspect-[1/1] w-full max-w-[360px] bg-slate-300"
        style={
          {
            viewTransitionName: `thumbnail-${id}`,
          } as CSSProperties
        }
      >
        {src && (
          <>
            <Image className="absolute top-0 left-0 h-full w-full" src={src} width={40} height={40} alt="" />
            <Image className="absolute top-0 left-0 h-full w-full" src={src} width={360} height={360} alt="" />
          </>
        )}
      </div>
      <p className="mt-[16px] text-center">{id}</p>
    </div>
  );
};

export default Page;
