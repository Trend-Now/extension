import React from 'react';
import FloatingButton from './button/Floatingbutton';
import HotBoardsContainer from './hotboards/HotBoardsContainer';
import { HotBoardsProvider } from './context';
import QueryProvider from '../../shared/query-provider';

export default function Root() {
  return (
    <QueryProvider>
      <HotBoardsProvider>
        <FloatingButton />
        <HotBoardsContainer />
      </HotBoardsProvider>
    </QueryProvider>
  );
}
