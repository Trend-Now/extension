import React from 'react';
import HotBoardsRow from './HotBoardsRow';
import { HotBoardList } from '../../../shared/types/hotBoards';

interface HotBoardsListProps {
  data: HotBoardList[];
}

/**
 * @todo HotBoardsList 스켈레톤 컴포넌트 추가하기
 */
export default function HotBoardsList({ data }: HotBoardsListProps) {
  return (
    <div className="hotboards__list">
      {data.map((board) => (
        <HotBoardsRow
          key={board.boardId}
          boardId={board.boardId}
          boardName={board.boardName}
          postCount={board.postCount}
          viewCount={board.viewCount}
          boardLiveTime={board.boardLiveTime}
        />
      ))}
    </div>
  );
}
