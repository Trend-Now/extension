import React, { useEffect, useState } from 'react';
import TN24White from '../icons/TN24White';
import Trendnow20White from '../icons/Trendnow20White';
import { useHotBoards } from '../context';
import CloseButton from '../button/CloseButton';
import DateDivider from '../divider/DateDivider';
import HotBoardsList from './HotBoardsList';
import HotBoardsFooter from './HotBoardsFooter';
import { useHotBoardList } from '../../../shared/message/hotBoards';
import SkeletonList from './SkeletonList';
import { SSE } from '../../../shared/sse/sse';
import { useQueryClient } from '@tanstack/react-query';

export default function HotBoardsContainer() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen } = useHotBoards();
  const { data } = useHotBoardList(currentPage, 5);

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('realtimeBoardTimeUp', () => {
      queryClient.invalidateQueries({ queryKey: ['hotBoards'] });
    });
  }, []);

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
        {data ? (
          <HotBoardsList data={data.boardInfoDtos ?? []} />
        ) : (
          <SkeletonList />
        )}
        <HotBoardsFooter
          setPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data?.totalPageCount ?? 1}
        />
      </div>
    </div>
  );
}
