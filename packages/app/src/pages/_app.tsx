import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useViewTransitions } from '../hooks/useViewTransitions';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { push } = useViewTransitions();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      push(as);
      return false;
    });
  }, []);

  return (
    <div>
      <header className="grid h-[80px] place-items-center text-[20px] font-bold">View Transitions API</header>
      <Component {...pageProps} />
    </div>
  );
}
