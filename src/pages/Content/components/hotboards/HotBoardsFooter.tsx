import React from 'react';
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
