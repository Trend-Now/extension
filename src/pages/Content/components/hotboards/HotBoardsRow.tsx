import React, { useState } from 'react';
import Timer from '../timer/Timer';
import { useHotBoardInfo } from '../../../shared/message/hotBoards';
import Restore from '../icons/Restore';
import ChevronSmallRight from '../icons/ChevronSmallRight';

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
  const [aiSummaryVisible, setAiSummaryVisible] = useState(false);

  const { data, isLoading } = useHotBoardInfo(boardId, {
    enabled: aiSummaryVisible,
  });

  return (
    <div className="hotboards-row">
      <div className="hotboards-row__header">
        <span className="hotboards-row__title">{boardName}</span>
        {aiSummaryVisible && data ? (
          <span className="hotboards-row__ai-detail-box">
            <button className="hotboards-row__ai-detail-button">
              <span className="hotboards-row__ai-detail-text">자세히보기</span>
              <ChevronSmallRight />
            </button>
            <button
              className="hotboards-row__ai-detail-restore"
              onClick={() => setAiSummaryVisible(false)}
            >
              <Restore />
            </button>
          </span>
        ) : (
          <button
            className="hotboards-row__ai-button"
            onClick={() => setAiSummaryVisible(true)}
          >
            <img src={chrome.runtime.getURL('aiStar.gif')} alt="AI 요약" />
            <span className="hotboards-row__ai-button-text">AI 요약 보기</span>
          </button>
        )}
      </div>
      {aiSummaryVisible && data ? (
        <div className="hotboards-row__ai-summary">{data.summary}</div>
      ) : (
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
      )}
    </div>
  );
}
