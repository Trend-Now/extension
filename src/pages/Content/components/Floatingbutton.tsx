import React, { useRef } from 'react';
import Trendnow from './icons/Trendnow';

const FloatingButton: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    chrome.runtime.sendMessage({ type: 'FLOAT_CLICKED' });
  };

  return (
    <div
      id="floating-button"
      ref={ref}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Extension floating button"
    >
      <Trendnow />
      <span id="floating-button-text">실시간 인기 검색어</span>
    </div>
  );
};

export default FloatingButton;
