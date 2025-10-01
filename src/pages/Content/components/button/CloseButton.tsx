import React from 'react';
import Close from '../icons/Close';
import { useHotBoards } from '../context';

export default function CloseButton() {
  const { setIsOpen } = useHotBoards();

  return (
    <button id="hotboards-close" onClick={() => setIsOpen?.(false)}>
      <Close />
    </button>
  );
}
