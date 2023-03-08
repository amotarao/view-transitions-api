import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useViewTransitions } from '../hooks/useViewTransitions';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isNotSupported, push } = useViewTransitions();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      push(as);
      return false;
    });
  }, []);

  return (
    <div className="mx-auto max-w-[640px] px-[16px]">
      <header className="grid h-[80px] place-items-center">
        <div className="grid grid-cols-1 gap-[4px]">
          <h1 className="text-center text-[20px] font-bold">View Transitions API</h1>
          {isNotSupported && <p className="text-center text-[12px]">あなたのブラウザは対応してないっぽいよ</p>}
        </div>
      </header>
      <Component {...pageProps} />
    </div>
  );
}
