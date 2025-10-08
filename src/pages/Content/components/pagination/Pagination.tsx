import React, { useEffect } from 'react';
import ChevronLeft from '../icons/ChevronLeft';
import ChevronRight from '../icons/ChevronRight';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) {
  useEffect(() => {
    if (currentPage > totalPages) setPage(totalPages);
  }, [currentPage, totalPages]);

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  return (
    <span className="hotboards-footer__page-box">
      <span className="hotboards-footer__page-text">
        {currentPage} / {totalPages}
      </span>
      <span className="hotboards-footer__page-arrows">
        <button
          className="hotboards-footer__page-button"
          onClick={handlePrevious}
        >
          <ChevronLeft />
        </button>
        <button className="hotboards-footer__page-button" onClick={handleNext}>
          <ChevronRight />
        </button>
      </span>
    </span>
  );
}
