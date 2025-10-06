import React from 'react';
import Info from '../icons/Info';
import Pagination from '../pagination/Pagination';

interface HotBoardsFooterProps {
  setPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export default function HotBoardsFooter({
  setPage,
  currentPage,
  totalPages,
}: HotBoardsFooterProps) {
  return (
    <div className="hotboards-footer">
      <span className="hotboards-footer__info-box">
        <Info />
        <span className="hotboards-footer__info-text">14시 30분 기준</span>
      </span>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
