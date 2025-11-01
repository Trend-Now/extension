import { createContext, useContext, useState } from 'react';

export interface HotBoardsContextType {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
}

export const HotBoardsContext = createContext<HotBoardsContextType | undefined>(
  undefined
);

export const HotBoardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HotBoardsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HotBoardsContext.Provider>
  );
};

export const useHotBoards = () => {
  const ctx = useContext(HotBoardsContext);

  if (!ctx)
    throw new Error('useHotBoards must be used within HotBoardsProvider');

  return ctx;
};
