import { UrlObject } from 'url';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useViewTransitions = () => {
  const router = useRouter();

  const [isNotSupported, setIsNotSupported] = useState(false);
  useEffect(() => {
    !(document as any).startViewTransition && setIsNotSupported(true);
  }, []);

  const push = (to: string | UrlObject) => {
    const push = async () => {
      await router.push(to);
    };

    if (!(document as any).startViewTransition) {
      push();
      return;
    }

    (document as any).startViewTransition(() => push());
  };

  return {
    isNotSupported,
    push,
    onClick:
      (to: string | UrlObject): LinkProps['onClick'] =>
      (e) => {
        e.preventDefault();
        push(to);
      },
  };
};
