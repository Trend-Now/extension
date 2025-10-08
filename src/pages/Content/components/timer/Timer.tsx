'use client';
import { useEffect, useState } from 'react';
import GrayTimer from '../icons/GrayTimer';
import OrangeTimer from '../icons/OrangeTimer';
import BlueTimer from '../icons/BlueTimer';
import { useQueryClient } from '@tanstack/react-query';

interface CountdownTimerProps {
  /** 초기 시간 (초 단위) */
  initialSeconds: number;
}

const Timer = ({ initialSeconds }: CountdownTimerProps) => {
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  // 초 단위를 "MM:SS" 형식 문자열로 변환
  const formatTime = (totalSeconds: number) => {
    const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const sec = String(totalSeconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  // 컴포넌트 마운트 시 1초마다 timeLeft 감소, 0이 되면 타이머 종료
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          queryClient.invalidateQueries({ queryKey: ['hotBoards'] });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // 남은 시간에 따라 타이머 색상 및 아이콘 선택
  const getTimerStyle = (time: number) => {
    if (time === 0) return { variant: 'timer__gray', icon: <GrayTimer /> };
    if (time < 600) return { variant: 'timer__orange', icon: <OrangeTimer /> };
    return { variant: 'timer__blue', icon: <BlueTimer /> };
  };
  const { variant, icon } = getTimerStyle(timeLeft);

  return (
    <div className="timer">
      {icon}
      <div className={variant}>{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Timer;
