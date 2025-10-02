import React from 'react';
import Timer from '../timer/Timer';

interface HotBoardsRowProps {
  boardId: number;
  boardName: string;
  postCount: number;
  viewCount: number;
  boardLiveTime: number;
}

export default function HotBoardsRow({
  boardId,
  boardLiveTime,
  boardName,
  postCount,
  viewCount,
}: HotBoardsRowProps) {
  return (
    <div className="hotboards-row">
      <div className="hotboards-row__header">
        <span className="hotboards-row__title">{boardName}</span>
        <span className="hotboards-row__ai-button">
          <img src={chrome.runtime.getURL('aiStar.gif')} alt="AI 요약" />
          <span className="hotboards-row__ai-text">AI 요약 보기</span>
        </span>
      </div>
      <div className="hotboards-row__footer">
        <span className="hotboards-row__stats">
          <span className="hotboards-row__stats-count">
            게시글: {postCount}
          </span>
          <span className="hotboards-row__stats-count">
            조회수: {viewCount}
          </span>
        </span>
        <Timer initialSeconds={boardLiveTime} />
      </div>
    </div>
  );
}
