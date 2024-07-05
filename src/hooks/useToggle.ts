// ----------------------------------------------------------------------

import { useState, useCallback } from 'react';

export default function useToggle(defaultChecked?: boolean) {
  const [toggle, setToggle] = useState(defaultChecked || false);

  const onToggle = useCallback(() => {
    setToggle((prevToggle) => !prevToggle);
  }, []);

  const onOpen = useCallback(() => {
    setToggle(true);
  }, []);

  const onClose = useCallback(() => {
    setToggle(false);
  }, []);

  return {
    toggle,
    onToggle,
    onOpen,
    onClose,
    setToggle,
  };
}
