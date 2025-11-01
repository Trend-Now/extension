import React, { useEffect, useRef, useState } from 'react';
import { useHotBoards } from '../../context/hotBoardsContext';
import TN24White from '../icons/TN24White';
import { ChromeLocalStorage, ChromeRuntime } from '../../../shared/lib/chrome';
import {
  SettingsBooleanMessage,
  SettingsMessageResponse,
} from '../../../shared/types/settings';

const FloatingButton: React.FC = () => {
  const { setIsOpen } = useHotBoards();

  const boxRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [initialTop, setInitialTop] = useState<number>(0);
  const [buttonVisible, setButtonVisible] = useState<boolean>(true);

  useEffect(() => {
    ChromeLocalStorage.get('pos_y', 80).then((res) => {
      setInitialTop(res ? res : 80);
    });

    ChromeLocalStorage.get('showButton', true).then((res) => {
      setButtonVisible(res);
    });

    ChromeRuntime.addListener<SettingsBooleanMessage, SettingsMessageResponse>(
      (message, _, sendResponse) => {
        if (message.option === 'showButton') {
          setButtonVisible(message.data);
          sendResponse({ success: true });
        }
      }
    );
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

      ChromeLocalStorage.set('pos_y', currentTop);
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

  if (!buttonVisible) return null;

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
