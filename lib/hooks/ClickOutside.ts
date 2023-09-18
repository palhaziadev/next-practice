import { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: undefined) => void
) => {
  useEffect(() => {
    const listener = (
      // TODO fix type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event
      // event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
    ) => {
      // ) => {

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
