import { useQuery } from '@tanstack/react-query';
import { HotBoardInfoResponse, HotBoardResponse } from '../types/hotBoards';

export function useHotBoardList(page?: number, size?: number) {
  return useQuery<HotBoardResponse>({
    queryKey: ['hotBoards'],
    queryFn: () =>
      new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: 'GET_HOTBOARD_LIST', page, size },
          (response) => {
            if (response.success) resolve(response.data);
            else reject(new Error(response.error));
          }
        );
      }),
  });
}

export function useHotBoardInfo(
  boardId: number,
  config?: { enabled: boolean }
) {
  return useQuery<HotBoardInfoResponse>({
    queryKey: ['hotBoardInfo', boardId],
    queryFn: () =>
      new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: 'GET_HOTBOARD_INFO', boardId },
          (response) => {
            if (response.success) resolve(response.data);
            else reject(new Error(response.error));
          }
        );
      }),
    enabled: config?.enabled ?? true,
  });
}
