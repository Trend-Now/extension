import React, { useState } from 'react';
import TN24White from '../icons/TN24White';
import Trendnow20White from '../icons/Trendnow20White';
import { useHotBoards } from '../context';
import CloseButton from '../button/CloseButton';
import DateDivider from '../divider/DateDivider';
import HotBoardsList from './HotBoardsList';
import HotBoardsFooter from './HotBoardsFooter';
import { useHotBoardList } from '../../../shared/message/hotBoards';

export default function HotBoardsContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen } = useHotBoards();
  const { data } = useHotBoardList(currentPage, 5);

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
        <HotBoardsList data={data?.boardInfoDtos ?? []} />
        <HotBoardsFooter
          setPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data?.totalPageCount ?? 1}
        />
      </div>
    </div>
  );
}
