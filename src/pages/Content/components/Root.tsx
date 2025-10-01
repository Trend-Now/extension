import React from 'react';
import FloatingButton from './button/Floatingbutton';
import HotBoardsContainer from './hotboards/HotBoardsContainer';
import { HotBoardsProvider } from './context';

export default function Root() {
  return (
    <HotBoardsProvider>
      <FloatingButton />
      <HotBoardsContainer />
    </HotBoardsProvider>
  );
}
