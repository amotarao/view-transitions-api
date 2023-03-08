import { Url } from 'next/dist/shared/lib/router/router';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useViewTransitions = () => {
  const [isNotSupported, setIsNotSupported] = useState(false);
  useEffect(() => {
    setIsNotSupported(!(document as any).startViewTransition);
  }, []);

  const router = useRouter();

  const push = useCallback(
    (to: Url) => {
      if (isNotSupported) {
        router.push(to);
        return;
      }
      (document as any).startViewTransition(() => router.push(to));
    },
    [isNotSupported, router]
  );

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
