import React from 'react';
import TN24White from '../icons/TN24White';
import Trendnow20White from '../icons/Trendnow20White';
import { useHotBoards } from '../context';
import CloseButton from '../button/CloseButton';
import DateDivider from '../divider/DateDivider';

export default function HotBoardsContainer() {
  const { isOpen } = useHotBoards();

  if (!isOpen) return null;

  return (
    <div id="hotboards-container">
      <div id="hotboards-header">
        <span id="hotboards-header-logo">
          <TN24White />
          <Trendnow20White />
        </span>
        <CloseButton />
      </div>
      <div id="hotboards-content">
        <DateDivider />
      </div>
    </div>
  );
}
