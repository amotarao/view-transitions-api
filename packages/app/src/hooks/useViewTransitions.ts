import { UrlObject } from 'url';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export const useViewTransitions = () => {
  const router = useRouter();

  return {
    push:
      (to: string | UrlObject): LinkProps['onClick'] =>
      (e) => {
        e.preventDefault();

        const push = async () => {
          await router.push(to);
        };

        if (!document.startViewTransition) {
          push();
          return;
        }

        document.startViewTransition(() => push());
      },
  };
};
