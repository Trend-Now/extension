import React from 'react';
import { useHotBoards } from '../context';
import TN24White from '../icons/TN24White';

const FloatingButton: React.FC = () => {
  const { setIsOpen } = useHotBoards();

  const handleClick = () => {
    setIsOpen?.(true);
  };

  return (
    <div
      className="floating-button"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Extension floating button"
    >
      <TN24White size={28} />
      <span className="floating-button__text">실시간 인기 검색어</span>
    </div>
  );
};

export default FloatingButton;
