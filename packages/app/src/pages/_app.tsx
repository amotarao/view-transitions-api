import type { AppProps } from 'next/app';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="grid h-[80px] place-items-center text-[20px] font-bold">View Transitions API</header>
      <Component {...pageProps} />
    </div>
  );
}
