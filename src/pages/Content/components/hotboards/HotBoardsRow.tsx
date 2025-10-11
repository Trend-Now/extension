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
  rank: number;
}

export default function HotBoardsRow({
  boardId,
  boardLiveTime,
  boardName,
  postCount,
  viewCount,
  rank,
}: HotBoardsRowProps) {
  const [aiSummaryVisible, setAiSummaryVisible] = useState(false);

  const { data, isLoading } = useHotBoardInfo(boardId, {
    enabled: aiSummaryVisible,
  });

  // AI 요약이 보이는 상태이면서, 데이터가 존재할 때만 요약문을 보여줌
  const showAiSummary = aiSummaryVisible && data;

  return (
    <div className="hotboards-row">
      {rank <= 3 ? (
        <span className="hotboards-row__medal">
          {rank === 1 && (
            <img src={chrome.runtime.getURL('gold.png')} alt="1st" />
          )}
          {rank === 2 && (
            <img src={chrome.runtime.getURL('silver.png')} alt="2nd" />
          )}
          {rank === 3 && (
            <img src={chrome.runtime.getURL('bronze.png')} alt="3rd" />
          )}
        </span>
      ) : (
        <span className="hotboards-row__rank">{rank}</span>
      )}
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
      {/**
       * 중요)
       * AI 요약이 열려있는 상태에서도 타이머를 유지하기 위해서
       * AI 요약이 열려있는 경우 타이머를 출력하지 않는 것이 아닌
       * 타이머 영역을 숨기는 방식으로 처리
       */}
      {/* AI 요약 */}
      <div
        className="hotboards-row__ai-summary"
        style={!showAiSummary ? { display: 'none' } : undefined}
      >
        {data?.summary}
      </div>
      {/* 게시글 & 조회수 & 타이머 */}
      <div
        className="hotboards-row__footer"
        style={showAiSummary ? { display: 'none' } : undefined}
      >
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
