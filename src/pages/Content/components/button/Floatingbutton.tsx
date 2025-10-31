import React, { useEffect, useRef, useState } from 'react';
import { useHotBoards } from '../context';
import TN24White from '../icons/TN24White';

const FloatingButton: React.FC = () => {
  const { setIsOpen } = useHotBoards();

  const boxRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [initialTop, setInitialTop] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.local.get('pos_y', ({ pos_y }) => {
      setInitialTop(pos_y ? parseInt(pos_y, 10) : 80);
    });
    chrome.storage.local.get('showButton', ({ showButton }) => {
      if (typeof showButton !== 'undefined') setIsVisible(Boolean(showButton));
    });
  }, []);

  useEffect(() => {
    const handleDragging = (e: MouseEvent) => {
      if (!isDragging || !boxRef.current) return;
      const deltaY = e.clientY - startY;
      boxRef.current.style.top = `${initialTop + deltaY}px`;
    };

    const handleDragEnd = (e: MouseEvent) => {
      setIsDragging(false);
      if (!boxRef.current) return;

      boxRef.current.style.cursor = 'pointer';

      const currentTop = boxRef.current.offsetTop;
      setInitialTop(currentTop);

      chrome.storage.local.set({ pos_y: currentTop.toString() });
    };

    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleDragging);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, startY, initialTop]);

  const handleMouseDown = (e: React.MouseEvent) => {
    startTimeRef.current = Date.now();
    if (!boxRef.current) return;
    setIsDragging(true);
    setStartY(e.clientY);
    boxRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    const pressDuration = Date.now() - startTimeRef.current;

    if (pressDuration < 100) {
      setIsOpen?.(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="floating-button"
      role="button"
      tabIndex={0}
      aria-label="Extension floating button"
      ref={boxRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ top: initialTop }}
    >
      <TN24White size={28} />
      <span className="floating-button__text">실시간 인기 검색어</span>
    </div>
  );
};

export default FloatingButton;
