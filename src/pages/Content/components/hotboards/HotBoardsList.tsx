import React from 'react';
import HotBoardsRow from './HotBoardsRow';
import { HotBoardList } from '../../../shared/types/hotBoards';

interface HotBoardsListProps {
  data: HotBoardList[];
}

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
