import React from 'react';
import TN24Blue from '../icons/TN24Blue';
import { useHotBoards } from '../context';

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
      <TN24Blue />
      <span className="floating-button__text">실시간 인기 검색어</span>
    </div>
  );
};

export default FloatingButton;
