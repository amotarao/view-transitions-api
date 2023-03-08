import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { items } from '../constants/data';
import { useViewTransitions } from '../hooks/useViewTransitions';

const Page: NextPage = () => {
  const { onClick } = useViewTransitions();

  return (
    <div>
      <ul className="grid grid-cols-1 gap-[16px]">
        {items.map(({ id, src }) => (
          <li key={id}>
            <Link className="flex items-center gap-[8px]" href={`/p/${id}`} onClick={onClick(`/p/${id}`)}>
              <div
                className="aspect-[1/1] w-[40px] bg-slate-300"
                style={
                  {
                    'view-transition-name': `thumbnail-${id}`,
                  } as CSSProperties
                }
              >
                <Image src={src} width={40} height={40} alt="" />
              </div>
              <p>{id}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
