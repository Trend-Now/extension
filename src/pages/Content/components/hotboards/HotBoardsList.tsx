import React from 'react';
import HotBoardsRow from './HotBoardsRow';
import { useHotBoardList } from '../../../shared/message/hotBoards';

export default function HotBoardsList() {
  const { data } = useHotBoardList(1, 5);

  return (
    <div className="hotboards__list">
      {data?.boardInfoDtos.map((board) => (
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
