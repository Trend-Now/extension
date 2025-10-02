import React from 'react';
import TN24White from '../icons/TN24White';
import Trendnow20White from '../icons/Trendnow20White';
import { useHotBoards } from '../context';
import CloseButton from '../button/CloseButton';
import DateDivider from '../divider/DateDivider';
import HotBoardsList from './HotBoardsList';

export default function HotBoardsContainer() {
  const { isOpen } = useHotBoards();

  if (!isOpen) return null;

  return (
    <div className="hotboards">
      <div className="hotboards__header">
        <span className="hotboards__logo">
          <TN24White />
          <Trendnow20White />
        </span>
        <CloseButton />
      </div>
      <div className="hotboards__content">
        <DateDivider />
        <HotBoardsList />
      </div>
    </div>
  );
}
