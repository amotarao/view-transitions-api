import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ids = [1, 2, 3, 4, 5];

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[640px]">
      <ul className="grid grid-cols-1 gap-[24px]">
        {ids.map((id) => (
          <li key={id}>
            <Link
              className="flex items-center gap-[8px]"
              href={`/p/${id}`}
              onClick={(e) => {
                e.preventDefault();

                const push = async () => {
                  await router.push(`/p/${id}`);
                };

                if (!document.startViewTransition) {
                  push();
                  return;
                }

                document.startViewTransition(() => push());
              }}
            >
              <div
                className="aspect-[1/1] w-[40px] bg-slate-300"
                style={{
                  'view-transition-name': `thumbnail-${id}`,
                  contain: 'paint',
                }}
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
