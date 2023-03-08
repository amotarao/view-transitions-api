import { Url } from 'next/dist/shared/lib/router/router';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useViewTransitions = () => {
  const [isNotSupported, setIsNotSupported] = useState(false);
  useEffect(() => {
    !(document as any).startViewTransition && setIsNotSupported(true);
  }, []);

  const router = useRouter();

  const push = (to: Url) => {
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }
    (document as any).startViewTransition(() => router.push(to));
  };

  return {
    isNotSupported,
    push,
    onClick:
      (to: Url): LinkProps['onClick'] =>
      (e) => {
        e.preventDefault();
        push(to);
      },
  };
};
