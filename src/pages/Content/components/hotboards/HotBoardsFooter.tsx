import React from 'react';
import Info from '../icons/Info';
import ChevronLeft from '../icons/ChevronLeft';
import ChevronRight from '../icons/ChevronRight';

export default function HotBoardsFooter() {
  return (
    <div className="hotboards-footer">
      <span className="hotboards-footer__info-box">
        <Info />
        <span className="hotboards-footer__info-text">14시 30분 기준</span>
      </span>
      <span className="hotboards-footer__page-box">
        <span className="hotboards-footer__page-text">1 / 5</span>
        <span className="hotboards-footer__page-arrows">
          <button className="hotboards-footer__page-button">
            <ChevronLeft />
          </button>
          <button className="hotboards-footer__page-button">
            <ChevronRight />
          </button>
        </span>
      </span>
    </div>
  );
}
