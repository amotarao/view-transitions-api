import { Url, UrlObject } from 'url';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export const useViewTransitions = () => {
  const router = useRouter();

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
    push,
    onClick:
      (to: string | UrlObject): LinkProps['onClick'] =>
      (e) => {
        e.preventDefault();
        push(to);
      },
  };
};
