import { NextPage } from 'next';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { useViewTransitions } from '../hooks/useViewTransitions';

const ids = [1, 2, 3, 4, 5];

const Page: NextPage = () => {
  const { onClick } = useViewTransitions();

  return (
    <div className="mx-auto max-w-[640px]">
      <ul className="grid grid-cols-1 gap-[16px]">
        {ids.map((id) => (
          <li key={id}>
            <Link className="flex items-center gap-[8px]" href={`/p/${id}`} onClick={onClick(`/p/${id}`)}>
              <div
                className="aspect-[1/1] w-[40px] bg-slate-300"
                style={
                  {
                    'view-transition-name': `thumbnail-${id}`,
                  } as CSSProperties
                }
              ></div>
              <p>{id}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
